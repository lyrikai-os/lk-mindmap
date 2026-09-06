export type BoardTheme = { background: string; grid: 'none' | 'dots' | 'lines'; gridColor: string; spacing: number };
export const DEFAULT_THEME: BoardTheme = { background: '#f6f7f9', grid: 'dots', gridColor: '#c7ced8', spacing: 24 };
export type BoardDocument = {
  format: 'lyrikai-board'; version: 1; id: string; title: string; createdAt: string; updatedAt: string;
  scene: { elements: readonly any[]; appState: Record<string, any>; files: Record<string, any> };
  camera: { x: number; y: number; zoom: number }; theme: BoardTheme;
};
export type OpenBoard = { handle: string; document: BoardDocument; filename: string };
export type LibraryEntry = { handle: string; title: string; filename: string; updatedAt: string; error?: string };
export type Result<T> = { ok: true; value: T } | { ok: false; error: string; code?: string; canRecover?: boolean };
export type BoardBridge = {
  library(): Promise<Result<{ folder: string; boards: LibraryEntry[] }>>;
  open(handle?: string): Promise<Result<OpenBoard | null>>;
  save(handle: string | null, document: BoardDocument): Promise<Result<OpenBoard>>;
  saveAs(document: BoardDocument): Promise<Result<OpenBoard | null>>;
  duplicate(document: BoardDocument): Promise<Result<OpenBoard>>;
  rename(handle: string, title: string): Promise<Result<OpenBoard>>;
  recover(handle: string): Promise<Result<OpenBoard>>;
  chooseFolder(): Promise<Result<string | null>>;
  reveal(handle?: string): Promise<Result<null>>;
  setDirty(dirty: boolean): void;
  closeReady(): void;
  onClose(callback: () => void): () => void;
  onMenu(callback: (action: string) => void): () => void;
};
export function createBoard(): BoardDocument {
  const now = new Date().toISOString();
  return { format: 'lyrikai-board', version: 1, id: crypto.randomUUID(), title: 'Untitled board', createdAt: now, updatedAt: now,
    scene: { elements: [], appState: {}, files: {} }, camera: { x: 0, y: 0, zoom: 1 }, theme: { ...DEFAULT_THEME } };
}
declare global { interface Window { board: BoardBridge; EXCALIDRAW_ASSET_PATH: string; } }
