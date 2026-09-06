import React from 'react';
import { Plus, ChevronDown, ChevronRight, Network, StickyNote, Pencil, ImagePlus, Type, Square, ArrowRight } from 'lucide-react';

export type ToolsetId = 'mindmap' | 'draw' | 'notes';

type Props = {
  expanded: ToolsetId | '';
  onExpand: (id: ToolsetId | '') => void;
  onAddNode: (kind: 'mindmap' | 'note' | 'text') => void;
  onBranch: (sibling?: boolean) => void;
  onImport: () => void;
  onCaption: () => void;
  onSketchPreset: () => void;
  onTool: (type: 'freedraw' | 'rectangle' | 'arrow') => void;
};

const SECTIONS: { id: ToolsetId; name: string; icon: typeof Network }[] = [
  { id: 'mindmap', name: 'Clean Studio', icon: Network },
  { id: 'draw', name: 'Sketchbook', icon: Pencil },
  { id: 'notes', name: 'Pinboard', icon: StickyNote },
];

export function ToolsetsPanel({ expanded, onExpand, onAddNode, onBranch, onImport, onCaption, onSketchPreset, onTool }: Props) {
  return (
    <div className="toolsets floating">
      {SECTIONS.map(({ id, name, icon: Icon }) => (
        <section key={id}>
          <button type="button" className="toolset-title" onClick={() => onExpand(expanded === id ? '' : id)}>
            <Icon size={17} /><span>{name}</span>{expanded === id ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
          </button>
          {expanded === id && (
            <div className="toolset-content">
              {id === 'mindmap' && (
                <>
                  <button type="button" onClick={() => onAddNode('mindmap')}><Plus size={15} />Add idea</button>
                  <button type="button" onClick={() => onBranch()}><ArrowRight size={15} />Child <kbd>Tab</kbd></button>
                  <button type="button" onClick={() => onBranch(true)}><Network size={15} />Sibling <kbd>⇧ ↵</kbd></button>
                  <p>Select an idea to grow a branch.</p>
                </>
              )}
              {id === 'notes' && (
                <>
                  <button type="button" onClick={() => onAddNode('note')}><StickyNote size={15} />Sticky note</button>
                  <button type="button" onClick={() => onAddNode('text')}><Type size={15} />Text</button>
                  <button type="button" onClick={onImport}><ImagePlus size={15} />Import image</button>
                  <button type="button" onClick={onCaption}><Type size={15} />Caption image</button>
                  <p>Select an image, then caption — or drop an image onto your board.</p>
                </>
              )}
              {id === 'draw' && (
                <>
                  <button type="button" onClick={onSketchPreset}><Pencil size={15} />Soft stroke preset</button>
                  <button type="button" onClick={() => onTool('freedraw')}><Pencil size={15} />Freehand</button>
                  <button type="button" onClick={() => onTool('rectangle')}><Square size={15} />Shape</button>
                  <button type="button" onClick={() => onTool('arrow')}><ArrowRight size={15} />Connector</button>
                  <p>Preset sets stroke feel for new marks. Existing strokes stay as drawn.</p>
                </>
              )}
            </div>
          )}
        </section>
      ))}
    </div>
  );
}
