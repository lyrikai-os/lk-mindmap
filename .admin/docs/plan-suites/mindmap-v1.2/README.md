# LYRIKAI board v1.2 — shell GSAP motion suite

Purpose: give an implementing agent a complete path to shell-chrome GSAP motion (Core + `@gsap/react` `useGSAP`, Flip, SplitText) on the shipped v1.1 app. Audience: owner, implementers, independent reviewers. This is a **visual** suite (motion delta on existing UI).

**Baseline:** cite [mindmap-v1](../mindmap-v1/README.md) and [mindmap-v1.1](../mindmap-v1.1/README.md). Do **not** rewrite those suites as the upgrade source of record.

Start with [END-GOAL](END-GOAL.md), [architecture-delta](specs/architecture-delta.md), and [art-direction](specs/art-direction.md), then follow units in order. Read product `agents/.gears/GEARS.md` and `RULEBOOK.md` (HOLD — cite only; no gear-set apply unless conductor asks).

| Unit | Plan | Depends on |
|---|---|---|
| 01 | [GSAP foundation](plans/01-gsap-foundation.md) | Conductor build GO; baseline v1.1; branch `v1.2` |
| 02 | [Shell tweens](plans/02-shell-tweens.md) | 01 |
| 03 | [Flip layout](plans/03-flip-layout.md) | 01–02 |
| 04 | [SplitText + Docs verify](plans/04-splittext-docs-verify.md) | 01–03 |

Hard walls: product code only under `lk-mindmap_v1/`; board data in product `boards/`. **Shell chrome only** — LibrarySidebar, DocsPanel, error modal, empty-state chrome if cheap. **Not** Excalidraw scene graph, pan/zoom, or authored strokes. Out-of-scope plugins: ScrollTrigger, ScrollSmoother, Draggable, MorphSVG/DrawSVG, Inertia, ScrambleText. No account, collab, auto-layout, signing/notarization, remote help, or tip writes. Art direction: [specs/art-direction.md](specs/art-direction.md) + tip `lk-bloom/hive-vip-1/hive-vip-1_main/design/` and `precision/DESIGN-DO-DONT.md` (cite; do not fork). Scaffold neutrality: reuse existing shell tokens; do not invent a competing palette or hero display face for motion.

Success is exactly the measurable stop line in [END-GOAL](END-GOAL.md). Commands and evidence stay pending until recorded in [verification](guides/verification.md).

Planning provenance: tip `lk-bloom/hive-vip-1/hive-vip-1_main/factory/PLANNING-ATTIC.md`; [parent attic](../README.md). No WORKSTREAMS SoR on this product — board / Paper-register **skipped**. Gears HOLD — no Mode A wiki invent; gear-set not required unless separately asked. Cite: [GSAP v3 docs](https://gsap.com/docs/v3/).
