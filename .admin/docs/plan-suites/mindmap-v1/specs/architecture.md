# Architecture and document contract

## Stack and boundaries

Electron hosts a React/TypeScript interface with embedded Excalidraw. A preload context bridge exposes named board operations; the main process owns filesystem access. Keep Node integration off and context isolation on. Bundle fonts and editor assets locally. Pin compatible dependency versions and check installed TypeScript declarations rather than relying on stale snippets.

The product root contains versioned application code in `lk-mindmap_v1/` and shared user files in `boards/`. Resolve and remember the board directory at runtime; do not commit a machine-specific home path. A packaged application must use the configured product board directory rather than its read-only resources folder. Expose the folder visibly and provide a folder chooser/reveal action if it cannot be resolved or accessed.

## Portable boards

Use one versioned `.lkmindmap` JSON document containing format/version identification, stable board identity, title/timestamps, Excalidraw scene with embedded referenced binary files, camera scroll/zoom, and selected/custom board theme. Serialize the scene using `serializeAsJSON(elements, appState, files, "local")`. Excalidraw export omits camera state, so retain that explicitly. Reject unsupported future wrapper versions without overwriting the file. Validate malformed data before replacing the active scene.

The main process implements list/open/create/save/rename/duplicate and folder operations. Filenames are generated/sanitized within the configured board root; renderer requests must not grant arbitrary filesystem access. Rebuild the library from board documents rather than requiring a database. Duplicate creates a new identity and never overwrites the source. Handle collisions without data loss.

Serialize saves per board. Debounce autosave, associate requests with board identity and revision, write to a temporary sibling, then replace the destination; retain a prior recovery copy. Acknowledge Saved only after successful durable write handling. New edits arriving during a save remain dirty. Flush before board switches and close; on failure retain the scene and offer retry or cancel close/switch. Do not silently select a backup as if it were the latest document.

## Three toolsets, one scene

Clean Studio creates crisp labeled nodes, bound connectors, and quick child/sibling additions. Store minimal parent/role metadata on managed nodes; use deterministic nearby placement and preserve user positioning. Child/sibling commands require an appropriate selected node and do not imply automatic global layout. Use Excalidraw element helpers and binding support; do not invent connector-only coordinates that detach on movement.

Sketchbook creates rough shapes and freehand strokes. Pinboard provides image import, captions, and sticky-style notes. Use Excalidraw scene elements throughout; avoid separate canvas engines or scene copies. Tool presets affect new elements only. Theme changes update the board/chrome and future defaults without silently recoloring user-authored objects. Persist custom theme settings separately from tool selection.

## Research and tradeoffs

Excalidraw supplies image support, bound arrows, free draw, zoom/pan, and history: [official feature list](https://github.com/excalidraw/excalidraw#features). It uses [MIT licensing](https://github.com/excalidraw/excalidraw/blob/master/LICENSE); preserve notices. Current [serialization source](https://github.com/excalidraw/excalidraw/blob/master/packages/excalidraw/data/json.ts) includes files for local exports; [app-state source](https://raw.githubusercontent.com/excalidraw/excalidraw/master/packages/excalidraw/appState.ts) excludes camera state from exports. [Installation docs](https://docs.excalidraw.com/docs/@excalidraw/excalidraw/installation) explain local font hosting. [Electron context isolation](https://www.electronjs.org/docs/latest/tutorial/context-isolation) supports a narrow IPC bridge.

Alternative tldraw has strong note/custom-shape capabilities but production needs an active license key; hobby licenses are discretionary and require attribution. [Official license](https://tldraw.dev/community/license). Its [persistence](https://tldraw.dev/docs/persistence) requires intentional asset handling for portable files. A custom canvas would increase selection, text editing, history, and connector maintenance work. Recommendation: Excalidraw for v1, with application code focused on tools and reliable files. Embedded images increase JSON size; verify representative image-heavy boards before claiming performance.
