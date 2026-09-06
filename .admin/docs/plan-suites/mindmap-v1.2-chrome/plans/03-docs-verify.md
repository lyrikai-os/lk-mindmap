# 03 — Docs + verify

## Goal and stop condition

In-app Docs and attic delta describe the real UI; typecheck / tests / e2e / build recorded; clean footer noted.

## Prerequisites

Units 01–02 feature work in the working tree.

## Walls

In scope: bundled Markdown under `lk-mindmap_v1/src/docs/`; suite [user-guide-delta](../guides/user-guide-delta.md) / [verification](../guides/verification.md); evidence commands from `lk-mindmap_v1/`.

Out of scope: tip wiki research append (HOLD); Admin PR/merge; signing.

## Ordered steps

1. **Docs fixes:** toolsets sit on the **right**; rename = library pencil / topbar title / overflow ⋯ (not right-click); Undo/Redo in board footer + Edit / shortcuts — no floating Excalidraw Undo.
2. **Attic delta:** update user-guide-delta for chrome.
3. **Evidence:** `npm run typecheck`, `npm test`, `npm run test:e2e`, `npm run build` (package optional). Record exits.
4. Manual note: clean footer (no black Undo over Theme bar).

## Verification

Automated exits 0 or disclosed. Docs open smoke still green.

## Evidence / handoff

Fill [guides/verification.md](../guides/verification.md). Parent rollup lists HOLD (PR/merge, tip wiki, gears).
