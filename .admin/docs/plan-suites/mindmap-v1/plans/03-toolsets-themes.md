# Toolsets and themes

## Goal and stop condition

All three expandable toolsets work on one board independently of persistent themes.

## Prerequisites

Units 01 and 02; art-direction spec. Read suite README, END-GOAL, specs, and product gear RULEBOOK first.

## Walls

In scope: Renderer tool presets, managed-node metadata/actions, theme controls, and related interaction tests under lk-mindmap_v1/.

Out of scope: Global automatic layout, separate canvas engines, collaboration, and storage redesign. Do not revert concurrent edits. Scaffold CSS remains reset/layout/art-direction token stubs until unit 03; the art-direction Avoid list applies from unit 01. No tip writes.

## Ordered steps

1. Implement independent expandable Clean Studio, Sketchbook, and Pinboard sections.
2. Add crisp node/bound-arrow and deterministic child/sibling actions with selection guards.
3. Add sketch presets and image/caption/sticky workflows on the existing scene.
4. Implement theme choices/custom controls with persisted state separate from tool choices.
5. Apply final semantic colors/type/focus/motion from art direction and verify existing content survives tool/theme changes.

## Verification

Run from `lk-mindmap_v1/`: `npm run typecheck`, `npm test`, and `npm run test:e2e` exit 0; move a connected node and confirm attached arrows. Record failures rather than claiming success.

## Evidence and handoff

Record implementation paths, dependency versions, verification commands/exit codes, manual observations, evidence paths, limitations, and open issues in the verification guide or parent handoff. Current evidence: pending.

## Next dependency

Unit 04.
