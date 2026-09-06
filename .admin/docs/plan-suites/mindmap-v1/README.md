# LYRIKAI board v1 — engineering suite

Purpose: give an implementing agent a complete path to a simple offline macOS vision board. Audience: the owner, implementation agents, and independent reviewers. This is a visual suite.

Start with [END-GOAL](END-GOAL.md), [architecture](specs/architecture.md), and [art direction](specs/art-direction.md), then follow the units in order. Read product `agents/.gears/GEARS.md` and `RULEBOOK.md` before implementation.

| Unit | Plan | Depends on |
|---|---|---|
| 01 | [Desktop shell and canvas](plans/01-desktop-canvas.md) | Approved requirements |
| 02 | [Portable documents and board library](plans/02-portable-documents.md) | 01 |
| 03 | [Toolsets and themes](plans/03-toolsets-themes.md) | 01, 02 |
| 04 | [Verification and macOS package](plans/04-verification-package.md) | 01–03 |

Hard walls: product code stays in `lk-mindmap_v1/`; board data stays in product `boards/`. Preserve imported image data inside each board file. No account, hosted backend, network-dependent editor assets, collaboration service, or automatic tree-layout engine in v1. Tool sections coexist and expand independently; themes are independent of tools. Read [art direction](specs/art-direction.md) before CSS beyond reset/layout/token stubs. Scaffold neutrality applies from unit 01; no competing palette or display font. Cite tip `lk-bloom/hive-vip-1/hive-vip-1_main/design/` and `lk-bloom/hive-vip-1/hive-vip-1_main/precision/DESIGN-DO-DONT.md`; do not duplicate their rule bodies or invent registry IDs.

Success is exactly the measurable stop line in [END-GOAL](END-GOAL.md). Commands and evidence are pending until recorded in [verification](guides/verification.md).

Planning provenance: [lk-bloom/hive-vip-1/hive-vip-1_main/factory/PLANNING-ATTIC.md](../../../../../../lk-bloom/hive-vip-1/hive-vip-1_main/factory/PLANNING-ATTIC.md); [parent attic](../README.md). This suite is planning/docs only until a later build authorization. The user separately authorized implementation in the current conversation; paper itself is not that authorization. No WORKSTREAMS SoR: board/Paper registration skipped. Paper ≠ start / CP-0 / GO. Gear-set Mode B: no wiki/catalog invented, packaged gear status HOLD; gears do not authorize build. BPS and gear emission stop after their documents are verified.
