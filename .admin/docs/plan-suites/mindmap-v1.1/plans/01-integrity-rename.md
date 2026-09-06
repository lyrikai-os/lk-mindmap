# 01 — Integrity dates + first-class rename

## Goal and stop condition

Electron saves bump `updatedAt` so library dates stay honest; library selection uses React state so the selected row highlights correctly; Rename is available from library and overflow menu (reuse `window.board.rename` / `storage.rename`). Topbar title rename remains.

## Prerequisites

- Baseline suite `mindmap-v1/` shipped; freeze commit on GitHub.
- Conductor build GO for `mindmap-v1.1` (Paper alone is not GO).
- Read suite README, END-GOAL, architecture-delta, art-direction, gear RULEBOOK (HOLD).

## Walls

In scope: `lk-mindmap_v1/electron/storage.ts` save path; `lk-mindmap_v1/src/` library selection + rename UX; tests covering updatedAt + rename.

Out of scope: collab, account, auto-layout, signing, remote help, tip writes, gear Active flip. Do not invent a second rename IPC. Avoid list from art-direction remains in force.

## Ordered steps

1. In Electron `storage.save` and sibling writes that persist document content without rename (`saveAt` early-create path / Save As destination write), set `updatedAt` to a fresh ISO timestamp on the document that is written (mirror browser-bridge behavior). Keep `createdAt` stable.
2. Add React state for the active library handle (do not rely on `handle.current` alone for `selected` class). Keep ref + state in sync on open/new/save/rename.
3. Overflow menu: add **Rename** that focuses an inline rename path (prompt or inline field) for the current board and calls existing `window.board.rename` after flush, same guards as topbar blur.
4. Library: per-row rename affordance (context/overflow or inline edit) that renames that board via the same API; refresh library; if renamed board is open, merge title/updatedAt into current doc.
5. Extend unit tests: save bumps `updatedAt`; rename from API still passes; no collision overwrite.

## Verification

From `lk-mindmap_v1/`: `npm run typecheck`, `npm test` exit 0. Manual: save a board → library date changes; select board → row highlights; Rename from menu and library succeeds without losing scene.

## Evidence / handoff

Record paths touched, test exits, and any limitations in `guides/verification.md` (or parent handoff). Fields pending until Build.

## Next dependency

Unlocks unit 02 (tool/theme depth) and unit 03 (Docs can document rename).
