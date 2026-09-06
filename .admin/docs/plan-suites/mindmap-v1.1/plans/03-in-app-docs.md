# 03 — In-app Docs (offline)

## Goal and stop condition

An offline Docs panel opens from Help entry points; lanes **About**, **Explainers**, **Guides** render bundled Markdown from `lk-mindmap_v1/src/docs/`. Escape closes. No network. User-facing copy does **not** name internal skills.

## Prerequisites

Unit 01 preferred (rename docs accurate). Art-direction: Docs chrome uses existing shell tokens / scaffold neutrality.

## Walls

In scope: Docs panel UI; `src/docs/**/*.md` (or md modules); Help in topbar/overflow and/or Excalidraw Help replace/augment; Escape-to-close.

Out of scope: remote fetch, account help, tip skill names in UI, inventing a product wiki, signing docs as marketing site.

Writer templates (authoring only — do not label them in the UI):

| Lane | Template | Job |
|------|----------|-----|
| About | author-tone-1 | What it is; walls; where boards live |
| Explainers | simple-explain | Canvas, toolsets, save model |
| Guides | instruction-manual | One stuck-path at a time, numbered steps |

## Ordered steps

1. Add `src/docs/` with starter Markdown: thesis/offline/`boards/`; three toolsets + save states; first board; rename; Finder; recover; save failed.
2. Implement Docs panel component (lane tabs + article list + rendered MD). Prefer a light local markdown renderer already compatible with the stack; avoid new heavy deps if a minimal approach works.
3. Wire Help entry points: topbar overflow **Help / Docs**; optionally replace or wrap Excalidraw MainMenu Help to open the panel.
4. Escape closes panel; focus trap light-touch (do not break canvas keyboard branch shortcuts when panel closed).
5. Confirm cold offline: docs load from bundle with network unavailable (note in verification).

## Verification

Typecheck + e2e smoke that Docs opens and shows at least one About article. Manual: Escape closes; no network requests for docs content.

## Evidence / handoff

Pending until Build — list doc file paths and Help entry points.

## Next dependency

Unit 04 chrome/docs sync and package evidence.
