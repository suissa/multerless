/**
 * Comprehensive tests for multerless
 * Testing the core functionality that matters most
 */

import { describe, it } from "node:test";
import { ok, strictEqual } from "node:assert";
import { Readable } from "node:stream";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { mkdirSync, rmdirSync, existsSync, unlinkSync } from "node:fs";
import multer from "../dist/index.js";
import { MulterError } from "../dist/errors.js";

describe("multerless - Comprehensive Tests", () => {
  const createMockRequest = (formDataBuffer, contentType) => {
    const stream = Readable.from(formDataBuffer);
    stream.headers = {
      "content-type": contentType,
    };
    return stream;
  };

  it("core functionality - single file upload with disk storage", async () => {
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
    
    // Use disk storage in temp directory
    const tempDir = join(tmpdir(), 'comprehensive-test');
    if (!existsSync(tempDir)) {
      mkdirSync(tempDir, { recursive: true });
    }
    
    const upload = multer({ 
      storage: multer.diskStorage({
        destination: tempDir,
        filename: (req, file, cb) => cb(null, 'uploaded-test.txt')
      })
    });
    
    const middleware = upload.single('file');

    const mockRes = {};
    let nextCalled = false;
    const next = () => { nextCalled = true; };

    await middleware(req, mockRes, next);
    
    ok(nextCalled, "Next function should be called");
    ok(req.file, "Request should have file property");
    ok(req.file.fieldname === 'file', "File should have correct fieldname");
    ok(req.file.originalname === 'test.txt', "File should have correct original name");
    ok(req.file.filename === 'uploaded-test.txt', "File should have correct custom filename");
    ok(req.file.mimetype === 'text/plain', "File should have correct mimetype");
    ok(req.file.size > 0, "File should have size greater than 0");
    ok(req.file.path, "File should have path property");
    ok(req.file.destination, "File should have destination property");
    
    // Clean up
    try {
      if (req.file && req.file.path && existsSync(req.file.path)) {
        unlinkSync(req.file.path);
      }
      rmdirSync(tempDir);
    } catch (e) {
      // Ignore cleanup errors
    }
  });

  it("core functionality - multiple file upload", async () => {
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
    ok(req.files[0].originalname === 'photo1.jpg', "First file should be photo1.jpg");
    ok(req.files[1].originalname === 'photo2.png', "Second file should be photo2.png");
    ok(req.files[0].mimetype === 'image/jpeg', "First file should have correct mimetype");
    ok(req.files[1].mimetype === 'image/png', "Second file should have correct mimetype");
  });

  it("core functionality - memory storage", async () => {
    const boundary = "----WebKitFormBoundary7MA4YWxkTrZu0gW";
    const formData = Buffer.from([
      `------WebKitFormBoundary7MA4YWxkTrZu0gW`,
      `Content-Disposition: form-data; name="memFile"; filename="memory.txt"`,
      `Content-Type: text/plain`,
      ``,
      `Hello from memory storage`,
      `------WebKitFormBoundary7MA4YWxkTrZu0gW--`,
    ].join('\r\n'));

    const req = createMockRequest(formData, `multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW`);
    
    const upload = multer({ 
      storage: multer.memoryStorage() 
    });
    
    const middleware = upload.single('memFile');

    const mockRes = {};
    let nextCalled = false;
    const next = () => { nextCalled = true; };

    await middleware(req, mockRes, next);
    
    ok(nextCalled, "Next function should be called");
    ok(req.file, "Request should have file property");
    ok(req.file.originalname === 'memory.txt', "File should have correct name");
    ok(req.file.mimetype === 'text/plain', "File should have correct mimetype");
    ok(req.file.buffer, "File should have buffer property for memory storage");
    ok(Buffer.isBuffer(req.file.buffer), "Buffer should be a Buffer instance");
    ok(req.file.buffer.toString().includes('Hello from memory'), "Buffer should contain expected data");
  });

  it("core functionality - limits enforcement", async () => {
    const boundary = "----WebKitFormBoundary7MA4YWxkTrZu0gW";
    const largeFileData = 'A'.repeat(1024 * 2); // 2KB file
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

  it("core functionality - file filtering", async () => {
    const boundary = "----WebKitFormBoundary7MA4YWxkTrZu0gW";
    const formData = Buffer.from([
      `------WebKitFormBoundary7MA4YWxkTrZu0gW`,
      `Content-Disposition: form-data; name="file"; filename="document.js"`,
      `Content-Type: application/javascript`,
      ``,
      `console.log("test");`,
      `------WebKitFormBoundary7MA4YWxkTrZu0gW--`,
    ].join('\r\n'));

    const req = createMockRequest(formData, `multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW`);
    
    const upload = multer({
      fileFilter: (req, file, cb) => {
        // Only allow text files
        if (file.mimetype.startsWith('text/') || file.originalname.endsWith('.txt')) {
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

  it("core functionality - mixed fields and files", async () => {
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
    ok(req.file.originalname === 'avatar.jpg', "File should have correct name");
  });

  it("core functionality - any files upload", async () => {
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

  it("core functionality - no files upload", async () => {
    const boundary = "----WebKitFormBoundary7MA4YWxkTrZu0gW";
    const formData = Buffer.from([
      `------WebKitFormBoundary7MA4YWxkTrZu0gW`,
      `Content-Disposition: form-data; name="field1"`,
      ``,
      `value1`,
      `------WebKitFormBoundary7MA4YWxkTrZu0gW`,
      `Content-Disposition: form-data; name="field2"`,
      ``,
      `value2`,
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
    ok(!req.file, "Request should not have file property when using none()");
    ok(req.body, "Request should have body property");
    ok(req.body.field1, "Body should have field1");
    ok(req.body.field2, "Body should have field2");
  });
});

console.log("✅ Comprehensive tests completed successfully");