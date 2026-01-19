// @ts-nocheck - Bun/Web API types são opcionais
/**
 * Adapter para Bun (Elysia e Hono)
 * Suporta tanto Bun.serve nativo quanto frameworks como Elysia e Hono
 */

import { Multer } from "../multer.js";
import type { Options, File } from "../types.js";

/**
 * Converte Request do Bun para formato compatível com Multer
 */
async function adaptBunRequest(bunReq: globalThis.Request): Promise<any> {
  const headers: Record<string, string> = {};
  bunReq.headers.forEach((value, key) => {
    headers[key] = value;
  });

  return {
    method: bunReq.method,
    url: bunReq.url,
    headers,
    body: {},
    // Cria um stream a partir do body do Request
    pipe: (dest: any) => {
      if (bunReq.body) {
        const reader = bunReq.body.getReader();
        const pump = async () => {
          const { done, value } = await reader.read();
          if (done) {
            dest.end();
            return;
          }
          dest.write(value);
          pump();
        };
        pump();
      }
      return dest;
    },
    on: () => {},
    once: () => {},
  };
}

/**
 * Classe adapter para Bun
 */
export class BunMulter {
  private multer: Multer;

  constructor(options: Options = {}) {
    this.multer = new Multer(options);
  }

  /**
   * Processa um request do Bun e retorna os dados extraídos
   */
  private async processRequest(
    request: Request,
    handler: any,
  ): Promise<{
    body: any;
    file?: File;
    files?: File[] | { [key: string]: File[] };
  }> {
    const adaptedReq = await adaptBunRequest(request);

    return new Promise((resolve, reject) => {
      const mockRes = {
        statusCode: 200,
        setHeader: () => {},
        end: () => {},
      };

      handler(adaptedReq, mockRes, (err?: any) => {
        if (err) {
          reject(err);
        } else {
          resolve({
            body: adaptedReq.body,
            file: adaptedReq.file,
            files: adaptedReq.files,
          });
        }
      });
    });
  }

  /**
   * Accept a single file with the given field name
   */
  async single(request: Request, fieldname: string) {
    const middleware = this.multer.single(fieldname);
    return this.processRequest(request, middleware);
  }

  /**
   * Accept an array of files
   */
  async array(request: Request, fieldname: string, maxCount?: number) {
    const middleware = this.multer.array(fieldname, maxCount);
    return this.processRequest(request, middleware);
  }

  /**
   * Accept a mix of files
   */
  async fields(
    request: Request,
    fields: Array<{ name: string; maxCount?: number }>,
  ) {
    const middleware = this.multer.fields(fields);
    return this.processRequest(request, middleware);
  }

  /**
   * Accept only text fields
   */
  async none(request: Request) {
    const middleware = this.multer.none();
    return this.processRequest(request, middleware);
  }

  /**
   * Accept any files
   */
  async any(request: Request) {
    const middleware = this.multer.any();
    return this.processRequest(request, middleware);
  }
}

/**
 * Plugin para Elysia
 */
export function elysiaMulter(options: Options = {}) {
  const multer = new BunMulter(options);

  return {
    name: "elysia-multer",
    async transform({ request }: any) {
      // Adiciona os métodos do multer ao contexto
      return {
        multer: {
          single: (fieldname: string) => multer.single(request, fieldname),
          array: (fieldname: string, maxCount?: number) =>
            multer.array(request, fieldname, maxCount),
          fields: (fields: any[]) => multer.fields(request, fields),
          none: () => multer.none(request),
          any: () => multer.any(request),
        },
      };
    },
  };
}

/**
 * Middleware para Hono
 */
export function honoMulter(options: Options = {}) {
  const multer = new BunMulter(options);

  return {
    single:
      (fieldname: string) => async (c: any, next: () => Promise<void>) => {
        const result = await multer.single(c.req.raw, fieldname);
        c.set("uploadData", result);
        await next();
      },
    array:
      (fieldname: string, maxCount?: number) =>
      async (c: any, next: () => Promise<void>) => {
        const result = await multer.array(c.req.raw, fieldname, maxCount);
        c.set("uploadData", result);
        await next();
      },
    fields: (fields: any[]) => async (c: any, next: () => Promise<void>) => {
      const result = await multer.fields(c.req.raw, fields);
      c.set("uploadData", result);
      await next();
    },
    none: () => async (c: any, next: () => Promise<void>) => {
      const result = await multer.none(c.req.raw);
      c.set("uploadData", result);
      await next();
    },
    any: () => async (c: any, next: () => Promise<void>) => {
      const result = await multer.any(c.req.raw);
      c.set("uploadData", result);
      await next();
    },
  };
}

/**
 * Factory function para criar instância do BunMulter
 */
export function createBunMulter(options: Options = {}): BunMulter {
  return new BunMulter(options);
}

export default createBunMulter;
