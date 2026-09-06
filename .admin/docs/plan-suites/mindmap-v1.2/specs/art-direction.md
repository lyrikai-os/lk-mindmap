# Art direction — v1.2 motion delta

Baseline: [mindmap-v1.1/specs/art-direction.md](../../mindmap-v1.1/specs/art-direction.md) and [mindmap-v1/specs/art-direction.md](../../mindmap-v1/specs/art-direction.md). This is a **motion delta**, not a redesign.

## Thesis (unchanged)

The board is the application. Ideas get the largest surface; library, Docs, and modals are compact support chrome that may move — the canvas does not get theatrical GSAP.

## Motion budget

- Utility shell motion ≤~200ms; Flip may run slightly longer only when needed for readable continuity.
- Ease: calm standard GSAP eases (power2.out / similar) — no bounce carnival on chrome.
- `prefers-reduced-motion: reduce` → instant final state; no SplitText stagger; no Flip tween.
- CSS `--motion` and GSAP must not fight; prefer one owner per surface.

## Surfaces

- Library sidebar, Docs scrim/panel, error modal, empty-state eyebrow/copy — OK.
- Excalidraw scene, pan/zoom, authored strokes — **not** motion targets.

## Type / brand

Keep macOS system sans for utility chrome; Excalidraw fonts for authored content. Docs headings may use weight/tracking already present — **do not** introduce a decorative hero display face for motion reveals.

## Avoid (Precision applications — cite, do not fork)

Purple-on-white / purple-indigo glow; Inter/Roboto/Arial as hero display; cream+terracotta or cream+serif broadsheet; glass-card stacks and badge clutter; theme changes that erase user styling; unlabeled primary icons; glow trails on Flip.

Normative cites: tip `design/README.md`, `design/GUIDE.md`, `precision/DESIGN-DO-DONT.md`. Scaffold neutrality: motion extends existing tokens only.
