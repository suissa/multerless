import { describe, it } from "node:test";
import { strictEqual, ok } from "node:assert";
import { Readable } from "node:stream";
import multer from "../dist/index.js";

// Helper to simulate a request with multipart/form-data
function createMockRequest(boundary, body) {
  const req = Readable.from(body);
  req.headers = {
    "content-type": `multipart/form-data; boundary=${boundary}`,
  };
  return req;
}

describe("Multer Uploads (Memory Storage)", () => {
  it("should parse a single file", async () => {
    const upload = multer({ storage: multer.memoryStorage() });
    const boundary = "----TestBoundary";
    const body = Buffer.concat([
      Buffer.from(`--${boundary}\r\n`),
      Buffer.from('Content-Disposition: form-data; name="file"; filename="test.txt"\r\n'),
      Buffer.from("Content-Type: text/plain\r\n\r\n"),
      Buffer.from("hello world"),
      Buffer.from(`\r\n--${boundary}--\r\n`),
    ]);

    const req = createMockRequest(boundary, body);
    const middleware = upload.single("file");

    await new Promise((resolve, reject) => {
      middleware(req, {}, (err) => {
        if (err) return reject(err);
        resolve();
      });
    });

    ok(req.file);
    strictEqual(req.file.fieldname, "file");
    strictEqual(req.file.originalname, "test.txt");
    strictEqual(req.file.mimetype, "text/plain");
    strictEqual(req.file.buffer.toString(), "hello world\r\n");
  });

  it("should parse multiple files (array)", async () => {
    const upload = multer({ storage: multer.memoryStorage() });
    const boundary = "----TestBoundary";
    const body = Buffer.concat([
      Buffer.from(`--${boundary}\r\n`),
      Buffer.from('Content-Disposition: form-data; name="photos"; filename="1.jpg"\r\n'),
      Buffer.from("Content-Type: image/jpeg\r\n\r\n"),
      Buffer.from("image1"),
      Buffer.from(`\r\n--${boundary}\r\n`),
      Buffer.from('Content-Disposition: form-data; name="photos"; filename="2.jpg"\r\n'),
      Buffer.from("Content-Type: image/jpeg\r\n\r\n"),
      Buffer.from("image2"),
      Buffer.from(`\r\n--${boundary}--\r\n`),
    ]);

    const req = createMockRequest(boundary, body);
    const middleware = upload.array("photos", 2);

    await new Promise((resolve, reject) => {
      middleware(req, {}, (err) => {
        if (err) return reject(err);
        resolve();
      });
    });

    ok(Array.isArray(req.files));
    strictEqual(req.files.length, 2);
    strictEqual(req.files[0].originalname, "1.jpg");
    strictEqual(req.files[1].originalname, "2.jpg");
  });

  it("should parse text fields", async () => {
    const upload = multer({ storage: multer.memoryStorage() });
    const boundary = "----TestBoundary";
    const body = Buffer.concat([
      Buffer.from(`--${boundary}\r\n`),
      Buffer.from('Content-Disposition: form-data; name="username"\r\n\r\n'),
      Buffer.from("suissa"),
      Buffer.from(`\r\n--${boundary}\r\n`),
      Buffer.from('Content-Disposition: form-data; name="email"\r\n\r\n'),
      Buffer.from("suissa@example.com"),
      Buffer.from(`\r\n--${boundary}--\r\n`),
    ]);

    const req = createMockRequest(boundary, body);
    const middleware = upload.none();

    await new Promise((resolve, reject) => {
      middleware(req, {}, (err) => {
        if (err) return reject(err);
        resolve();
      });
    });

    ok(req.body);
    strictEqual(req.body.username, "suissa\r\n");
    strictEqual(req.body.email, "suissa@example.com\r\n");
  });
});
