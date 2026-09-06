# 02 — Toolsets + themes depth

## Goal and stop condition

Pinboard offers an image **caption** path; Sketchbook offers a stroke/roughness **preset**; theme UI exposes `gridColor` and `spacing` plus 2–3 **named presets**. Tool/theme switches do not recolor authored objects.

## Prerequisites

Depends on unit 01. Unit 03 may proceed after 01 with unit 02 preferred in parallel. Art-direction delta + v1 theme contract (`BoardTheme` already has `gridColor` / `spacing`).

## Walls

In scope: renderer toolset UI + theme footer controls under `lk-mindmap_v1/src/`; optional small helpers; interaction smoke if cheap.

Out of scope: auto-layout, second canvas engine, theme modes that hide toolsets, recoloring existing elements on theme change, remote assets.

## Ordered steps

1. **Pinboard caption:** after image import (or on selected image), affordance to add/edit a caption text element associated with the image (Excalidraw text near/bound or labeled sticky). Keep PNG/JPEG/WebP walls.
2. **Sketchbook stroke preset:** one control that sets Excalidraw current-item stroke width + roughness (and optionally stroke style) for subsequent draw tools — does not rewrite existing strokes unless user applies via Excalidraw selection tools.
3. **Theme depth:** color input for `gridColor`; numeric or stepped control for `spacing` (respect storage validation 4–200); persist via existing `edit` + save path.
4. **Named presets (2–3):** e.g. Paper, Graphite, Night board — apply background/grid/gridColor/spacing only; never mutate `scene.elements` colors.
5. Confirm switching Clean Studio / Sketchbook / Pinboard does not rewrite unrelated objects.

## Verification

`npm run typecheck`, `npm test`, `npm run test:e2e` (update smoke if new chrome labels appear). Manual: import image → caption; freehand with preset; change grid color/spacing; apply named preset; authored fills/strokes unchanged.

## Evidence / handoff

Pending until Build — note preset names and any Excalidraw API quirks.

## Next dependency

Unit 03 (Docs explainers can cite these controls); unit 04 packages the result.
