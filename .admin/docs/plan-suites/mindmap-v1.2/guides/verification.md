# Verification — mindmap-v1.2 shell GSAP

Status: **RECORDED** (2026-09-06, Orchestrator / Trinity Build).

Run from `lk-mindmap_v1/`:

| Check | Command / procedure | Expected signal | Evidence |
|---|---|---|---|
| Types | `npm run typecheck` | Exit 0 | 2026-09-06 — exit 0 |
| Storage/unit | `npm test` | Exit 0 | 2026-09-06 — exit 0; **11** tests passed |
| Desktop interaction | `npm run test:e2e` | Exit 0; Docs/library smoke still pass | 2026-09-06 — exit 0; 2/2 Playwright (library+canvas; Docs Help) |
| Production bundle | `npm run build` | Exit 0 | 2026-09-06 — exit 0; `dist/` + typecheck |
| macOS package | `npm run package` | App under `release/` or limitation disclosed | Not run this cycle — disclose; build green |
| Reduced motion | OS reduce-motion on | No stagger/Flip tween; final states snap | Code path: `prefersReducedMotion()` + `motionVars`/`flipVars` duration 0; manual OS matrix pending Admin preview |
| Canvas wall | Inspect selectors | No GSAP on Excalidraw internals | Confirmed — GSAP only shell refs; no ScrollTrigger/etc imports |

Manual (code-complete): library collapse Flip via `data-flip-id="library"`; Docs Flip+SplitText; modal enter/exit; empty-canvas chrome stagger.

**Carried dirt note:** concurrent `mindmap-v1.2-chrome` Undo/Redo footer + Excalidraw footer hide CSS/docs copy also present in working tree — outside pure GSAP END-GOAL; disclosed for Admin/Adversary.

Limitations: unsigned package not rebuilt this run; Playwright uses Vite+browser bridge; gears HOLD; Admin preview/merge not claimed.

Preview: sticky Vite port if reused (v1.1 used **5210**). Package version **1.2.0**.
