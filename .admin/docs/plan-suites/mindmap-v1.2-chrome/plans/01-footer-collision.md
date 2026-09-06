# 01 — Footer collision

## Goal and stop condition

Excalidraw’s bottom footer chrome is no longer visible and no longer overlaps LYRIKAI `.canvas-settings`. Theme / grid / zoom controls are fully usable without a black Undo chip stacked on top.

## Prerequisites

Conductor build GO for `mindmap-v1.2-chrome`. Baseline: v1.1 polish landed under `lk-mindmap_v1/`.

## Walls

In scope: CSS (preferred) or UIOptions equivalent to hide `.layer-ui__wrapper__footer` in `lk-mindmap_v1/src/style.css`. Keep top Excalidraw toolbar dimmed as today.

Out of scope: hiding the top toolbar entirely; shell↔Excalidraw theme sync; tip writes; Undo button placement (unit 02).

## Ordered steps

1. Confirm collision: Excalidraw footer island shares the bottom band with `.canvas-footer` / `.canvas-settings` (`bottom: 12px; z-index: 5`).
2. Change `.board-surface .excalidraw .layer-ui__wrapper__footer` from opacity dimming to `display: none` (or equivalent that removes layout + hit targets).
3. Smoke: board-look bar alone at bottom-right; no orphan Undo chip.

## Verification

Manual: empty and non-empty board; light and dark shell. No Excalidraw footer visible; Theme… / Dots / Gap / zoom still work.

## Evidence / handoff

Screenshot or verification note in [guides/verification.md](../guides/verification.md). Hand to unit 02.
