# Architecture delta — v1.2 chrome

Baseline architecture: [mindmap-v1/specs/architecture.md](../../mindmap-v1/specs/architecture.md) + [mindmap-v1.1/specs/architecture-delta.md](../../mindmap-v1.1/specs/architecture-delta.md). This file is a **delta** only.

## Unchanged

- Electron main + preload + renderer; CSP; sandbox; contextIsolation
- `.lkmindmap` v1 document schema and theme fields
- Shared `boards/` folder + atomic save + recovery
- Floating toolsets (right), library sidebar, Docs panel, theme presets

## Delta — dual chrome

- Excalidraw **bottom** footer (`.layer-ui__wrapper__footer`) is **hidden** so it cannot collide with LYRIKAI `.canvas-settings`.
- Excalidraw **top** toolbar remains dimmed/scaled as in v1.1 (no further change this suite).
- LYRIKAI `.canvas-settings` gains Undo / Redo controls that invoke Excalidraw’s history path (imperative API if present; otherwise synthetic modifier+Z keydown that Excalidraw’s action manager already handles).
- No second zoom strip; LYRIKAI zoom / fit remain the only zoom chrome in the bottom band.

## Non-goals

Account, collab, auto-layout, signing, remote help, tip writes, gear Active, shell↔Excalidraw dark theme sync, hiding the top Excalidraw toolbar.
