/**
 * @purecore/native-multer
 * Native Node.js multipart/form-data parser
 * Drop-in replacement for Multer with superior performance and zero dependencies
 */

import multer from "./multer.js";
import { MulterError } from "./errors.js";
import {
  diskStorage,
  memoryStorage,
  s3Storage,
  gcsStorage,
} from "./storage/index.js";

// Attach static methods for compatibility
// @ts-ignore
multer.MulterError = MulterError;
// @ts-ignore
multer.diskStorage = diskStorage;
// @ts-ignore
multer.memoryStorage = memoryStorage;
// @ts-ignore
multer.s3Storage = s3Storage;
// @ts-ignore
multer.gcsStorage = gcsStorage;

export { MulterError };
export { diskStorage, memoryStorage, s3Storage, gcsStorage };
export default multer;

// Factory and Framework Adapters
export {
  createMulterForFramework,
  createMulterAuto,
  detectFramework,
  type SupportedFramework,
  type FrameworkDetectionResult,
} from "./factory.js";

// Fastify Adapter
export {
  FastifyMulter,
  fastifyMulter,
  createFastifyMulter,
} from "./adapters/fastify.js";

// NestJS Adapter
export {
  NestMulterInterceptor,
  FileInterceptor,
  FilesInterceptor,
  FileFieldsInterceptor,
  AnyFilesInterceptor,
  UploadedFile,
  UploadedFiles,
  createNestMulter,
} from "./adapters/nestjs.js";

// Bun Adapter
export {
  BunMulter,
  elysiaMulter,
  honoMulter,
  createBunMulter,
} from "./adapters/bun.js";

// Re-export types for compatibility
export type {
  Request,
  File,
  Field,
  Options,
  StorageEngine,
  DiskStorageOptions,
  MemoryStorageOptions,
  S3StorageOptions,
  GCSStorageOptions,
  FileFilterCallback,
  Limits,
} from "./types.js";
