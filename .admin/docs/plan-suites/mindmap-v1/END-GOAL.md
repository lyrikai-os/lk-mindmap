# END-GOAL — LYRIKAI board v1

The owner can launch the packaged macOS application and create, reopen, rename, and duplicate personal boards from the shared application `boards/` folder.

- One canvas supports zoom/pan, crisp mind-map nodes and bound connectors, notes, imported images, and freehand drawing with undo/redo.
- Three expandable tool sections—Clean Studio, Sketchbook, Pinboard—work on the same board. Switching tools does not rewrite existing objects.
- Board themes and custom theme controls work independently of tool sections and persist when reopened. Product theme is visibly applied, with no stock Vite chrome or art-direction Avoid clichés.
- Self-contained `.lkmindmap` documents embed image data, retain scene/camera/theme state, and open after copying without the original image files.
- Autosave and explicit Save show truthful states; failures retain edits and a recoverable prior save. Rapid edits, board switching, and close do not silently lose acknowledged changes.
- Editor fonts/assets work on cold offline launch. No account or remote service is required.
- Type checking, meaningful storage tests, interaction smoke tests, production build, and macOS packaging have recorded outcomes. Manual desktop launch and core editing are evidenced; limitations are disclosed.

Stop at a usable local demo plus documentation and evidence. Signing, notarization, store distribution, multiplayer, and automatic layout are outside this stop line.
