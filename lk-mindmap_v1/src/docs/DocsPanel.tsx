import React, { useEffect, useMemo, useRef, useState } from 'react';
import { X } from 'lucide-react';
import { DOC_ARTICLES, DOC_LANES, type DocLane } from './catalog';
import { MarkdownBody } from './MarkdownBody';
import { Flip, SplitText, gsap, useGSAP, flipVars, motionVars, prefersReducedMotion } from '../motion';

export function DocsPanel({ open, onClose, initialId }: { open: boolean; onClose: () => void; initialId?: string }) {
  const [lane, setLane] = useState<DocLane>('about');
  const [articleId, setArticleId] = useState(DOC_ARTICLES[0]?.id ?? '');
  const [mounted, setMounted] = useState(open);
  const articles = useMemo(() => DOC_ARTICLES.filter(a => a.lane === lane), [lane]);
  const article = DOC_ARTICLES.find(a => a.id === articleId) ?? articles[0];

  const rootRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLElement>(null);
  const eyebrowRef = useRef<HTMLSpanElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const introRef = useRef<HTMLParagraphElement>(null);
  const pendingClose = useRef(false);

  useEffect(() => {
    if (open) {
      pendingClose.current = false;
      setMounted(true);
    }
  }, [open]);

  useEffect(() => {
    if (!open) return;
    if (initialId) {
      const found = DOC_ARTICLES.find(a => a.id === initialId);
      if (found) { setLane(found.lane); setArticleId(found.id); }
    }
  }, [open, initialId]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') { e.preventDefault(); onClose(); } };
    window.addEventListener('keydown', onKey, true);
    return () => window.removeEventListener('keydown', onKey, true);
  }, [open, onClose]);

  useEffect(() => {
    if (!articles.some(a => a.id === articleId) && articles[0]) setArticleId(articles[0].id);
  }, [articles, articleId]);

  useGSAP(() => {
    if (!mounted) return;
    const root = rootRef.current;
    const panel = panelRef.current;
    if (!root || !panel) return;

    const reduced = prefersReducedMotion();

    if (open) {
      gsap.set(root, { autoAlpha: 1, pointerEvents: 'auto' });

      if (reduced) {
        gsap.set(panel, { clearProps: 'transform' });
        gsap.set([eyebrowRef.current, titleRef.current, introRef.current].filter(Boolean), { clearProps: 'all' });
        return;
      }

      // Flip: record off-canvas layout, snap open, animate continuity
      gsap.set(panel, { xPercent: 100 });
      const state = Flip.getState(panel);
      gsap.set(panel, { xPercent: 0 });
      const flipTl = Flip.from(state, flipVars({
        duration: 0.18,
        ease: 'power2.out',
        absolute: true,
      }));

      const titleEls = [eyebrowRef.current, titleRef.current, introRef.current].filter(Boolean) as HTMLElement[];
      let split: SplitText | undefined;
      if (titleEls.length) {
        split = SplitText.create(titleEls, { type: 'words,chars', aria: 'auto' });
        flipTl.from(split.chars, motionVars({
          y: 10,
          autoAlpha: 0,
          stagger: 0.012,
          duration: 0.16,
        }), 0.04);
      }

      flipTl.fromTo(root, { autoAlpha: 0 }, motionVars({ autoAlpha: 1, duration: 0.14 }), 0);

      return () => {
        split?.revert();
      };
    }

    // Close / exit
    if (reduced) {
      gsap.set(root, { autoAlpha: 0, pointerEvents: 'none' });
      setMounted(false);
      return;
    }

    pendingClose.current = true;
    const tl = gsap.timeline({
      onComplete: () => {
        if (pendingClose.current) setMounted(false);
      },
    });
    tl.to(panel, motionVars({ xPercent: 100, duration: 0.14, ease: 'power2.in' }), 0)
      .to(root, motionVars({ autoAlpha: 0, duration: 0.12 }), 0);
  }, { dependencies: [open, mounted], scope: rootRef, revertOnUpdate: true });

  if (!mounted) return null;

  return (
    <div ref={rootRef} className="docs-scrim" role="dialog" aria-modal="true" aria-label="Docs">
      <aside ref={panelRef} className="docs-panel" data-flip-id="docs-panel">
        <header className="docs-head">
          <div>
            <span ref={eyebrowRef} className="eyebrow">HELP</span>
            <h2 ref={titleRef}>Docs</h2>
            <p ref={introRef} className="docs-intro">Guides and explainers for the board.</p>
          </div>
          <button type="button" title="Close docs" aria-label="Close docs" onClick={onClose}><X size={18} /></button>
        </header>
        <nav className="docs-lanes" aria-label="Doc lanes">
          {DOC_LANES.map(l => (
            <button key={l.id} type="button" className={lane === l.id ? 'active' : ''} onClick={() => setLane(l.id)}>{l.label}</button>
          ))}
        </nav>
        <div className="docs-body">
          <ul className="docs-toc">
            {articles.map(a => (
              <li key={a.id}>
                <button type="button" className={article?.id === a.id ? 'active' : ''} onClick={() => setArticleId(a.id)}>{a.title}</button>
              </li>
            ))}
          </ul>
          <article className="docs-article">
            {article ? <MarkdownBody source={article.body} /> : <p>Select a topic.</p>}
          </article>
        </div>
        <p className="docs-offline">Bundled with the app. Works offline.</p>
      </aside>
    </div>
  );
}
