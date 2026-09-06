import React, { useEffect, useMemo, useState } from 'react';
import { X } from 'lucide-react';
import { DOC_ARTICLES, DOC_LANES, type DocLane } from './catalog';
import { MarkdownBody } from './MarkdownBody';

export function DocsPanel({ open, onClose, initialId }: { open: boolean; onClose: () => void; initialId?: string }) {
  const [lane, setLane] = useState<DocLane>('about');
  const [articleId, setArticleId] = useState(DOC_ARTICLES[0]?.id ?? '');
  const articles = useMemo(() => DOC_ARTICLES.filter(a => a.lane === lane), [lane]);
  const article = DOC_ARTICLES.find(a => a.id === articleId) ?? articles[0];

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

  if (!open) return null;

  return (
    <div className="docs-scrim" role="dialog" aria-modal="true" aria-label="Docs">
      <aside className="docs-panel">
        <header className="docs-head">
          <div>
            <span className="eyebrow">HELP</span>
            <h2>Docs</h2>
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
