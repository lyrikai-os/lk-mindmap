# 04 — Chrome, App split, verify, package

## Goal and stop condition

Dual Excalidraw toolbar chrome is tamed; `App.tsx` is lightly split into library / tools / canvas / docs modules; engineering docs synced; typecheck / tests / e2e / build / package recorded; cold-offline note in verification.

## Prerequisites

Units 01–03 feature work merged into the working tree.

## Walls

In scope: CSS/UIOptions to reduce competing Excalidraw chrome; file split under `lk-mindmap_v1/src/`; sync README / user-guide-delta / verification; evidence commands.

Out of scope: signing, notarization, store distribution, Admin preview lock, silent main merge, tip writes.

## Ordered steps

1. **Tame dual toolbar:** hide or shrink redundant Excalidraw UI that fights floating toolsets (UIOptions / CSS). Keep undo/redo and essential canvas tools reachable.
2. **Thin App.tsx split:** extract library sidebar, toolsets, canvas shell, and Docs into modules; keep behavior identical; avoid drive-by refactors.
3. **Engineering docs sync:** update product README and suite [user-guide-delta](../guides/user-guide-delta.md) / [verification](../guides/verification.md) with measured commands.
4. **Evidence matrix:** from `lk-mindmap_v1/` run `npm run typecheck`, `npm test`, `npm run test:e2e`, `npm run build`, `npm run package`. Record exits and paths.
5. **Cold-offline note:** document package launch with network unavailable (fonts/canvas/docs/files). If not fully exercised, disclose as limitation (match v1 honesty).

## Verification

All automated commands exit 0 or failures disclosed. Packaged app path under `release/mac-arm64/LYRIKAI board.app` when package succeeds.

## Evidence / handoff

Fill pending fields in `guides/verification.md`. Parent Orchestrator rollup lists remaining HOLD (signing, Admin merge, gears).

## Next dependency

None inside this suite. Closeout / Admin preview / merge are separate conductor asks.
