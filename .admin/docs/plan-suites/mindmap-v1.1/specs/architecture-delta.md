# Architecture delta — v1.1 polish

Baseline architecture: [mindmap-v1/specs/architecture.md](../../mindmap-v1/specs/architecture.md). This file is a **delta** only.

## Unchanged

- Electron main + preload + renderer; CSP; sandbox; contextIsolation
- `.lkmindmap` v1 document schema (`BoardDocument`, `BoardTheme` with background/grid/gridColor/spacing)
- Shared `boards/` folder + atomic save + `.bak` + conflict fingerprint
- Existing IPC: library/open/save/saveAs/duplicate/rename/recover/chooseFolder/reveal

## Delta — integrity

- `BoardStorage.save` must stamp `updatedAt` on every successful write of document content (same honesty as browser-bridge).
- Renderer keeps `activeHandle` React state aligned with `handle` ref for library selection chrome.

## Delta — rename UX

- No new IPC. Reuse `board:rename` / `storage.rename`.
- Additional entry points: overflow **Rename**, library inline/context rename. Topbar title blur remains.

## Delta — tools / themes

- Pinboard caption helper on the Excalidraw scene (text near image; no second storage format).
- Sketchbook applies current-item stroke/roughness presets via Excalidraw API.
- Theme footer exposes gridColor + spacing + named presets that only mutate `document.theme`.

## Delta — Docs

- Bundled Markdown under `lk-mindmap_v1/src/docs/` imported at build time.
- Docs panel is renderer-only state; Escape closes; no network fetch.

## Delta — module split

Preferred modules (names flexible):

```text
src/
  App.tsx                 # shell composition
  library/…               # sidebar + rename affordances
  tools/…                 # toolset shelves
  canvas/…                # Excalidraw host helpers
  docs/…                  # panel + MD sources
```

## Non-goals

Account, collab, auto-layout, signing, remote help, tip writes, gear Active.
