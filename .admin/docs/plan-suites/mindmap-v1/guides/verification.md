# Verification and evidence

Status: RECORDED (2026-09-05, local SBT Build). Automated checks green; packaged app produced. Manual cold-offline network-off launch not fully exercised in this run (limitation disclosed).

Run from `lk-mindmap_v1/`:

| Check | Command / procedure | Expected signal | Evidence |
|---|---|---|---|
| Types | `npm run typecheck` | Exit 0 | 2026-09-05 — exit 0 |
| Storage/unit | `npm test` | Exit 0; meaningful cases below | 2026-09-05 — exit 0; **10** tests passed (`tests/storage.test.ts`), including rename + collision + image roundtrip |
| Desktop interaction | `npm run test:e2e` | Exit 0 | 2026-09-05 — exit 0; `tests/board-smoke.e2e.ts` (library chrome + Clean Studio / Sketchbook / Pinboard + canvas) against Vite `http://127.0.0.1:5210` |
| Production bundle | `npm run build` | Exit 0 | 2026-09-05 — exit 0; `dist/` + `dist-electron/` |
| macOS package | `npm run package` | App in `release/mac-arm64/LYRIKAI board.app` | 2026-09-05 — exit 0; `release/mac-arm64/LYRIKAI board.app` (unsigned, default Electron icon) |
| Cold offline | Launch package with network unavailable | Fonts, canvas, files work | Partial: app opened via `open` after package; full network-off + mixed-board manual matrix not recorded this run |

Storage scenarios covered by unit tests: image-bearing roundtrip; backup retention; external-edit conflict; serialized concurrent saves; backup/replace failure keeping primary; recovery into new file; malformed/invalid rejection; duplicate identity; **rename title+filename**.

Interaction scenarios covered by e2e smoke: library visible; three named toolsets; Add idea / plant first idea; canvas present. Not covered by automation this run: child/sibling binding move, undo/redo draw, image import caption, theme-without-tools, save/restart/open packaged path, large mixed-board responsiveness.

Preview: sticky port **5210** registered for `lk-mindmap_v1`; Vite serve HTTP 200 after CSS restore (browser bridge for Vite-only; Electron preload owns real FS).

Limitations: no signing/notarization (out of END-GOAL); Playwright smoke uses Vite+in-memory bridge, not Electron IPC (do not treat e2e alone as packaged FS GO); gears HOLD (no gear-set apply); Admin preview/merge not claimed.

Post-adversary remediations (2026-09-05 follow-up): `EXCALIDRAW_ASSET_PATH` set to relative `./` for packaged `file://` font loading; title blur rename skips no-ops, awaits in-flight rename before board switch (`guard`), and drops stale rename results after board generation change. `npm run package` re-run after remediations so `release/mac-arm64/` embeds `./` (verified in asar `index-BhJkaMvr.js`). Packaged cold-offline network-off launch matrix still recommended for Admin preview.

Independent review findings route to the parent; Watcher is not Audit.
