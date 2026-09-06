# 02 — Shell tweens

## Goal and stop condition

Timeline enter/exit for `LibrarySidebar`, `DocsPanel`, modal scrim/dialog, and empty-state eyebrow if cheap. CSS `--motion` opacity fades replaced or co-owned by GSAP on those surfaces; revert on unmount.

## Prerequisites

- Unit 01 foundation green (deps + motion helper).

## Walls

In scope: `LibrarySidebar.tsx`, `DocsPanel.tsx`, `App.tsx` error modal / empty-canvas chrome, `style.css` coexistence only.

Out of scope: Excalidraw scene, pan/zoom, authored strokes; OUT plugins; competing palette / purple glow / new hero display face.

## Ordered steps

1. Library show/hide: `useGSAP` timeline (opacity/x or width-adjacent) with context cleanup; keep hide/show UX.
2. Docs open/close: scrim + panel enter/exit under `useGSAP`; Escape still closes.
3. Error modal: scrim + dialog enter; exit animation before clear if practical.
4. Empty-state chrome: cheap opacity/y reveal on mount when board empty.
5. Ensure `prefers-reduced-motion` snaps to final state (no stagger).

## Verification

`npm run typecheck`; manual: toggle library, Docs, force an error modal — motion visible; reduced-motion OS setting snaps.

## Evidence / handoff

Paths + any CSS conflict notes in verification guide.

## Next dependency

Unlocks unit 03 (Flip).
