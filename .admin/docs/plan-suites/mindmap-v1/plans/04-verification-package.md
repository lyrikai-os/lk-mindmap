# Verification and macOS package

## Goal and stop condition

A local macOS app package and honest verification record demonstrate END-GOAL.

## Prerequisites

Units 01–03. Read suite README, END-GOAL, specs, and product gear RULEBOOK first.

## Walls

In scope: Packaging configuration/tests in lk-mindmap_v1/ and suite verification/user guides.

Out of scope: Signing, notarization, distribution, unrelated repo changes, or inferred merge authority. Do not revert concurrent edits. Scaffold CSS remains reset/layout/art-direction token stubs until unit 03; the art-direction Avoid list applies from unit 01. No tip writes.

## Ordered steps

1. Run the complete declared check set and repair relevant failures.
2. Package release/mac-arm64/LYRIKAI board.app and launch the packaged binary.
3. Exercise offline mixed-content board creation, save, restart, and portable reopen.
4. Inspect keyboard access, narrow desktop layout, light/dark themes, and failure states.
5. Record actual outcomes/limitations and update the user guide to match shipped controls.

## Verification

Run from `lk-mindmap_v1/`: `npm run typecheck`, `npm test`, `npm run test:e2e`, `npm run build`, and `npm run package` exit 0; manual packaged workflow evidenced. Record failures rather than claiming success.

## Evidence and handoff

Record implementation paths, dependency versions, verification commands/exit codes, manual observations, evidence paths, limitations, and open issues in the verification guide or parent handoff. Current evidence: pending.

## Next dependency

END-GOAL review and parent handoff; no automatic closeout or publishing.
