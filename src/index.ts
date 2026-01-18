/**
 * @purecore/native-multer
 * Native Node.js multipart/form-data parser
 * Drop-in replacement for Multer with superior performance and zero dependencies
 */

export { MulterError } from "./errors.js";
export {
  diskStorage,
  memoryStorage,
  s3Storage,
  gcsStorage,
} from "./storage/index.js";
export { default } from "./multer.js";

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
