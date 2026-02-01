// cac/validators/invariants.ts
import type { Context } from "../types.js";

export function validateInvariants(ctx: Context) {
  const required = [
    "deterministic",
    "never left pending",
    "automatic",
  ];

  for (const inv of required) {
    if (!ctx.invariants.includes(inv)) {
      throw new Error(`Invariant violated: ${inv}`);
    }
  }
}
