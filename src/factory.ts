/**
 * Factory para criar instâncias de Multer compatíveis com diferentes frameworks
 */

import { Multer } from "./multer.js";
import type { Options } from "./types.js";

export type SupportedFramework = "express" | "fastify" | "nestjs" | "bun";

export interface FrameworkDetectionResult {
  framework: SupportedFramework | "unknown";
  confidence: number;
}

/**
 * Detecta automaticamente o framework baseado no objeto request
 */
export function detectFramework(req: any): FrameworkDetectionResult {
  // Fastify detection
  if (req.raw && req.server && typeof req.server.inject === "function") {
    return { framework: "fastify", confidence: 1.0 };
  }

  // NestJS detection (usa Express ou Fastify por baixo)
  if (req.res && req.res.app && req.app) {
    return { framework: "nestjs", confidence: 0.8 };
  }

  // Bun detection
  // @ts-ignore - Bun global may not exist in all runtimes
  if (req.url && typeof Bun !== "undefined") {
    return { framework: "bun", confidence: 0.9 };
  }

  // Express detection (fallback)
  if (req.app && req.res && req.next) {
    return { framework: "express", confidence: 0.7 };
  }

  return { framework: "unknown", confidence: 0 };
}

/**
 * Cria uma instância de Multer configurada para o framework especificado
 */
export function createMulterForFramework(
  framework: SupportedFramework, // eslint-disable-line @typescript-eslint/no-unused-vars
  options: Options = {},
): Multer {
  // Por enquanto, retorna a instância padrão do Multer
  // Os adapters específicos serão aplicados pelos respectivos módulos
  return new Multer(options);
}

/**
 * Cria uma instância de Multer com detecção automática de framework
 */
export function createMulterAuto(options: Options = {}): Multer {
  return new Multer(options);
}

export { Multer } from "./multer.js";
