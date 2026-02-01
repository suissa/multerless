import { describe, it, before, after } from "node:test";
import { strictEqual, ok } from "node:assert";
import { Readable } from "node:stream";
import { existsSync, unlinkSync, mkdirSync, rmdirSync } from "node:fs";
import { join } from "node:path";
import multer from "../dist/index.js";

const UPLOADS_DIR = "./test_uploads";

function createMockRequest(boundary, body) {
  const req = Readable.from(body);
  req.headers = {
    "content-type": `multipart/form-data; boundary=${boundary}`,
  };
  return req;
}

describe("Multer Storage", () => {
  before(() => {
    if (!existsSync(UPLOADS_DIR)) {
      mkdirSync(UPLOADS_DIR);
    }
  });

  after(() => {
    // Cleanup is handled inside tests or here if needed
  });

  it("should save file to disk", async () => {
    const upload = multer({
      storage: multer.diskStorage({
        destination: UPLOADS_DIR,
        filename: (req, file, cb) => cb(null, "disk-test.txt"),
      }),
    });

    const boundary = "----TestBoundary";
    const body = Buffer.concat([
      Buffer.from(`--${boundary}\r\n`),
      Buffer.from('Content-Disposition: form-data; name="file"; filename="test.txt"\r\n\r\n'),
      Buffer.from("disk storage test"),
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

    const filePath = join(UPLOADS_DIR, "disk-test.txt");
    ok(existsSync(filePath));
    
    // Clean up
    unlinkSync(filePath);
  });
});
