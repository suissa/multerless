// src/cac/validators/security.ts
import type { Context } from "../types.js";

export function validateSecurity(ctx: Context) {
  // Check if invariants.yml mentions security critical class
  if (!ctx.invariants.includes("class: critical")) {
    throw new Error("SecurityInvariant violated: project must be marked as 'critical'");
  }

  if (!ctx.invariants.includes("surface: multipart/form-data")) {
    throw new Error("SecurityInvariant violated: attack surface must be explicitly defined");
  }

  // Ensure security spec exists in context
  const hasSecuritySpec = ctx.specs.some(s => s.name.toLowerCase().includes("security"));
  if (!hasSecuritySpec) {
    throw new Error("SecurityInvariant violated: missing security-critical-surface specification");
  }
}
