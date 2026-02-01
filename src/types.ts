/**
 * Type definitions compatible with Multer
 */

import { IncomingMessage, ServerResponse } from 'node:http';
import { Readable } from 'node:stream';

// Nominal Semantic Types (Branded Types)
export type Bytes = number & { readonly __brand: 'Bytes' };
export type FieldName = string & { readonly __brand: 'FieldName' };
export type FileName = string & { readonly __brand: 'FileName' };
export type MimeType = string & { readonly __brand: 'MimeType' };
export type BucketName = string & { readonly __brand: 'BucketName' };
export type StorageKey = string & { readonly __brand: 'StorageKey' };

// Utility to cast types safely
export const asBytes = (n: number) => n as Bytes;
export const asFieldName = (s: string) => s as FieldName;
export const asFileName = (s: string) => s as FileName;
export const asMimeType = (s: string) => s as MimeType;
export const asBucketName = (s: string) => s as BucketName;
export const asStorageKey = (s: string) => s as StorageKey;

// Express-like Request/Response interfaces
export interface Request extends IncomingMessage {
  body?: any;
  file?: File;
  files?: File[] | { [fieldname: string]: File[] };
  params?: { [key: string]: string };
  query?: { [key: string]: any };
  headers: IncomingMessage['headers'];
}

export interface Response extends ServerResponse {
  status(code: number): Response;
  json(data: any): void;
  send(data: any): void;
}

export interface NextFunction {
  (err?: any): void;
}

// File interface compatible with Multer
export interface File {
  /** Field name specified in the form */
  fieldname: FieldName;
  /** Name of the file on the user's computer */
  originalname: FileName;
  /** Encoding type of the file */
  encoding: string;
  /** Mime type of the file */
  mimetype: MimeType;
  /** Size of the file in bytes */
  size: Bytes;
  /** The folder to which the file has been saved (DiskStorage) */
  destination?: string;
  /** The name of the file within the destination (DiskStorage) */
  filename?: FileName;
  /** Location of the uploaded file (DiskStorage) */
  path?: string;
  /** A Buffer of the entire file (MemoryStorage) */
  buffer?: Buffer;
  /** Location URL (S3/GCS Storage) */
  location?: string;
  /** ETag (S3 Storage) */
  etag?: string;
  /** Bucket name (S3/GCS Storage) */
  bucket?: BucketName;
  /** Key/filename in storage (S3/GCS Storage) */
  key?: StorageKey;
}

// Field interface for text fields
export interface Field {
  /** Field name */
  name: FieldName;
  /** Field value */
  value: string;
}

// File filter callback
export interface FileFilterCallback {
  (error: Error | null, acceptFile?: boolean): void;
}

// Limits configuration
export interface Limits {
  /** Max field name size (in bytes) */
  fieldNameSize?: Bytes;
  /** Max field value size (in bytes) */
  fieldSize?: Bytes;
  /** Max number of non-file fields */
  fields?: number;
  /** For multipart forms, the max file size (in bytes) */
  fileSize?: Bytes;
  /** For multipart forms, the max number of file fields */
  files?: number;
  /** For multipart forms, the max number of parts (fields + files) */
  parts?: number;
  /** For multipart forms, the max number of header key=>value pairs */
  headerPairs?: number;
}

// Storage Engine interface
export interface StorageEngine {
  _handleFile(req: Request, file: FileInfo, callback: (error?: any, info?: Partial<File>) => void): void;
  _removeFile?(req: Request, file: File, callback: (error?: any) => void): void;
}

// Internal file info during processing
export interface FileInfo {
  fieldname: FieldName;
  originalname: FileName;
  encoding: string;
  mimetype: MimeType;
  stream: Readable;
}

// Main options interface
export interface Options {
  /** The destination directory for uploaded files */
  dest?: string;
  /** The storage engine to use */
  storage?: StorageEngine;
  /** An object specifying the size limits */
  limits?: Limits;
  /** Set to true to include the text fields of the multipart form */
  includeEmptyFields?: boolean;
  /** Function to control which files should be uploaded */
  fileFilter?(req: Request, file: File, callback: FileFilterCallback): void;
  /** Preserve the full path of files instead of just the base name */
  preservePath?: boolean;
}

// Storage-specific options
export interface DiskStorageOptions {
  /** Function to determine the destination directory */
  destination?: string | ((req: Request, file: File, callback: (error: Error | null, destination: string) => void) => void);
  /** Function to determine the filename */
  filename?: FileName | ((req: Request, file: File, callback: (error: Error | null, filename: FileName) => void) => void);
}

export interface MemoryStorageOptions {
  // Memory storage doesn't need specific options
}

export interface S3StorageOptions {
  /** S3 bucket name */
  bucket: BucketName;
  /** AWS region */
  region?: string;
  /** Function to determine the S3 key */
  key?: StorageKey | ((req: Request, file: File) => StorageKey);
  /** S3 ACL */
  acl?: string;
  /** Content type */
  contentType?: MimeType | ((req: Request, file: File) => MimeType);
  /** Metadata */
  metadata?: { [key: string]: string } | ((req: Request, file: File) => { [key: string]: string });
}

export interface GCSStorageOptions {
  /** GCS bucket name */
  bucket: BucketName;
  /** Function to determine the filename */
  filename?: FileName | ((req: Request, file: File) => FileName);
  /** Metadata */
  metadata?: { [key: string]: string } | ((req: Request, file: File) => { [key: string]: string });
}

// Middleware function type
export interface RequestHandler {
  (req: Request, res: Response, next: NextFunction): void | Promise<void>;
}

// Field specification for .fields() method
export interface FieldSpec {
  name: FieldName;
  maxCount?: number;
}
