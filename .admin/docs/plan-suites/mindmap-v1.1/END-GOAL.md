# END-GOAL — LYRIKAI board v1.1 polish

The owner can rename a board from the library and the overflow menu (not only the topbar title), see honest library dates after saves, and open an offline in-app Docs panel that teaches About, Explainers, and Guides without leaving the app or needing a network.

- Pinboard supports an image caption path; Sketchbook offers a stroke/roughness preset; theme UI exposes gridColor and spacing plus 2–3 named presets. Switching tools or themes does not recolor authored objects.
- Dual Excalidraw chrome is tamed enough that the board remains the primary surface; App.tsx is lightly split into library/tools/canvas/docs modules without behavior regressions.
- Typecheck, storage tests, e2e smoke, production build, and macOS package still pass or are recorded with disclosed limitations. Verification notes cold-offline / network-off package launch.
- Product theme and Docs chrome stay inside existing shell tokens and v1 art direction (delta only). No stock Vite chrome, no art-direction Avoid clichés.

Stop when the polish above is demonstrable in the packaged or `npm run dev` app plus docs/evidence. Outside this stop: signing, notarization, collab, auto-layout, remote help, tip writes, gear Active flip, account systems.
