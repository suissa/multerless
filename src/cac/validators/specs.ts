// cac/validators/specs.ts
import type { Context } from "../types.js";

export function validateSpecs(ctx: Context) {
  for (const spec of ctx.specs) {
    if (!spec.content.toLowerCase().includes("decision")) {
      throw new Error(`Spec ${spec.name} missing Decision section`);
    }

    if (spec.content.includes("TODO")) {
      throw new Error(`Spec ${spec.name} contains TODO`);
    }
  }
}
