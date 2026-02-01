// cac/types.ts
/**
 * Nominal Semantic Types (Branded Types) for CaC Architecture
 */

export type SpecName = string & { readonly __brand: 'SpecName' };
export type SpecContent = string & { readonly __brand: 'SpecContent' };
export type EvidenceStatus = 'accepted' | 'rejected';
export type EvidenceReason = string & { readonly __brand: 'EvidenceReason' };
export type Timestamp = string & { readonly __brand: 'Timestamp' };

// Utility to cast types safely
export const asSpecName = (s: string) => s as SpecName;
export const asSpecContent = (s: string) => s as SpecContent;
export const asEvidenceReason = (s: string) => s as EvidenceReason;
export const asTimestamp = (s: string) => s as Timestamp;

export interface Spec {
  name: SpecName;
  content: SpecContent;
}

export interface Context {
  invariants: string;
  ruleset: string;
  specs: Spec[];
  decisions: Spec[];
}

export interface Evidence {
  timestamp: Timestamp;
  status: EvidenceStatus;
  reason?: EvidenceReason;
}
