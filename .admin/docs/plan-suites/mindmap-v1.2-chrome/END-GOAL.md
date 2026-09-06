# END-GOAL — LYRIKAI board v1.2 chrome

The owner sees **one** coherent bottom board-look bar: Undo / Redo plus Theme / grid / zoom — with **no** floating black Excalidraw Undo orphan over the LYRIKAI chrome.

- Excalidraw `.layer-ui__wrapper__footer` is hidden; `.canvas-settings` is the sole bottom-right island.
- Undo and Redo in LYRIKAI footer drive Excalidraw history the same way as Edit menu / ⌘Z / ⇧⌘Z (or Ctrl equivalents).
- Offline Docs match UI: toolsets on the **right**; rename via pencil / title / ⋯ (not right-click); Undo/Redo live in the board footer (+ Edit / shortcuts).
- Typecheck, storage tests, e2e smoke, and production build pass or are recorded with disclosed limitations. Package optional if time-boxed; disclose if skipped.
- Product theme and chrome stay inside existing shell tokens (delta only). No competing palette, no art-direction Avoid clichés.

Stop when the chrome above is demonstrable in `npm run dev` (sticky **5210**) or packaged app plus docs/evidence. Outside this stop: signing, notarization, collab, auto-layout, remote help, tip writes, gear Active flip, Admin PR/merge, wiki research paragraph (HOLD).
