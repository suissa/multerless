# ADR-001: Nominal Semantic Types for Safety

## Status
Status: accepted

## Date
2026-02-01

## Context
Standard primitive types (string, number) do not prevent semantic errors (e.g., passing a path where a filename is expected).

## Decision
We will use **Branded Types** (Nominal Semantic Types) for all critical data structures (FileName, Bytes, MimeType, etc.).

## Consequences
- Compile-time safety for semantic meaning.
- Requires explicit casting via utility functions (`asFileName`, `asBytes`).
- Zero runtime overhead.
