// src/decorators/validate.ts
import { validateUpload } from "../../cac/validators/upload.ts";

/**
 * Decorator to validate file upload invariants
 */
export function ValidateUpload() {
  return function (
    _target: any,
    _propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    const originalMethod = descriptor.value;

    descriptor.value = function (...args: any[]) {
      const file = args[1]; // Assuming 'file' is the second argument (req, file, callback)
      if (file && file.size && file.mimetype) {
        try {
          validateUpload({
            size: file.size,
            type: file.mimetype,
          });
        } catch (err: any) {
          const callback = args[2];
          if (typeof callback === 'function') {
            return callback(err);
          }
          throw err;
        }
      }
      return originalMethod.apply(this, args);
    };

    return descriptor;
  };
}
