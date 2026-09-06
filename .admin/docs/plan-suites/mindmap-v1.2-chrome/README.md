# LYRIKAI board v1.2 chrome — engineering suite

Purpose: remediate Excalidraw footer collision with LYRIKAI board-look chrome, surface Undo/Redo in the LYRIKAI footer, and align offline Docs copy. Audience: owner, implementers, independent reviewers. This is a **visual** suite (thin delta on v1.1).

**Baseline:** cite [mindmap-v1.1](../mindmap-v1.1/README.md) and [mindmap-v1](../mindmap-v1/README.md). Do **not** rewrite those suites.

Start with [END-GOAL](END-GOAL.md), [architecture-delta](specs/architecture-delta.md), and [art-direction](specs/art-direction.md), then follow units in order. Gears HOLD — cite only; no gear-set apply unless conductor asks.

| Unit | Plan | Depends on |
|---|---|---|
| 01 | [Footer collision](plans/01-footer-collision.md) | Conductor build GO; baseline v1.1 |
| 02 | [Undo/Redo chrome](plans/02-undo-redo-chrome.md) | 01 |
| 03 | [Docs + verify](plans/03-docs-verify.md) | 01–02 |

Hard walls: product code only under `lk-mindmap_v1/`; board data in product `boards/`. No account, collab, auto-layout, signing/notarization, remote help, tip writes, shell↔Excalidraw dark theme sync. Leave Excalidraw **top** toolbar dimmed as today — do not hide it in this suite. Art direction: [specs/art-direction.md](specs/art-direction.md) + tip `lk-bloom/hive-vip-1/hive-vip-1_main/design/` and `precision/DESIGN-DO-DONT.md` (cite; do not fork). Scaffold neutrality: reuse existing shell tokens for Undo/Redo buttons.

Success is exactly the measurable stop line in [END-GOAL](END-GOAL.md). Commands and evidence stay pending until recorded in [verification](guides/verification.md).

Planning provenance: tip `lk-bloom/hive-vip-1/hive-vip-1_main/factory/PLANNING-ATTIC.md`; [parent attic](../README.md). No WORKSTREAMS SoR on this product — board / Paper-register **skipped**. Gears HOLD.
