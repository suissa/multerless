// @ts-nocheck - Fastify types são peer dependencies opcionais
/**
 * Adapter para Fastify
 * Converte entre FastifyRequest/FastifyReply e a interface esperada pelo multerless
 */

import type {
  FastifyRequest,
  FastifyReply,
  FastifyPluginCallback,
} from "fastify";
import { Multer } from "../multer.js";
import type { Options, File } from "../types.js";

// Estende a interface do FastifyRequest para incluir file e files
declare module "fastify" {
  interface FastifyRequest {
    file?: File;
    files?: File[] | { [fieldname: string]: File[] };
  }
}

/**
 * Converte FastifyRequest para o formato esperado pelo Multer
 */
function adaptFastifyRequest(fastifyReq: FastifyRequest): any {
  return {
    ...fastifyReq.raw,
    body: fastifyReq.body || {},
    headers: fastifyReq.headers,
    method: fastifyReq.method,
    url: fastifyReq.url,
  };
}

/**
 * Cria um preHandler do Fastify a partir de um middleware Multer
 */
function createFastifyHandler(multerMiddleware: any) {
  return async (request: FastifyRequest, reply: FastifyReply) => {
    return new Promise<void>((resolve, reject) => {
      const adaptedReq = adaptFastifyRequest(request);

      multerMiddleware(adaptedReq, reply.raw, (err?: any) => {
        if (err) {
          reject(err);
        } else {
          // Copia os dados processados de volta para o request do Fastify
          request.body = adaptedReq.body;

          if (adaptedReq.file) {
            request.file = adaptedReq.file;
          }

          if (adaptedReq.files) {
            request.files = adaptedReq.files;
          }

          resolve();
        }
      });
    });
  };
}

/**
 * Classe adapter para Fastify
 */
export class FastifyMulter {
  private multer: Multer;

  constructor(options: Options = {}) {
    this.multer = new Multer(options);
  }

  /**
   * Accept a single file with the given field name
   */
  single(fieldname: string) {
    const middleware = this.multer.single(fieldname);
    return createFastifyHandler(middleware);
  }

  /**
   * Accept an array of files, all with the given field name
   */
  array(fieldname: string, maxCount?: number) {
    const middleware = this.multer.array(fieldname, maxCount);
    return createFastifyHandler(middleware);
  }

  /**
   * Accept a mix of files, specified by fields
   */
  fields(fields: Array<{ name: string; maxCount?: number }>) {
    const middleware = this.multer.fields(fields);
    return createFastifyHandler(middleware);
  }

  /**
   * Accept only text fields
   */
  none() {
    const middleware = this.multer.none();
    return createFastifyHandler(middleware);
  }

  /**
   * Accept any files that comes over the wire
   */
  any() {
    const middleware = this.multer.any();
    return createFastifyHandler(middleware);
  }
}

/**
 * Plugin do Fastify para registrar o multer
 */
export const fastifyMulter: FastifyPluginCallback<Options> = (
  fastify,
  options,
  done,
) => {
  const multer = new FastifyMulter(options);

  fastify.decorate("multer", multer);

  done();
};

/**
 * Factory function para criar instância do FastifyMulter
 */
export function createFastifyMulter(options: Options = {}): FastifyMulter {
  return new FastifyMulter(options);
}

export default createFastifyMulter;
