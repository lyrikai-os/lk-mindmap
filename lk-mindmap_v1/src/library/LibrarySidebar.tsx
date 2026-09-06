import React, { useState } from 'react';
import { Plus, PanelLeftClose, Folder, ArrowUpRight, Network, Pencil } from 'lucide-react';
import type { LibraryEntry } from '../contract';

type Props = {
  library: LibraryEntry[];
  folder: string;
  activeHandle: string | null;
  onNew: () => void;
  onOpen: (handle: string) => void;
  onHide: () => void;
  onReveal: () => void;
  onRename: (handle: string, title: string) => void;
};

export function LibrarySidebar({ library, folder, activeHandle, onNew, onOpen, onHide, onReveal, onRename }: Props) {
  const [editing, setEditing] = useState<string | null>(null);
  const [draft, setDraft] = useState('');

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
    <aside className="library">
      <div className="section-head">
        <span>YOUR SPACE</span>
        <button type="button" title="Hide library" onClick={onHide}><PanelLeftClose size={16} /></button>
      </div>
      <button type="button" className="new-board" onClick={onNew}><Plus size={17} /> New board</button>
      <div className="library-heading">Boards <span>{library.length}</span></div>
      <div className="board-list">
        {library.length === 0 ? (
          <p className="library-empty">A home for your next idea.<br />Your saved boards appear here.</p>
        ) : (
          library.map(b => (
            <div key={b.handle} className={`board-item ${activeHandle === b.handle ? 'selected' : ''}`}>
              <button type="button" className="board-item-main" onClick={() => onOpen(b.handle)}>
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
                <button type="button" className="board-rename-btn" title="Rename" aria-label={`Rename ${b.title}`} onClick={e => startRename(b, e)}>
                  <Pencil size={13} />
                </button>
              )}
            </div>
          ))
        )}
      </div>
      <button type="button" className="folder-link" title={folder} onClick={onReveal}>
        <Folder size={15} /><span>Boards folder</span><ArrowUpRight size={14} />
      </button>
      <p className="local-note">On your Mac. Yours to keep.</p>
    </aside>
  );
}
