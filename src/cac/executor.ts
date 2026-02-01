// src/cac/executor.ts (import correto)
import { loadContext } from "./loaders.ts";
import { validateInvariants } from "./validators/invariants.ts";
import { validateSpecs } from "./validators/specs.ts";
import { validateRuleset } from "./validators/ruleset.ts";
import { validateDependencies } from "./validators/dependencies.ts";
import { validateSecurity } from "./validators/security.ts";
import { validateDecisions } from "./validators/decisions.ts";
import { emitEvidence } from "./evidence.ts";

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
