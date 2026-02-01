// cac/executor.ts  (import correto)
import { loadContext } from "./loaders.ts";
// import { validateInvariants } from "./validators/invariants.ts";
// import { validateSpecs } from "./validators/specs.ts";
// import { emitEvidence } from "./evidence.ts";
import * as inv from "./validators/invariants.ts";
import * as ev from "./validators/evidence.ts";
import * as uv from "./validators/specs.ts";

inv.validateInvariants(ctx);
try {
  const ctx = loadContext();

  inv.validateInvariants(ctx);
  uv.validateSpecs(ctx);

  ev.emitEvidence({ status: "accepted" });
  process.exit(0);
} catch (err: any) {
  ev.emitEvidence({ status: "rejected", reason: err.message });
  process.exit(1);
}
