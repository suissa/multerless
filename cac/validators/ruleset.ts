// cac/validators/ruleset.ts
import type { Context } from "../types.ts";

export function validateRuleset(ctx: Context) {
  
  // Basic validation: ensure the ruleset is not empty and has a 'rules' section
  if (!ctx.ruleset.includes("rules:")) {
    throw new Error("Ruleset violated: missing 'rules:' section");
  }

  const expectedRules = [
    "no_external_dependencies",
    "immutable_api",
    "zero_backlog"
  ];

  for (const ruleId of expectedRules) {
    if (!ctx.ruleset.includes(ruleId)) {
      throw new Error(`Ruleset violated: critical rule '${ruleId}' not found`);
    }
  }
}
