# LYRIKAI board

A personal, offline idea board for macOS: mind maps, notes, image collections, and drawing on the same zoomable canvas.

The application lives in `lk-mindmap_v1/`. Board documents live in the shared `boards/` folder. See the [v1 user guide](.admin/docs/plan-suites/mindmap-v1/guides/user-guide.md), [v1.1 polish delta](.admin/docs/plan-suites/mindmap-v1.1/guides/user-guide-delta.md), and engineering suites under `.admin/docs/plan-suites/`.

From `lk-mindmap_v1/`: `npm install`, `npm run dev` (Electron), or Vite on the sticky preview port for browser smoke; `npm run typecheck`, `npm test`, `npm run test:e2e`, `npm run build`, `npm run package`. Package target: `release/mac-arm64/LYRIKAI board.app` (unsigned).

v1.1 polish: honest save dates, library/overflow rename, Pinboard caption, Sketchbook stroke preset, theme presets + grid controls, offline Docs panel, lighter chrome.
