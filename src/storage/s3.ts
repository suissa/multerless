import type {
  StorageEngine,
  Request,
  File,
  FileInfo,
  S3StorageOptions,
} from "../types.js";
import { asBytes, asBucketName, asStorageKey } from "../types.js";

export class S3Storage implements StorageEngine {
  private bucket: string;
  private region: string;
  private keyGenerator: string | ((req: Request, file: File) => string);

  constructor(options: S3StorageOptions) {
    this.bucket = options.bucket;
    this.region = options.region || "us-east-1";
    this.keyGenerator =
      options.key || (this.defaultKeyGenerator as unknown as string);
  }

  private defaultKeyGenerator(_req: Request, file: File): string {
    return `uploads/${Date.now()}-${file.originalname}`;
  }

  _handleFile(
    req: Request,
    file: FileInfo,
    callback: (error?: any, info?: Partial<File>) => void,
  ): void {
    const key =
      typeof this.keyGenerator === "function"
        ? this.keyGenerator(req, file as unknown as File)
        : this.keyGenerator;

    const chunks: Buffer[] = [];
    let size = 0;

    file.stream.on("data", (chunk: Buffer) => {
      chunks.push(chunk);
      size += chunk.length;
    });

    file.stream.on("end", async () => {
      try {
        // Simulation of S3 upload
        // In production, this would use AWS SDK:
        // const result = await s3.upload({
        //   Bucket: this.bucket,
        //   Key: key,
        //   Body: buffer,
        //   ContentType: contentType,
        //   ACL: this.acl,
        //   Metadata: metadata
        // }).promise();

        const location = `https://${this.bucket}.s3.${this.region}.amazonaws.com/${key}`;
        const etag = `"${Date.now()}"`;

        callback(undefined, {
          size: asBytes(size),
          bucket: asBucketName(this.bucket),
          key: asStorageKey(key),
          location,
          etag,
        });
      } catch (error) {
        callback(error);
      }
    });

    file.stream.on("error", callback);
  }

  _removeFile(
    _req: Request,
    _file: File,
    callback: (error?: any) => void,
  ): void {
    // Simulation of S3 deletion
    // In production:
    // s3.deleteObject({
    //   Bucket: this.bucket,
    //   Key: file.key
    // }, callback);

    callback(); // Simulation of success
  }
}

/**
 * Create an S3 storage engine
 */
export function s3Storage(options: S3StorageOptions): S3Storage {
  return new S3Storage(options);
}
