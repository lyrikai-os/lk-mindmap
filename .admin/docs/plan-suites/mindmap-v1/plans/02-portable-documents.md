# Portable documents and board library

## Goal and stop condition

Boards can be created, reopened, renamed, duplicated, and saved without losing embedded images.

## Prerequisites

Unit 01 and architecture document contract. Read suite README, END-GOAL, specs, and product gear RULEBOOK first.

## Walls

In scope: Document schema, Electron storage/IPC, board-library UI, and storage tests under lk-mindmap_v1/; runtime boards/ fixtures isolated from personal files.

Out of scope: Custom tool actions and packaging. Do not revert concurrent edits. Scaffold CSS remains reset/layout/art-direction token stubs until unit 03; the art-direction Avoid list applies from unit 01. No tip writes.

## Ordered steps

1. Implement versioned wrapper and validate load before replacing the active scene.
2. Implement main-process board operations with safe names and configured shared boards directory.
3. Add serialized atomic-save/recovery handling, revision-aware autosave, and truthful save state.
4. Flush safely on close/switch and preserve pending edits on failure.
5. Add roundtrip, corrupted-input, save-race, collision, and failed-write tests.

## Verification

Run from `lk-mindmap_v1/`: `npm test` and `npm run typecheck` exit 0; image-bearing file copied without originals reopens. Record failures rather than claiming success.

## Evidence and handoff

Record implementation paths, dependency versions, verification commands/exit codes, manual observations, evidence paths, limitations, and open issues in the verification guide or parent handoff. Current evidence: pending.

## Next dependency

Unit 03.
