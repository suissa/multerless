// cac/evidence.ts
import fs from "node:fs";
import path from "node:path";

import { asTimestamp, asEvidenceReason, type Evidence } from "./types.js";

export function emitEvidence(evidence: Partial<Evidence>) {
  const payload: Evidence = {
    status: evidence.status || "rejected",
    reason: evidence.reason ? asEvidenceReason(evidence.reason) : undefined,
    timestamp: asTimestamp(new Date().toISOString()),
  };

  const file = path.resolve(process.cwd(), "cac.evidence.json");

  fs.writeFileSync(file, JSON.stringify(payload, null, 2), "utf-8");

  console.log("EVIDENCE:", payload);
}
