# END-GOAL — LYRIKAI board v1.2 shell GSAP motion

**v1.2** packaged / `npm run dev` board shows intentional shell motion via GSAP:

- Library show/hide, Docs open/close, and save/error modal enter-exit use Core timelines under `useGSAP` + context cleanup.
- Library collapse ↔ open and Docs open use **Flip** so layout continuity is visible without fighting the canvas.
- Docs panel titles (and short intro lines) use **SplitText** reveals when Docs opens; reduced-motion skips split/stagger and snaps to final state.
- No GSAP on Excalidraw canvas internals; typecheck / unit / e2e smoke / build / package still pass or limitations disclosed.
- Motion stays inside existing shell tokens and prior art-direction Avoid list (no purple glow, no new hero display face, ≤~200ms utility motion unless Flip needs slightly longer).
- Product/version messaging in docs delta names **v1.2** (not a one-off “gsap experiment” label). App package version toward **1.2.0**.

Stop when the motion above is demonstrable in the packaged or `npm run dev` app plus docs/evidence. Outside this stop: ScrollTrigger/ScrollSmoother/Draggable/MorphSVG/DrawSVG/Inertia/ScrambleText; Excalidraw scene/pan-zoom/stroke animation; signing, notarization, collab, auto-layout, remote help, tip writes, gear Active flip, account systems.
