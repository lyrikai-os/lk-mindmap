# Using LYRIKAI board

This guide describes the intended v1 workflow; implementation verification is pending.

1. Launch `lk-mindmap_v1/release/mac-arm64/LYRIKAI board.app`, or run `npm run dev` from `lk-mindmap_v1/` during development.
2. Create or open a board from the board library. The shared `boards/` folder holds your `.lkmindmap` files; use the folder action to find them.
3. Expand Clean Studio for crisp nodes/connectors and child/sibling additions, Sketchbook for free drawing, or Pinboard for images/captions/notes. All three use the same board.
4. Pan and zoom using canvas controls and trackpad/mouse gestures; select, move, resize, and undo/redo using editor controls.
5. Choose a board theme or customize it independently of your toolset. Existing ideas remain in place.
6. Watch the save indicator. Autosave persists changes; explicit Save flushes them. A save error means edits are still pending—retry or cancel closing.
7. Copy a `.lkmindmap` file to back it up or move it. Images are embedded; source image folders are not required to reopen it. Preserve any recovery copy until you know the current file opens correctly.

No cloud account or internet connection is needed once the application is installed. The first package targets this Mac; public distribution/signing is outside v1.
