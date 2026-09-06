import whatItIs from './about/what-it-is.md?raw';
import whereBoardsLive from './about/where-boards-live.md?raw';
import canvas from './explainers/canvas.md?raw';
import toolsets from './explainers/toolsets.md?raw';
import saveModel from './explainers/save-model.md?raw';
import firstBoard from './guides/first-board.md?raw';
import renameABoard from './guides/rename-a-board.md?raw';
import showInFinder from './guides/show-in-finder.md?raw';
import recoverABoard from './guides/recover-a-board.md?raw';
import saveFailed from './guides/save-failed.md?raw';

export type DocLane = 'about' | 'explainers' | 'guides';
export type DocArticle = { id: string; lane: DocLane; title: string; body: string };

export const DOC_LANES: { id: DocLane; label: string }[] = [
  { id: 'about', label: 'About' },
  { id: 'explainers', label: 'Explainers' },
  { id: 'guides', label: 'Guides' },
];

export const DOC_ARTICLES: DocArticle[] = [
  { id: 'what-it-is', lane: 'about', title: 'What LYRIKAI board is', body: whatItIs },
  { id: 'where-boards-live', lane: 'about', title: 'Where boards live', body: whereBoardsLive },
  { id: 'canvas', lane: 'explainers', title: 'The canvas', body: canvas },
  { id: 'toolsets', lane: 'explainers', title: 'Toolsets', body: toolsets },
  { id: 'save-model', lane: 'explainers', title: 'How saving works', body: saveModel },
  { id: 'first-board', lane: 'guides', title: 'Plant your first idea', body: firstBoard },
  { id: 'rename-a-board', lane: 'guides', title: 'Rename a board', body: renameABoard },
  { id: 'show-in-finder', lane: 'guides', title: 'Show boards folder in Finder', body: showInFinder },
  { id: 'recover-a-board', lane: 'guides', title: 'Recover a board', body: recoverABoard },
  { id: 'save-failed', lane: 'guides', title: 'When save fails', body: saveFailed },
];
