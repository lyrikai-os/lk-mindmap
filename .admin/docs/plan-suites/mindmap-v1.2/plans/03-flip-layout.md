# 03 — Flip layout

## Goal and stop condition

Flip state for sidebar open/close and Docs mount layout so continuity is visible without fighting Excalidraw. Excalidraw remains untouched by Flip selectors.

## Prerequisites

- Units 01–02 (foundation + shell tweens).

## Walls

In scope: Flip on library / Docs shell nodes only.

Out of scope: Flip on `.excalidraw` / canvas elements; OUT plugins.

## Ordered steps

1. On library hide→show (and reverse where mounted): `Flip.getState` → layout change → `Flip.from` with short duration.
2. On Docs open: Flip panel/scrim mount so panel does not hard-pop.
3. Scope Flip targets tightly (data attributes / refs) — never Excalidraw DOM.
4. Reduced-motion: skip Flip animation; apply final layout immediately.

## Verification

Manual continuity on library toggle + Docs open; typecheck still green; no GSAP selectors under Excalidraw.

## Evidence / handoff

Note Flip targets and durations in verification.

## Next dependency

Unlocks unit 04 (SplitText + verify).
