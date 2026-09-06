# CO-LAND — v1.2 dual-assess synthesis

**Status:** PASS-WITH-NOTES (dual `/assess`, 2026-09-06)  
**Conductor GO:** attic log + dedicated `origin/v1.2` + fast-forward `main` + official `npm run package`  
**Suites:** `mindmap-v1.2` (GSAP) + `mindmap-v1.2-chrome` (footer / Undo-Redo)

## Verdict

Dual-assess briefs were complementary, not conflicting. Combined tip carries chrome + GSAP; full v1.1 polish is inside v1.2. Dedicated version lines stay on GitHub; `main` advances to v1.2 after this ship; official unsigned app is rebuilt from that tip.

## Conductor locks

| # | Lock | Outcome |
|---|------|---------|
| 1 | Chrome session was supposed to stay on `v1.1` but landed on `v1.2` | **Accept** — chrome intentions met; no rewind |
| 2 | GSAP was supposed to be `v1.2` | **Correct** |
| 3 | Full v1.1 (incl. updates) integrated into v1.2 | **Verified** — `f108fc3` ⊂ `ef7e83b` (`git merge-base --is-ancestor`) |
| 4 | Dedicated commits/branches | **`v1.1`** tip = polish only; **`v1.2`** tip = post-v1.1 product (chrome + GSAP + this attic log) |
| 5 | After this ship, **v1.2 → main** | Fast-forward only; do not move `origin/v1` freeze |
| 6 | Official app path after package | See below |

## Tip SHAs (pre-attic baseline)

| Ref | SHA | Role |
|-----|-----|------|
| `origin/v1.1` / local `v1.1` | `f108fc3` | Dedicated v1.1 — **do not move** |
| Combined tip (chrome + GSAP) | `ef7e83b` | Pre-attic `v1.2` / `v1.2-chrome` |
| `origin/main`, `origin/v1` | `ab21187` | v1 freeze; later FF **main only** to v1.2 tip |
| This CO-LAND commit | (tip after attic) | Docs-only on local `v1.2` |

## Suites

- **mindmap-v1.2** — shell GSAP (Core + useGSAP, Flip, SplitText); reduced-motion paths; canvas wall (no GSAP on Excalidraw internals).
- **mindmap-v1.2-chrome** — hide Excalidraw footer; Undo/Redo in LYRIKAI chrome; Docs parity.

Verification guides point here instead of vague co-dirt notes.

## HOLD

- **Signing / notarization:** HOLD — unsigned `.app` OK.
- **Gears:** HOLD.

## Official app path

After `main` = v1.2 tip and `npm run package` from `lk-mindmap_v1/`:

`lk-mindmap_v1/release/mac-arm64/LYRIKAI board.app`

Executable:

`lk-mindmap_v1/release/mac-arm64/LYRIKAI board.app/Contents/MacOS/LYRIKAI board`
