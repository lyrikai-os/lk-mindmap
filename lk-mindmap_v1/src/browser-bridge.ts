import { createBoard, type BoardBridge, type BoardDocument, type LibraryEntry, type OpenBoard, type Result } from './contract';

/** In-memory board bridge for Vite-only preview when Electron preload is absent. */
export function installBrowserBridge(): void {
  if (typeof window === 'undefined' || window.board) return;
  const folder = 'Preview boards (in-memory)';
  const files = new Map<string, { document: BoardDocument; updatedAt: string }>();
  const ok = <T,>(value: T): Result<T> => ({ ok: true, value });
  const fail = (error: string): Result<never> => ({ ok: false, error });
  const list = (): LibraryEntry[] =>
    [...files.entries()]
      .map(([handle, entry]) => ({
        handle,
        title: entry.document.title,
        filename: `${entry.document.title}.lkmindmap`,
        updatedAt: entry.updatedAt,
      }))
      .sort((a, b) => b.updatedAt.localeCompare(a.updatedAt));
  const bridge: BoardBridge = {
    library: async () => ok({ folder, boards: list() }),
    open: async (handle) => {
      if (!handle) return ok(null);
      const entry = files.get(handle);
      return entry ? ok({ handle, document: structuredClone(entry.document), filename: `${entry.document.title}.lkmindmap` }) : fail('Unknown board handle.');
    },
    save: async (handle, document) => {
      const id = handle ?? crypto.randomUUID();
      const next = { ...structuredClone(document), updatedAt: new Date().toISOString() };
      files.set(id, { document: next, updatedAt: next.updatedAt });
      return ok({ handle: id, document: next, filename: `${next.title}.lkmindmap` });
    },
    saveAs: async (document) => bridge.save(null, document),
    duplicate: async (document) => {
      const now = new Date().toISOString();
      return bridge.save(null, { ...structuredClone(document), id: crypto.randomUUID(), title: `${document.title} copy`.slice(0, 200), createdAt: now, updatedAt: now });
    },
    rename: async (handle, title) => {
      const entry = files.get(handle);
      if (!entry) return fail('Unknown board handle.');
      const trimmed = title.trim() || 'Untitled board';
      const next = { ...structuredClone(entry.document), title: trimmed, updatedAt: new Date().toISOString() };
      files.set(handle, { document: next, updatedAt: next.updatedAt });
      return ok({ handle, document: next, filename: `${trimmed}.lkmindmap` });
    },
    recover: async () => fail('Recovery is available in the packaged Mac app.'),
    chooseFolder: async () => ok(folder),
    reveal: async () => ok(null),
    setDirty: () => {},
    closeReady: () => {},
    onClose: () => () => {},
    onMenu: () => () => {},
  };
  window.board = bridge;
  if (!files.size) {
    const starter = createBoard();
    files.set(crypto.randomUUID(), { document: starter, updatedAt: starter.updatedAt });
  }
}
