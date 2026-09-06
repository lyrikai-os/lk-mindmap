# 02 — Undo/Redo chrome

## Goal and stop condition

Undo and Redo appear as first-class buttons on the **left** of LYRIKAI `.canvas-settings`, sharing Theme/zoom shell tokens. History matches Edit menu / keyboard shortcuts.

## Prerequisites

Unit 01 footer hide landed (no dual Undo UI).

## Walls

In scope: `lk-mindmap_v1/src/App.tsx` (+ minimal CSS if separator needed). Wire via Excalidraw imperative API history if available; else verified synthetic ⌘Z / ⇧⌘Z (Ctrl equivalents) path into Excalidraw’s action manager.

Out of scope: custom history stack; recoloring authored objects; top toolbar redesign.

## Ordered steps

1. Add Undo / Redo controls at the start of `.canvas-settings` (icons + `title` / `aria-label`).
2. Wire clicks to Excalidraw history (prefer API; fallback keyboard synthesis into Excalidraw handlers).
3. Confirm Edit menu undo/redo and shortcuts still work after footer hide.
4. Pressure: empty stack no-op; after draw → Undo removes → Redo restores; no regression on save dirty flag beyond normal Excalidraw onChange.

## Verification

Manual history round-trip + keyboard parity. Buttons visually match zoom buttons in the same bar.

## Evidence / handoff

Note approach used (API vs synthetic) in verification. Hand to unit 03.
