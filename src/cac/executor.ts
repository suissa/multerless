// src/cac/executor.ts (import correto)
import { loadContext } from "./loaders.js";
import { validateInvariants } from "./validators/invariants.js";
import { validateSpecs } from "./validators/specs.js";
import { validateRuleset } from "./validators/ruleset.js";
import { validateDependencies } from "./validators/dependencies.js";
import { validateSecurity } from "./validators/security.js";
import { validateDecisions } from "./validators/decisions.js";
import { emitEvidence } from "./evidence.js";

try {
  const ctx = loadContext();

  validateInvariants(ctx);
  validateRuleset(ctx);
  validateDependencies(ctx);
  validateSecurity(ctx);
  validateDecisions(ctx);
  validateSpecs(ctx);

  emitEvidence({ status: "accepted" });
  process.exit(0);
} catch (err: any) {
  emitEvidence({ status: "rejected", reason: err.message });
  process.exit(1);
}
