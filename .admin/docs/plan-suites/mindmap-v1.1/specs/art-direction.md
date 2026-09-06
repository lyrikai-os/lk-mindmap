# Art direction — v1.1 delta

Baseline: [mindmap-v1/specs/art-direction.md](../../mindmap-v1/specs/art-direction.md). This polish is a **delta**, not a redesign.

## Thesis (unchanged)

The board is the application. Ideas get the largest surface; library, tool shelves, and Docs are compact support chrome.

## Polish surface

- **Docs panel:** slide-over or modal-adjacent panel using existing shell tokens (`--surface`, `--text`, `--muted`, `--border`, `--accent`). No glass-card stacks, no badge clutter, no purple glow.
- **Theme presets:** named choices that change board atmosphere (bg/grid/spacing) without marketing “modes” that hide toolsets.
- **Toolbar tame:** reduce competing Excalidraw chrome so LYRIKAI floating toolsets remain the readable primary controls.

## Type / motion

Keep macOS system sans for utility chrome; Excalidraw fonts for authored content. Transitions ≤150ms; respect reduced motion. Docs headings may use weight/tracking already present in the shell — do not introduce a decorative hero display face for Docs.

## Brand test

First view still: usable board, LYRIKAI board wordmark, save status, three named tool shelves. Docs is reachable from Help without looking like a second product.

## Avoid (Precision applications — cite, do not fork)

Purple-on-white / purple-indigo glow; Inter/Roboto/Arial as hero display; cream+terracotta or cream+serif broadsheet; glass-card stacks and badge clutter as design; theme changes that erase user styling; unlabeled primary icons.

Normative cites: `lk-bloom/hive-vip-1/hive-vip-1_main/design/README.md`, `lk-bloom/hive-vip-1/hive-vip-1_main/design/GUIDE.md`, `lk-bloom/hive-vip-1/hive-vip-1_main/precision/DESIGN-DO-DONT.md`.

Scaffold neutrality: Docs/chrome CSS extends existing tokens only; no competing palette invent during polish.
