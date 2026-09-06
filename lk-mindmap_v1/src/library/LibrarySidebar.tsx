import React, { useState, useRef } from 'react';
import { Plus, PanelLeftClose, Folder, ArrowUpRight, Network, Pencil } from 'lucide-react';
import type { LibraryEntry } from '../contract';
import { gsap, useGSAP, motionVars, prefersReducedMotion } from '../motion';

type Props = {
  open: boolean;
  library: LibraryEntry[];
  folder: string;
  activeHandle: string | null;
  onNew: () => void;
  onOpen: (handle: string) => void;
  onHide: () => void;
  onReveal: () => void;
  onRename: (handle: string, title: string) => void;
};

export function LibrarySidebar({ open, library, folder, activeHandle, onNew, onOpen, onHide, onReveal, onRename }: Props) {
  const [editing, setEditing] = useState<string | null>(null);
  const [draft, setDraft] = useState('');
  const rootRef = useRef<HTMLElement>(null);
  const chromeRef = useRef<HTMLDivElement>(null);
  const primed = useRef(false);

  useGSAP(() => {
    const chrome = chromeRef.current;
    if (!chrome) return;
    if (!primed.current) {
      primed.current = true;
      gsap.set(chrome, { autoAlpha: open ? 1 : 0 });
      return;
    }
    if (prefersReducedMotion()) {
      gsap.set(chrome, { autoAlpha: open ? 1 : 0 });
      return;
    }
    if (open) {
      gsap.fromTo(chrome, { autoAlpha: 0 }, motionVars({ autoAlpha: 1, duration: 0.14 }));
    } else {
      gsap.to(chrome, motionVars({ autoAlpha: 0, duration: 0.1, ease: 'power2.in' }));
    }
  }, { dependencies: [open], scope: rootRef });

  const startRename = (b: LibraryEntry, e: React.MouseEvent) => {
    e.stopPropagation();
    setEditing(b.handle);
    setDraft(b.title);
  };

  const commit = (handle: string) => {
    const trimmed = draft.trim();
    setEditing(null);
    if (!trimmed) return;
    const current = library.find(b => b.handle === handle);
    if (current && trimmed === current.title) return;
    onRename(handle, trimmed);
  };

  return (
    <aside
      ref={rootRef}
      className={`library${open ? '' : ' is-collapsed'}`}
      data-flip-id="library"
      aria-hidden={!open}
    >
      <div ref={chromeRef} className="library-chrome">
        <div className="section-head">
          <span>YOUR SPACE</span>
          <button type="button" title="Hide library" onClick={onHide} tabIndex={open ? 0 : -1}><PanelLeftClose size={16} /></button>
        </div>
        <button type="button" className="new-board" onClick={onNew} tabIndex={open ? 0 : -1}><Plus size={17} /> New board</button>
        <div className="library-heading">Boards <span>{library.length}</span></div>
        <div className="board-list">
          {library.length === 0 ? (
            <p className="library-empty">A home for your next idea.<br />Your saved boards appear here.</p>
          ) : (
            library.map(b => (
              <div key={b.handle} className={`board-item ${activeHandle === b.handle ? 'selected' : ''}`}>
                <button type="button" className="board-item-main" onClick={() => onOpen(b.handle)} tabIndex={open ? 0 : -1}>
                  <span className="board-thumbnail"><Network size={20} /></span>
                  <span className="board-item-text">
                    {editing === b.handle ? (
                      <input
                        aria-label="Rename board"
                        className="board-rename-input"
                        value={draft}
                        autoFocus
                        onClick={e => e.stopPropagation()}
                        onChange={e => setDraft(e.target.value)}
                        onBlur={() => commit(b.handle)}
                        onKeyDown={e => {
                          if (e.key === 'Enter') { e.preventDefault(); commit(b.handle); }
                          if (e.key === 'Escape') { e.preventDefault(); setEditing(null); }
                        }}
                      />
                    ) : (
                      <strong>{b.title}</strong>
                    )}
                    <small>{b.error ? 'Needs recovery' : new Date(b.updatedAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}</small>
                  </span>
                </button>
                {editing !== b.handle && (
                  <button type="button" className="board-rename-btn" title="Rename" aria-label={`Rename ${b.title}`} onClick={e => startRename(b, e)} tabIndex={open ? 0 : -1}>
                    <Pencil size={13} />
                  </button>
                )}
              </div>
            ))
          )}
        </div>
        <button type="button" className="folder-link" title={folder} onClick={onReveal} tabIndex={open ? 0 : -1}>
          <Folder size={15} /><span>Boards folder</span><ArrowUpRight size={14} />
        </button>
        <p className="local-note">On your Mac. Yours to keep.</p>
      </div>
    </aside>
  );
}
