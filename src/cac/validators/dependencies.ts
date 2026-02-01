// src/cac/validators/dependencies.ts
import fs from "node:fs";
import path from "node:path";
import type { Context } from "../types.js";

export function validateDependencies(_ctx: Context) {
  const pkgPath = path.resolve(process.cwd(), "package.json");
  const pkg = JSON.parse(fs.readFileSync(pkgPath, "utf-8"));

  const deps = pkg.dependencies || {};
  const depNames = Object.keys(deps);

  if (depNames.length > 0) {
    throw new Error(`Invariant violated: zero-dependencies. Found: ${depNames.join(", ")}`);
  }

  // Optional: Check if devDependencies are within acceptable limits or types only
  const devDeps = pkg.devDependencies || {};
  for (const name of Object.keys(devDeps)) {
    if (!name.startsWith("@types/") && !["typescript", "c8", "rimraf", "bun-types"].includes(name)) {
      // In a strict CaC, even devDeps might be restricted, but for now we allow build tools
    }
  }
}
