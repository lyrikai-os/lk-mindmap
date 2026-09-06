# LYRIKAI board v1.1 polish — engineering suite

Purpose: give an implementing agent a complete path to integrity, rename UX, tool/theme depth, offline Docs, and chrome/verify polish on the shipped v1 app. Audience: owner, implementers, independent reviewers. This is a **visual** suite (delta on an existing UI).

**Baseline:** cite [mindmap-v1](../mindmap-v1/README.md) as the v1 ship record. Do **not** rewrite that suite as the upgrade source of record.

Start with [END-GOAL](END-GOAL.md), [architecture-delta](specs/architecture-delta.md), and [art-direction](specs/art-direction.md), then follow units in order. Read product `agents/.gears/GEARS.md` and `RULEBOOK.md` (HOLD — cite only; no gear-set apply unless conductor asks).

| Unit | Plan | Depends on |
|---|---|---|
| 01 | [Integrity + first-class rename](plans/01-integrity-rename.md) | Approved polish GO; baseline v1 |
| 02 | [Toolsets + themes depth](plans/02-toolsets-themes-depth.md) | 01 |
| 03 | [In-app Docs](plans/03-in-app-docs.md) | 01 (02 preferred) |
| 04 | [Chrome + verify + package](plans/04-chrome-verify-package.md) | 01–03 |

Hard walls: product code only under `lk-mindmap_v1/`; board data in product `boards/`. No account, collab, auto-layout, signing/notarization, remote help, or tip writes. Themes must not recolor authored objects. Docs panel is offline-only (bundled Markdown). Art direction: [specs/art-direction.md](specs/art-direction.md) + tip `lk-bloom/hive-vip-1/hive-vip-1_main/design/` and `lk-bloom/hive-vip-1/hive-vip-1_main/precision/DESIGN-DO-DONT.md` (cite; do not fork). Scaffold neutrality: reuse existing shell tokens; do not invent a competing palette or display face for Docs/chrome polish.

Success is exactly the measurable stop line in [END-GOAL](END-GOAL.md). Commands and evidence stay pending until recorded in [verification](guides/verification.md).

Planning provenance: tip `lk-bloom/hive-vip-1/hive-vip-1_main/factory/PLANNING-ATTIC.md`; [parent attic](../README.md). This suite is planning/docs only until a later build authorization. **Paper ≠ start / CP-0 / GO.** No WORKSTREAMS SoR on this product — board / Paper-register **skipped**. Gears HOLD — no Mode A wiki invent; gear-set not required for this polish unless separately asked.
