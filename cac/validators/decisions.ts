// src/cac/validators/decisions.ts
import type { Context } from "../types.ts";

export function validateDecisions(ctx: Context) {
  // At least one ADR must exist
  if (ctx.decisions.length === 0) {
    throw new Error("GovernanceInvariant violated: no architectural decisions (ADRs) found");
  }

  for (const decision of ctx.decisions) {
    if (!decision.content.includes("Status: accepted") && !decision.content.includes("Status: proposed")) {
      throw new Error(`Decision ${decision.name} missing status`);
    }
  }
}
