# Desktop shell and canvas

## Goal and stop condition

A launchable local Electron window hosts the Excalidraw canvas with locally bundled assets.

## Prerequisites

Approved requirements and this suite. Read suite README, END-GOAL, specs, and product gear RULEBOOK first.

## Walls

In scope: Electron/preload/React shell and build configuration under lk-mindmap_v1/.

Out of scope: Board persistence, final theme treatment, and custom tool actions. Do not revert concurrent edits. Scaffold CSS remains reset/layout/art-direction token stubs until unit 03; the art-direction Avoid list applies from unit 01. No tip writes.

## Ordered steps

1. Create the Electron/React/TypeScript project and lock compatible dependencies.
2. Configure isolated preload, local renderer loading, and minimal named bridge types.
3. Embed Excalidraw in a full-height board surface and bundle fonts/assets.
4. Add library/tool/theme layout placeholders with reset/layout/token stubs only.

## Verification

Run from `lk-mindmap_v1/`: `npm run typecheck` and `npm run build` exit 0; `npm run dev` opens a usable zoomable canvas. Record failures rather than claiming success.

## Evidence and handoff

Record implementation paths, dependency versions, verification commands/exit codes, manual observations, evidence paths, limitations, and open issues in the verification guide or parent handoff. Current evidence: pending.

## Next dependency

Unit 02; final art direction remains owned by 03.
