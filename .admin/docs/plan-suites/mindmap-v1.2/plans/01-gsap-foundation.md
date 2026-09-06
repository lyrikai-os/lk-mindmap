# 01 — GSAP foundation

## Goal and stop condition

Add `gsap` + `@gsap/react`; register Flip + SplitText; shared `motion` helper (reduced-motion gate, default durations/eases ≤~200ms); wire one smoke tween on a non-canvas chrome node. Deps installed; helper tested or documented; no canvas hooks.

## Prerequisites

- Branch `v1.2` from `v1.1`; baseline suites `mindmap-v1` / `mindmap-v1.1`.
- Conductor build GO for `mindmap-v1.2` (Paper alone is not GO — this unit runs under SBT GO FULL).
- Read suite README, END-GOAL, architecture-delta, art-direction; gears HOLD.

## Walls

In scope: `lk-mindmap_v1/package.json`, new `lk-mindmap_v1/src/motion/` helper, one chrome smoke target.

Out of scope: Excalidraw internals; OUT plugins (ScrollTrigger, ScrollSmoother, Draggable, MorphSVG/DrawSVG, Inertia, ScrambleText); tip writes; gear Active.

## Ordered steps

1. Install `gsap` and `@gsap/react` (compatible React 18 versions).
2. Create `src/motion/` helper: register Flip + SplitText; export `prefersReducedMotion()`, default duration/ease constants, optional `safeTween` / context helpers.
3. Smoke: one non-canvas chrome node (e.g. empty-state eyebrow or library local-note) via `useGSAP` to prove registration + cleanup.
4. Bump package version toward `1.2.0` if not already done in a later unit.

## Verification

From `lk-mindmap_v1/`: `npm run typecheck` exit 0. Confirm no imports from Excalidraw for GSAP.

## Evidence / handoff

Record deps + helper path in `guides/verification.md`.

## Next dependency

Unlocks unit 02 (shell tweens).
