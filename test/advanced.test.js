/**
 * Advanced tests for @purecore/multerless
 */

import { describe, it } from "node:test";
import { strictEqual, ok, deepStrictEqual, rejects } from "node:assert";
import { Readable } from "node:stream";
import { createReadStream, writeFileSync, mkdirSync, rmdirSync, unlinkSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import multer from "../dist/index.js";
import { MulterError } from "../dist/errors.js";

describe("@purecore/multerless - Advanced Tests", () => {
  // Helper to create mock request
  const createMockRequest = (formDataBuffer, contentType) => {
    const stream = Readable.from(formDataBuffer);
    stream.headers = {
      "content-type": contentType,
    };
    return stream;
  };

  it("should handle single file upload correctly", async () => {
    // Create a simple multipart form data
    const boundary = "----WebKitFormBoundary7MA4YWxkTrZu0gW";
    const formData = Buffer.from([
      `------WebKitFormBoundary7MA4YWxkTrZu0gW`,
      `Content-Disposition: form-data; name="file"; filename="test.txt"`,
      `Content-Type: text/plain`,
      ``,
      `Hello World`,
      `------WebKitFormBoundary7MA4YWxkTrZu0gW--`,
    ].join('\r\n'));

    const req = createMockRequest(formData, `multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW`);
    const upload = multer();
    const middleware = upload.single('file');

    // Mock response and next
    const mockRes = {};
    let nextCalled = false;
    const next = () => { nextCalled = true; };

    await middleware(req, mockRes, next);
    
    ok(nextCalled, "Next function should be called");
    ok(req.file, "Request should have file property");
    ok(req.file.fieldname === 'file', "File should have correct fieldname");
    ok(req.file.originalname === 'test.txt', "File should have correct original name");
    ok(req.file.mimetype === 'text/plain', "File should have correct mimetype");
  });

  it("should handle multiple file upload correctly", async () => {
    const boundary = "----WebKitFormBoundary7MA4YWxkTrZu0gW";
    const formData = Buffer.from([
      `------WebKitFormBoundary7MA4YWxkTrZu0gW`,
      `Content-Disposition: form-data; name="photos"; filename="photo1.jpg"`,
      `Content-Type: image/jpeg`,
      ``,
      `JPEG_DATA_1`,
      `------WebKitFormBoundary7MA4YWxkTrZu0gW`,
      `Content-Disposition: form-data; name="photos"; filename="photo2.png"`,
      `Content-Type: image/png`,
      ``,
      `PNG_DATA_2`,
      `------WebKitFormBoundary7MA4YWxkTrZu0gW--`,
    ].join('\r\n'));

    const req = createMockRequest(formData, `multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW`);
    const upload = multer();
    const middleware = upload.array('photos', 5);

    const mockRes = {};
    let nextCalled = false;
    const next = () => { nextCalled = true; };

    await middleware(req, mockRes, next);
    
    ok(nextCalled, "Next function should be called");
    ok(Array.isArray(req.files), "Request should have files array");
    strictEqual(req.files.length, 2, "Should have 2 files");
    strictEqual(req.files[0].originalname, 'photo1.jpg', "First file should be photo1.jpg");
    strictEqual(req.files[1].originalname, 'photo2.png', "Second file should be photo2.png");
  });

  it("should handle mixed fields and files", async () => {
    const boundary = "----WebKitFormBoundary7MA4YWxkTrZu0gW";
    const formData = Buffer.from([
      `------WebKitFormBoundary7MA4YWxkTrZu0gW`,
      `Content-Disposition: form-data; name="username"`,
      ``,
      `john_doe`,
      `------WebKitFormBoundary7MA4YWxkTrZu0gW`,
      `Content-Disposition: form-data; name="email"`,
      ``,
      `john@example.com`,
      `------WebKitFormBoundary7MA4YWxkTrZu0gW`,
      `Content-Disposition: form-data; name="avatar"; filename="avatar.jpg"`,
      `Content-Type: image/jpeg`,
      ``,
      `AVATAR_DATA`,
      `------WebKitFormBoundary7MA4YWxkTrZu0gW--`,
    ].join('\r\n'));

    const req = createMockRequest(formData, `multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW`);
    const upload = multer();
    const middleware = upload.single('avatar');

    const mockRes = {};
    let nextCalled = false;
    const next = () => { nextCalled = true; };

    await middleware(req, mockRes, next);
    
    ok(nextCalled, "Next function should be called");
    ok(req.file, "Request should have file property");
    ok(req.body, "Request should have body property");
    ok(req.body.username && req.body.username.includes('john_doe'), "Body should have username");
    ok(req.body.email && req.body.email.includes('john@example.com'), "Body should have email");
    strictEqual(req.file.originalname, 'avatar.jpg', "File should have correct name");
  });

  it("should enforce file size limits", async () => {
    const boundary = "----WebKitFormBoundary7MA4YWxkTrZu0gW";
    // Create form data with a large file (larger than limit)
    const largeFileData = 'A'.repeat(1024 * 1024 * 2); // 2MB file
    const formData = Buffer.from([
      `------WebKitFormBoundary7MA4YWxkTrZu0gW`,
      `Content-Disposition: form-data; name="file"; filename="large.txt"`,
      `Content-Type: text/plain`,
      ``,
      largeFileData,
      `------WebKitFormBoundary7MA4YWxkTrZu0gW--`,
    ].join('\r\n'));

    const req = createMockRequest(formData, `multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW`);
    const upload = multer({ limits: { fileSize: 1024 } }); // 1KB limit
    const middleware = upload.single('file');

    const mockRes = {};
    let errorOccurred = null;
    const next = (err) => { errorOccurred = err; };

    await middleware(req, mockRes, next);
    
    ok(errorOccurred instanceof MulterError, "Should throw MulterError");
    strictEqual(errorOccurred.code, "LIMIT_FILE_SIZE", "Error code should be LIMIT_FILE_SIZE");
  });

  it("should enforce field count limits", async () => {
    const boundary = "----WebKitFormBoundary7MA4YWxkTrZu0gW";
    const formDataParts = [];
    formDataParts.push(`------WebKitFormBoundary7MA4YWxkTrZu0gW`);
    
    // Add more fields than the limit (limit is 2)
    for (let i = 0; i < 5; i++) {
      formDataParts.push(`Content-Disposition: form-data; name="field${i}"`);
      formDataParts.push(``);
      formDataParts.push(`value${i}`);
      formDataParts.push(`------WebKitFormBoundary7MA4YWxkTrZu0gW`);
    }
    
    formDataParts.push(`------WebKitFormBoundary7MA4YWxkTrZu0gW--`);
    const formData = Buffer.from(formDataParts.join('\r\n'));

    const req = createMockRequest(formData, `multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW`);
    const upload = multer({ limits: { fields: 2 } }); // Limit to 2 fields
    const middleware = upload.none();

    const mockRes = {};
    let errorOccurred = null;
    const next = (err) => { errorOccurred = err; };

    await middleware(req, mockRes, next);
    
    ok(errorOccurred instanceof MulterError, "Should throw MulterError");
    strictEqual(errorOccurred.code, "LIMIT_FIELD_COUNT", "Error code should be LIMIT_FIELD_COUNT");
  });

  it("should handle file filtering correctly", async () => {
    const boundary = "----WebKitFormBoundary7MA4YWxkTrZu0gW";
    const formData = Buffer.from([
      `------WebKitFormBoundary7MA4YWxkTrZu0gW`,
      `Content-Disposition: form-data; name="file"; filename="document.pdf"`,
      `Content-Type: application/pdf`,
      ``,
      `PDF_DATA`,
      `------WebKitFormBoundary7MA4YWxkTrZu0gW--`,
    ].join('\r\n'));

    const req = createMockRequest(formData, `multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW`);
    
    const upload = multer({
      fileFilter: (req, file, cb) => {
        // Only allow image files
        if (file.mimetype.startsWith('image/')) {
          cb(null, true);
        } else {
          cb(null, false); // Reject the file
        }
      }
    });
    
    const middleware = upload.single('file');

    const mockRes = {};
    let nextCalled = false;
    const next = (err) => { 
      if (!err) nextCalled = true; 
    };

    await middleware(req, mockRes, next);
    
    // File should be rejected by filter, so no file property should exist
    ok(!req.file, "Request should not have file property as it was filtered out");
    ok(nextCalled, "Next function should be called");
  });

  it("should handle memory storage correctly", async () => {
    const boundary = "----WebKitFormBoundary7MA4YWxkTrZu0gW";
    const formData = Buffer.from([
      `------WebKitFormBoundary7MA4YWxkTrZu0gW`,
      `Content-Disposition: form-data; name="file"; filename="data.txt"`,
      `Content-Type: text/plain`,
      ``,
      `Hello from memory storage`,
      `------WebKitFormBoundary7MA4YWxkTrZu0gW--`,
    ].join('\r\n'));

    const req = createMockRequest(formData, `multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW`);
    
    const upload = multer({ 
      storage: multer.memoryStorage()
    });
    
    const middleware = upload.single('file');

    const mockRes = {};
    let nextCalled = false;
    const next = () => { nextCalled = true; };

    await middleware(req, mockRes, next);
    
    ok(nextCalled, "Next function should be called");
    ok(req.file, "Request should have file property");
    ok(req.file.buffer, "File should have buffer property for memory storage");
    ok(Buffer.isBuffer(req.file.buffer), "Buffer should be a Buffer instance");
    ok(req.file.buffer.toString().includes('Hello from memory storage'), "Buffer should contain expected data");
  });

  it("should handle disk storage correctly", async () => {
    // Create a temporary directory for testing
    const tempDir = join(tmpdir(), 'multerless-test');
    mkdirSync(tempDir, { recursive: true });
    
    const boundary = "----WebKitFormBoundary7MA4YWxkTrZu0gW";
    const formData = Buffer.from([
      `------WebKitFormBoundary7MA4YWxkTrZu0gW`,
      `Content-Disposition: form-data; name="file"; filename="disk-test.txt"`,
      `Content-Type: text/plain`,
      ``,
      `Hello from disk storage`,
      `------WebKitFormBoundary7MA4YWxkTrZu0gW--`,
    ].join('\r\n'));

    const req = createMockRequest(formData, `multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW`);
    
    const upload = multer({ 
      storage: multer.diskStorage({
        destination: tempDir,
        filename: (req, file, cb) => cb(null, 'custom-filename.txt')
      })
    });
    
    const middleware = upload.single('file');

    const mockRes = {};
    let nextCalled = false;
    const next = () => { nextCalled = true; };

    await middleware(req, mockRes, next);
    
    ok(nextCalled, "Next function should be called");
    ok(req.file, "Request should have file property");
    ok(req.file.path, "File should have path property for disk storage");
    ok(req.file.destination, "File should have destination property");
    strictEqual(req.file.filename, 'custom-filename.txt', "File should have custom filename");
    
    // Clean up
    try {
      if (req.file && req.file.path) {
        unlinkSync(req.file.path);
      }
      rmdirSync(tempDir);
    } catch (e) {
      // Ignore cleanup errors
    }
  });

  it("should handle malformed multipart data", async () => {
    // Create malformed multipart data (missing boundary in content-type)
    const formData = Buffer.from([
      `Content-Disposition: form-data; name="file"; filename="test.txt"`,
      `Content-Type: text/plain`,
      ``,
      `Hello World`,
    ].join('\r\n'));

    const req = createMockRequest(formData, `multipart/form-data`); // Missing boundary
    const upload = multer();
    const middleware = upload.single('file');

    const mockRes = {};
    let errorOccurred = null;
    const next = (err) => { errorOccurred = err; };

    await middleware(req, mockRes, next);
    
    ok(errorOccurred instanceof MulterError, "Should throw MulterError for invalid content type");
    ok(errorOccurred.code === "INVALID_CONTENT_TYPE" || errorOccurred.code === "INVALID_BOUNDARY", "Error code should be related to invalid content type or boundary");
  });

  it("should handle fields method with multiple field types", async () => {
    const boundary = "----WebKitFormBoundary7MA4YWxkTrZu0gW";
    const formData = Buffer.from([
      `------WebKitFormBoundary7MA4YWxkTrZu0gW`,
      `Content-Disposition: form-data; name="textField"`,
      ``,
      `Text value`,
      `------WebKitFormBoundary7MA4YWxkTrZu0gW`,
      `Content-Disposition: form-data; name="singleFile"; filename="file1.txt"`,
      `Content-Type: text/plain`,
      ``,
      `File 1 content`,
      `------WebKitFormBoundary7MA4YWxkTrZu0gW`,
      `Content-Disposition: form-data; name="multiFile"; filename="file2.txt"`,
      `Content-Type: text/plain`,
      ``,
      `File 2 content`,
      `------WebKitFormBoundary7MA4YWxkTrZu0gW`,
      `Content-Disposition: form-data; name="multiFile"; filename="file3.txt"`,
      `Content-Type: text/plain`,
      ``,
      `File 3 content`,
      `------WebKitFormBoundary7MA4YWxkTrZu0gW--`,
    ].join('\r\n'));

    const req = createMockRequest(formData, `multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW`);
    const upload = multer();
    const middleware = upload.fields([
      { name: 'textField', maxCount: 1 },
      { name: 'singleFile', maxCount: 1 },
      { name: 'multiFile', maxCount: 2 }
    ]);

    const mockRes = {};
    let nextCalled = false;
    const next = () => { nextCalled = true; };

    await middleware(req, mockRes, next);
    
    ok(nextCalled, "Next function should be called");
    ok(req.files, "Request should have files property");
    ok(req.files.textField, "Should have textField in files");
    ok(req.files.singleFile, "Should have singleFile in files");
    ok(req.files.multiFile, "Should have multiFile in files");
    strictEqual(req.files.multiFile.length, 2, "Should have 2 files for multiFile field");
  });

  it("should handle any method for arbitrary files", async () => {
    const boundary = "----WebKitFormBoundary7MA4YWxkTrZu0gW";
    const formData = Buffer.from([
      `------WebKitFormBoundary7MA4YWxkTrZu0gW`,
      `Content-Disposition: form-data; name="file1"; filename="doc1.txt"`,
      `Content-Type: text/plain`,
      ``,
      `Document 1`,
      `------WebKitFormBoundary7MA4YWxkTrZu0gW`,
      `Content-Disposition: form-data; name="file2"; filename="doc2.txt"`,
      `Content-Type: text/plain`,
      ``,
      `Document 2`,
      `------WebKitFormBoundary7MA4YWxkTrZu0gW--`,
    ].join('\r\n'));

    const req = createMockRequest(formData, `multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW`);
    const upload = multer();
    const middleware = upload.any();

    const mockRes = {};
    let nextCalled = false;
    const next = () => { nextCalled = true; };

    await middleware(req, mockRes, next);
    
    ok(nextCalled, "Next function should be called");
    ok(Array.isArray(req.files), "Request should have files array");
    strictEqual(req.files.length, 2, "Should have 2 files");
  });

  it("should enforce field name size limits", async () => {
    const veryLongFieldName = 'A'.repeat(200); // Much larger than default 100 limit
    const boundary = "----WebKitFormBoundary7MA4YWxkTrZu0gW";
    const formData = Buffer.from([
      `------WebKitFormBoundary7MA4YWxkTrZu0gW`,
      `Content-Disposition: form-data; name="${veryLongFieldName}"; filename="test.txt"`,
      `Content-Type: text/plain`,
      ``,
      `Test content`,
      `------WebKitFormBoundary7MA4YWxkTrZu0gW--`,
    ].join('\r\n'));

    const req = createMockRequest(formData, `multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW`);
    const upload = multer({ limits: { fieldNameSize: 100 } }); // Set field name size limit to 100
    const middleware = upload.single(veryLongFieldName);

    const mockRes = {};
    let errorOccurred = null;
    const next = (err) => { errorOccurred = err; };

    await middleware(req, mockRes, next);
    
    ok(errorOccurred instanceof MulterError, "Should throw MulterError");
    strictEqual(errorOccurred.code, "LIMIT_FIELD_KEY", "Error code should be LIMIT_FIELD_KEY");
  });

  it("should handle empty multipart body", async () => {
    const boundary = "----WebKitFormBoundary7MA4YWxkTrZu0gW";
    const formData = Buffer.from([
      `------WebKitFormBoundary7MA4YWxkTrZu0gW--`,
    ].join('\r\n'));

    const req = createMockRequest(formData, `multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW`);
    const upload = multer();
    const middleware = upload.none();

    const mockRes = {};
    let nextCalled = false;
    const next = () => { nextCalled = true; };

    await middleware(req, mockRes, next);
    
    ok(nextCalled, "Next function should be called");
  });
});

console.log("✅ Advanced tests completed successfully");