/**
 * Error classes compatible with Multer
 */

import { t } from './i18n/index.js';

export class MulterError extends Error {
  public code: string;
  public field?: string;
  public storageErrors?: Error[];

  constructor(code: string, field?: string) {
    super();
    this.name = 'MulterError';
    this.code = code;
    this.field = field;
    this.message = t(code);

    // Maintain proper stack trace
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, MulterError);
    }
  }
}

// Error codes constants for easy reference
export const ERROR_CODES = {
  LIMIT_PART_COUNT: 'LIMIT_PART_COUNT',
  LIMIT_FILE_SIZE: 'LIMIT_FILE_SIZE',
  LIMIT_FILE_COUNT: 'LIMIT_FILE_COUNT',
  LIMIT_FIELD_KEY: 'LIMIT_FIELD_KEY',
  LIMIT_FIELD_VALUE: 'LIMIT_FIELD_VALUE',
  LIMIT_FIELD_COUNT: 'LIMIT_FIELD_COUNT',
  LIMIT_UNEXPECTED_FILE: 'LIMIT_UNEXPECTED_FILE',
  MISSING_FIELD_NAME: 'MISSING_FIELD_NAME',
  INVALID_MULTIPART: 'INVALID_MULTIPART',
  INVALID_CONTENT_TYPE: 'INVALID_CONTENT_TYPE',
  INVALID_BOUNDARY: 'INVALID_BOUNDARY'
} as const;