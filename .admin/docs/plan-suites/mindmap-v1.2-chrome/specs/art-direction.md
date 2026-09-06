# Art direction — v1.2 chrome (delta)

Cite tip design pack + [mindmap-v1.1/specs/art-direction.md](../../mindmap-v1.1/specs/art-direction.md). Scaffold neutrality: **reuse** existing shell tokens; do not invent a new palette or display face.

## Intent

One quiet bottom island. Undo/Redo should read as siblings of zoom buttons — same height, radius, hover — not a second floating “chip” language (no black orphan island).

## Do

- Place Undo/Redo at the **left** of `.canvas-settings`, then theme / grid / zoom.
- Match `.canvas-settings button` sizing (28×28, `var(--radius-sm)`).
- Keep board as the primary surface; chrome stays secondary.

## Don’t

- Reintroduce a competing Excalidraw footer island.
- Purple-glow / pill-stat / cream-serif clichés.
- Dark-mode-only treatment for the new buttons.

## Motions

No new motion required beyond existing hover on settings buttons. Optional: none this suite.
