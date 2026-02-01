import { describe, it } from "node:test";
import { strictEqual, ok } from "node:assert";
import { Readable } from "node:stream";
import multer from "../dist/index.js";

function createMockRequest(boundary, body) {
  const req = Readable.from(body);
  req.headers = {
    "content-type": `multipart/form-data; boundary=${boundary}`,
  };
  return req;
}

describe("Multer Errors", () => {
  it("should throw LIMIT_FILE_SIZE error", async () => {
    const upload = multer({
      storage: multer.memoryStorage(),
      limits: { fileSize: 5 },
    });
    const boundary = "----TestBoundary";
    const body = Buffer.concat([
      Buffer.from(`--${boundary}\r\n`),
      Buffer.from('Content-Disposition: form-data; name="file"; filename="test.txt"\r\n\r\n'),
      Buffer.from("too large content"),
      Buffer.from(`\r\n--${boundary}--\r\n`),
    ]);

    const req = createMockRequest(boundary, body);
    const middleware = upload.single("file");

    await new Promise((resolve) => {
      middleware(req, {}, (err) => {
        ok(err);
        strictEqual(err.code, "LIMIT_FILE_SIZE");
        resolve();
      });
    });
  });

  it("should throw LIMIT_UNEXPECTED_FILE error", async () => {
    const upload = multer({ storage: multer.memoryStorage() });
    const boundary = "----TestBoundary";
    const body = Buffer.concat([
      Buffer.from(`--${boundary}\r\n`),
      Buffer.from('Content-Disposition: form-data; name="wrong_field"; filename="test.txt"\r\n\r\n'),
      Buffer.from("content"),
      Buffer.from(`\r\n--${boundary}--\r\n`),
    ]);

    const req = createMockRequest(boundary, body);
    const middleware = upload.single("correct_field");

    await new Promise((resolve) => {
      middleware(req, {}, (err) => {
        ok(err);
        strictEqual(err.code, "LIMIT_UNEXPECTED_FILE");
        resolve();
      });
    });
  });

  it("should throw INVALID_CONTENT_TYPE error", async () => {
    const upload = multer();
    const req = Readable.from([]);
    req.headers = { "content-type": "application/json" };
    
    const middleware = upload.any();

    await new Promise((resolve) => {
      middleware(req, {}, (err) => {
        ok(err);
        strictEqual(err.code, "INVALID_CONTENT_TYPE");
        resolve();
      });
    });
  });
});
