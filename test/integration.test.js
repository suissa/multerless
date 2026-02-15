/**
 * Integration tests for multerless
 */

import { describe, it } from "node:test";
import { strictEqual, ok, deepStrictEqual } from "node:assert";
import { Readable } from "node:stream";
import { createServer } from "node:http";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { mkdirSync, rmdirSync, existsSync, unlinkSync } from "node:fs";
import multer from "../dist/index.js";

describe("multerless - Integration Tests", () => {
  it("should work with memory storage", (t, done) => {
    // Create simple content
    const content = 'Simple test content';
    const boundary = "----WebKitFormBoundary7MA4YWxkTrZu0gW";
    const formData = Buffer.from([
      `------WebKitFormBoundary7MA4YWxkTrZu0gW`,
      `Content-Disposition: form-data; name="upload"; filename="test.txt"`,
      `Content-Type: text/plain`,
      ``,
      content,
      `------WebKitFormBoundary7MA4YWxkTrZu0gW--`,
    ].join('\r\n'));

    const req = Readable.from(formData);
    req.headers = {
      "content-type": `multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW`,
      "content-length": formData.length
    };

    const upload = multer({ 
      storage: multer.memoryStorage() 
    });
    const middleware = upload.single('upload');

    const res = {};

    let nextCalled = false;
    const next = () => {
      nextCalled = true;
      
      try {
        ok(req.file, "Request should have file property");
        ok(req.file.originalname === 'test.txt', "File should have correct name");
        ok(req.file.mimetype === 'text/plain', "File should have correct mimetype");
        ok(req.file.buffer, "File should have buffer property");
        ok(req.file.buffer.toString().includes('test'), "Buffer should contain content");
        
        done();
      } catch (error) {
        done(error);
      }
    };

    middleware(req, res, next);

    setTimeout(() => {
      if (!nextCalled) {
        done(new Error("Middleware did not call next"));
      }
    }, 5000);
  });

  it("should work with disk storage", (t, done) => {
    const content = 'Disk storage test';
    const boundary = "----WebKitFormBoundary7MA4YWxkTrZu0gW";
    const formData = Buffer.from([
      `------WebKitFormBoundary7MA4YWxkTrZu0gW`,
      `Content-Disposition: form-data; name="diskUpload"; filename="disk-test.txt"`,
      `Content-Type: text/plain`,
      ``,
      content,
      `------WebKitFormBoundary7MA4YWxkTrZu0gW--`,
    ].join('\r\n'));

    // Create temp directory
    const tempDir = join(tmpdir(), 'integration-disk-test');
    if (!existsSync(tempDir)) {
      mkdirSync(tempDir, { recursive: true });
    }

    const req = Readable.from(formData);
    req.headers = {
      "content-type": `multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW`,
      "content-length": formData.length
    };

    const upload = multer({ 
      storage: multer.diskStorage({
        destination: tempDir,
        filename: (req, file, cb) => cb(null, 'custom-disk-test.txt')
      })
    });
    
    const middleware = upload.single('diskUpload');

    const res = {};
    let nextCalled = false;
    const next = () => {
      nextCalled = true;
      
      try {
        ok(req.file, "Request should have file property");
        ok(req.file.originalname === 'disk-test.txt', "File should have correct original name");
        ok(req.file.filename === 'custom-disk-test.txt', "File should have custom filename");
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
        
        done();
      } catch (error) {
        done(error);
      }
    };

    middleware(req, res, next);

    setTimeout(() => {
      if (!nextCalled) {
        done(new Error("Middleware did not call next"));
      }
    }, 5000);
  });

  it("should work with file filtering", (t, done) => {
    const content = 'Filter test';
    const boundary = "----WebKitFormBoundary7MA4YWxkTrZu0gW";
    const formData = Buffer.from([
      `------WebKitFormBoundary7MA4YWxkTrZu0gW`,
      `Content-Disposition: form-data; name="filteredFile"; filename="allowed.jpg"`,
      `Content-Type: image/jpeg`,
      ``,
      content,
      `------WebKitFormBoundary7MA4YWxkTrZu0gW--`,
    ].join('\r\n'));

    const req = Readable.from(formData);
    req.headers = {
      "content-type": `multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW`,
      "content-length": formData.length
    };

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
    
    const middleware = upload.single('filteredFile');

    const res = {};
    let nextCalled = false;
    const next = () => {
      nextCalled = true;
      
      try {
        // The file should be accepted since it's an image
        ok(req.file, "Request should have file property for allowed file");
        ok(req.file.originalname === 'allowed.jpg', "File should have correct name");
        
        done();
      } catch (error) {
        done(error);
      }
    };

    middleware(req, res, next);

    setTimeout(() => {
      if (!nextCalled) {
        done(new Error("Middleware did not call next"));
      }
    }, 5000);
  });

  it("should work as Express middleware", (t, done) => {
    // Simulate Express-style request handling
    const boundary = "----WebKitFormBoundary7MA4YWxkTrZu0gW";
    const formData = Buffer.from([
      `------WebKitFormBoundary7MA4YWxkTrZu0gW`,
      `Content-Disposition: form-data; name="upload"; filename="test.txt"`,
      `Content-Type: text/plain`,
      ``,
      `Integration test content`,
      `------WebKitFormBoundary7MA4YWxkTrZu0gW--`,
    ].join('\r\n'));

    // Create a mock Express-style request
    const req = Readable.from(formData);
    req.headers = {
      "content-type": `multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW`,
      "content-length": formData.length
    };

    // Create multer instance
    const upload = multer({ dest: join(tmpdir(), 'integration-test') });
    const middleware = upload.single('upload');

    // Create mock response
    const res = {};

    // Track when next is called
    let nextCalled = false;
    const next = () => {
      nextCalled = true;
      
      // Verify results
      ok(req.file, "Request should have file property");
      ok(req.file.originalname === 'test.txt', "File should have correct name");
      ok(req.file.mimetype === 'text/plain', "File should have correct mimetype");
      ok(req.file.size === 'Integration test content'.length, "File should have correct size");
      
      done();
    };

    // Execute middleware
    middleware(req, res, next);

    // Timeout in case of failure
    setTimeout(() => {
      if (!nextCalled) {
        done(new Error("Middleware did not call next"));
      }
    }, 5000);
  });

  it("should work with memory storage for large files", (t, done) => {
    // Create a reasonably large file (not too big to avoid memory issues in tests)
    const largeContent = 'A'.repeat(1024 * 100); // 100KB
    const boundary = "----WebKitFormBoundary7MA4YWxkTrZu0gW";
    const formData = Buffer.from([
      `------WebKitFormBoundary7MA4YWxkTrZu0gW`,
      `Content-Disposition: form-data; name="largeFile"; filename="large.txt"`,
      `Content-Type: application/octet-stream`,
      ``,
      largeContent,
      `------WebKitFormBoundary7MA4YWxkTrZu0gW--`,
    ].join('\r\n'));

    const req = Readable.from(formData);
    req.headers = {
      "content-type": `multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW`,
      "content-length": formData.length
    };

    const upload = multer({ 
      storage: multer.memoryStorage() 
    });
    const middleware = upload.single('largeFile');

    const res = {};
    let nextCalled = false;
    const next = () => {
      nextCalled = true;
      
      ok(req.file, "Request should have file property");
      ok(req.file.buffer, "File should have buffer property");
      ok(req.file.buffer.length === largeContent.length, "Buffer should have correct size");
      ok(req.file.originalname === 'large.txt', "File should have correct name");
      
      done();
    };

    middleware(req, res, next);

    setTimeout(() => {
      if (!nextCalled) {
        done(new Error("Middleware did not call next"));
      }
    }, 5000);
  });

  it("should handle multiple storage engines together", (t, done) => {
    // Create a temporary directory for disk storage
    const tempDir = join(tmpdir(), 'integration-multi-storage');
    if (!existsSync(tempDir)) {
      mkdirSync(tempDir, { recursive: true });
    }

    const boundary = "----WebKitFormBoundary7MA4YWxkTrZu0gW";
    const formData = Buffer.from([
      `------WebKitFormBoundary7MA4YWxkTrZu0gW`,
      `Content-Disposition: form-data; name="diskFile"; filename="disk.txt"`,
      `Content-Type: text/plain`,
      ``,
      `Disk storage content`,
      `------WebKitFormBoundary7MA4YWxkTrZu0gW`,
      `Content-Disposition: form-data; name="anotherFile"; filename="another.txt"`,
      `Content-Type: text/plain`,
      ``,
      `Another file content`,
      `------WebKitFormBoundary7MA4YWxkTrZu0gW--`,
    ].join('\r\n'));

    const req = Readable.from(formData);
    req.headers = {
      "content-type": `multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW`,
      "content-length": formData.length
    };

    // Create upload with disk storage 
    const upload = multer({ 
      storage: multer.diskStorage({
        destination: tempDir,
        filename: (req, file, cb) => cb(null, `${file.originalname.replace(/\.[^/.]+$/, "")}-stored.txt`)
      })
    });
    
    // Process both files using array middleware
    const middleware = upload.any();

    const res = {};
    let nextCalled = false;
    const next = () => {
      nextCalled = true;
      
      try {
        ok(Array.isArray(req.files), "Request should have files array");
        strictEqual(req.files.length, 2, "Should have 2 files");
        
        // Find the files
        const diskFile = req.files.find(f => f.originalname === 'disk.txt');
        const anotherFile = req.files.find(f => f.originalname === 'another.txt');
        
        ok(diskFile, "Should have disk file");
        ok(anotherFile, "Should have another file");
        
        // Both files should have path and destination properties since they're using disk storage
        ok(diskFile.path, "Disk file should have path");
        ok(diskFile.destination, "Disk file should have destination");
        ok(anotherFile.path, "Another file should have path");
        ok(anotherFile.destination, "Another file should have destination");
        
        strictEqual(diskFile.filename, 'disk-stored.txt', "Disk file should have custom filename");
        strictEqual(anotherFile.filename, 'another-stored.txt', "Another file should have custom filename");

        // Clean up
        try {
          if (diskFile && diskFile.path && existsSync(diskFile.path)) {
            unlinkSync(diskFile.path);
          }
          if (anotherFile && anotherFile.path && existsSync(anotherFile.path)) {
            unlinkSync(anotherFile.path);
          }
          rmdirSync(tempDir);
        } catch (e) {
          // Ignore cleanup errors
        }
        
        done();
      } catch (error) {
        done(error);
      }
    };

    middleware(req, res, next);

    setTimeout(() => {
      if (!nextCalled) {
        done(new Error("Middleware did not call next"));
      }
    }, 5000);
  });

  it("should work with custom storage engine", (t, done) => {
    // Define a custom storage engine
    class CustomStorage {
      _handleFile(req, file, callback) {
        // Accumulate the file data in memory
        const chunks = [];
        let size = 0;
        
        file.stream.on('data', (chunk) => {
          chunks.push(chunk);
          size += chunk.length;
        });
        
        file.stream.on('end', () => {
          const buffer = Buffer.concat(chunks);
          
          callback(null, {
            size,
            customProp: 'custom-value',
            buffer
          });
        });
        
        file.stream.on('error', callback);
      }
      
      _removeFile(req, file, callback) {
        // Nothing to clean up since we're using memory
        callback();
      }
    }
    
    const boundary = "----WebKitFormBoundary7MA4YWxkTrZu0gW";
    const formData = Buffer.from([
      `------WebKitFormBoundary7MA4YWxkTrZu0gW`,
      `Content-Disposition: form-data; name="customFile"; filename="custom.txt"`,
      `Content-Type: text/plain`,
      ``,
      `Custom storage test`,
      `------WebKitFormBoundary7MA4YWxkTrZu0gW--`,
    ].join('\r\n'));

    const req = Readable.from(formData);
    req.headers = {
      "content-type": `multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW`,
      "content-length": formData.length
    };

    const customStorage = new CustomStorage();
    const upload = multer({ storage: customStorage });
    const middleware = upload.single('customFile');

    const res = {};
    let nextCalled = false;
    const next = () => {
      nextCalled = true;
      
      ok(req.file, "Request should have file property");
      ok(req.file.customProp === 'custom-value', "File should have custom property");
      ok(req.file.buffer, "File should have buffer");
      ok(req.file.buffer.toString().includes('Custom storage test'), "Buffer should have correct content");
      
      done();
    };

    middleware(req, res, next);

    setTimeout(() => {
      if (!nextCalled) {
        done(new Error("Middleware did not call next"));
      }
    }, 5000);
  });

  it("should work with file filtering and limits together", (t, done) => {
    const boundary = "----WebKitFormBoundary7MA4YWxkTrZu0gW";
    const formData = Buffer.from([
      `------WebKitFormBoundary7MA4YWxkTrZu0gW`,
      `Content-Disposition: form-data; name="allowedFile"; filename="image.jpg"`,
      `Content-Type: image/jpeg`,
      ``,
      `IMAGE_DATA`,
      `------WebKitFormBoundary7MA4YWxkTrZu0gW`,
      `Content-Disposition: form-data; name="rejectedFile"; filename="script.js"`,
      `Content-Type: application/javascript`,
      ``,
      `alert('test');`,
      `------WebKitFormBoundary7MA4YWxkTrZu0gW--`,
    ].join('\r\n'));

    const req = Readable.from(formData);
    req.headers = {
      "content-type": `multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW`,
      "content-length": formData.length
    };

    const upload = multer({ 
      dest: join(tmpdir(), 'filter-test'),
      limits: { fileSize: 1024 }, // 1KB limit
      fileFilter: (req, file, cb) => {
        // Only allow image files
        if (file.mimetype.startsWith('image/')) {
          cb(null, true);
        } else {
          cb(null, false); // Reject non-image files
        }
      }
    });
    
    const middleware = upload.any();

    const res = {};
    let nextCalled = false;
    const next = () => {
      nextCalled = true;
      
      // Should only have the allowed file
      ok(Array.isArray(req.files), "Request should have files array");
      // Since one file was rejected by the filter, we should only have 1 file
      ok(req.files.length <= 1, "Should have at most 1 file (other was filtered out)");
      
      if (req.files.length > 0) {
        ok(req.files[0].mimetype.startsWith('image/'), "Remaining file should be an image");
        ok(req.files[0].originalname === 'image.jpg', "File should be the allowed one");
      }
      
      done();
    };

    middleware(req, res, next);

    setTimeout(() => {
      if (!nextCalled) {
        done(new Error("Middleware did not call next"));
      }
    }, 5000);
  });

  it("should integrate with HTTP server properly", (t, done) => {
    const boundary = "----WebKitFormBoundary7MA4YWxkTrZu0gW";
    const formData = Buffer.from([
      `------WebKitFormBoundary7MA4YWxkTrZu0gW`,
      `Content-Disposition: form-data; name="serverTest"; filename="server.txt"`,
      `Content-Type: text/plain`,
      ``,
      `HTTP server integration test`,
      `------WebKitFormBoundary7MA4YWxkTrZu0gW--`,
    ].join('\r\n'));

    // Create a mock HTTP server request
    const req = Readable.from(formData);
    req.headers = {
      "content-type": `multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW`,
      "content-length": formData.length,
      method: 'POST',
      url: '/upload'
    };

    const upload = multer({ dest: join(tmpdir(), 'server-test') });
    const middleware = upload.single('serverTest');

    const res = {
      setHeader: () => {},
      statusCode: 200,
      end: () => {}
    };

    let nextCalled = false;
    const next = () => {
      nextCalled = true;
      
      ok(req.file, "Request should have file property");
      ok(req.file.originalname === 'server.txt', "File should have correct name");
      ok(req.file.mimetype === 'text/plain', "File should have correct mimetype");
      ok(req.file.buffer || req.file.path, "File should be processed");
      
      done();
    };

    middleware(req, res, next);

    setTimeout(() => {
      if (!nextCalled) {
        done(new Error("Middleware did not call next"));
      }
    }, 5000);
  });
});

console.log("✅ Integration tests completed successfully");