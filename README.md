# LYRIKAI board

A personal, offline idea board for macOS: mind maps, notes, image collections, and drawing on the same zoomable canvas.

The first application lives in `lk-mindmap_v1/`. Board documents live in the shared `boards/` folder, outside versioned application code. See the [user guide](.admin/docs/plan-suites/mindmap-v1/guides/user-guide.md) and [engineering plan](.admin/docs/plan-suites/mindmap-v1/README.md).

From `lk-mindmap_v1/`, the planned commands are `npm install`, `npm run dev`, `npm run typecheck`, `npm test`, `npm run test:e2e`, `npm run build`, and `npm run package`. The package target is `release/mac-arm64/LYRIKAI board.app` relative to that application directory. Implementation and verification evidence are pending; this document does not claim those commands have passed.
