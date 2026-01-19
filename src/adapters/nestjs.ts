// @ts-nocheck - NestJS types são peer dependencies opcionais
/**
 * Adapter para NestJS
 * Cria decorators e interceptors compatíveis com NestJS
 */

import type {
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Type,
  CustomDecorator,
} from "@nestjs/common";
import { Observable } from "rxjs";
import { Multer } from "../multer.js";
import type { Options, File, FieldSpec } from "../types.js";

/**
 * Interceptor para processar uploads no NestJS
 */
export class NestMulterInterceptor implements NestInterceptor {
  private multer: Multer;
  private handler: any;

  constructor(
    options: Options = {},
    private type: "single" | "array" | "fields" | "none" | "any" = "single",
    private fieldNameOrSpec?: string | FieldSpec[],
    private maxCount?: number,
  ) {
    this.multer = new Multer(options);
    this.initHandler();
  }

  private initHandler() {
    switch (this.type) {
      case "single":
        this.handler = this.multer.single(this.fieldNameOrSpec as string);
        break;
      case "array":
        this.handler = this.multer.array(
          this.fieldNameOrSpec as string,
          this.maxCount,
        );
        break;
      case "fields":
        this.handler = this.multer.fields(this.fieldNameOrSpec as FieldSpec[]);
        break;
      case "none":
        this.handler = this.multer.none();
        break;
      case "any":
        this.handler = this.multer.any();
        break;
    }
  }

  async intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Promise<Observable<any>> {
    const ctx = context.switchToHttp();
    const req = ctx.getRequest();
    const res = ctx.getResponse();

    await new Promise<void>((resolve, reject) => {
      this.handler(req, res, (err?: any) => {
        if (err) reject(err);
        else resolve();
      });
    });

    return next.handle();
  }
}

/**
 * Decorator para arquivo único
 */
export function UploadedFile(
  fieldName: string,
  options?: Options,
): ParameterDecorator {
  return (
    target: any,
    propertyKey: string | symbol,
    parameterIndex: number,
  ) => {
    // Implementação simplificada - em produção seria integrado com @nestjs/common
    const existingParameters =
      Reflect.getMetadata("design:paramtypes", target, propertyKey) || [];
    existingParameters[parameterIndex] = { type: "file", fieldName, options };
    Reflect.defineMetadata(
      "design:paramtypes",
      existingParameters,
      target,
      propertyKey,
    );
  };
}

/**
 * Decorator para múltiplos arquivos
 */
export function UploadedFiles(
  fieldName?: string,
  options?: Options,
): ParameterDecorator {
  return (
    target: any,
    propertyKey: string | symbol,
    parameterIndex: number,
  ) => {
    const existingParameters =
      Reflect.getMetadata("design:paramtypes", target, propertyKey) || [];
    existingParameters[parameterIndex] = { type: "files", fieldName, options };
    Reflect.defineMetadata(
      "design:paramtypes",
      existingParameters,
      target,
      propertyKey,
    );
  };
}

/**
 * Factory para criar interceptor de arquivo único
 */
export function FileInterceptor(
  fieldName: string,
  options?: Options,
): Type<NestInterceptor> {
  return class extends NestMulterInterceptor {
    constructor() {
      super(options || {}, "single", fieldName);
    }
  };
}

/**
 * Factory para criar interceptor de múltiplos arquivos
 */
export function FilesInterceptor(
  fieldName: string,
  maxCount?: number,
  options?: Options,
): Type<NestInterceptor> {
  return class extends NestMulterInterceptor {
    constructor() {
      super(options || {}, "array", fieldName, maxCount);
    }
  };
}

/**
 * Factory para criar interceptor de campos mistos
 */
export function FileFieldsInterceptor(
  fields: FieldSpec[],
  options?: Options,
): Type<NestInterceptor> {
  return class extends NestMulterInterceptor {
    constructor() {
      super(options || {}, "fields", fields);
    }
  };
}

/**
 * Factory para criar interceptor que aceita qualquer arquivo
 */
export function AnyFilesInterceptor(options?: Options): Type<NestInterceptor> {
  return class extends NestMulterInterceptor {
    constructor() {
      super(options || {}, "any");
    }
  };
}

/**
 * Cria uma instância do Multer para uso direto no NestJS
 */
export function createNestMulter(options: Options = {}): Multer {
  return new Multer(options);
}

export default createNestMulter;
