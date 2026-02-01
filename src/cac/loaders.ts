// cac/loaders.ts
import fs from "node:fs";
import path from "node:path";

import { asSpecContent, asSpecName, type Context } from "./types.js";

function read(file: string) {
  try {
    return fs.readFileSync(path.resolve(file), "utf-8");
  } catch (err) {
    throw new Error(`Failed to read file: ${file}`);
  }
}

export function loadContext(): Context {
  const cacDir = path.resolve(process.cwd(), ".cac");
  const specsDir = path.join(cacDir, "specifications");
  const decisionsDir = path.join(cacDir, "decisions");

  return {
    invariants: read(path.join(cacDir, "invariants.yml")),
    ruleset: read(path.join(cacDir, "ruleset.yml")),
    specs: fs
      .readdirSync(specsDir)
      .filter((f) => f.endsWith(".spec.yml"))
      .map((f) => ({
        name: asSpecName(f),
        content: asSpecContent(read(path.join(specsDir, f))),
      })),
    decisions: fs
      .readdirSync(decisionsDir)
      .filter((f) => f.endsWith(".md"))
      .map((f) => ({
        name: asSpecName(f),
        content: asSpecContent(read(path.join(decisionsDir, f))),
      })),
  };
}
