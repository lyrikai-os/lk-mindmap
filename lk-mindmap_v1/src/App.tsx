import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Excalidraw, convertToExcalidrawElements, CaptureUpdateAction, MainMenu } from '@excalidraw/excalidraw';
import '@excalidraw/excalidraw/index.css';
import { Plus, FolderOpen, PanelLeftClose, PanelLeftOpen, ChevronDown, ChevronRight, Save, Copy, Folder, ArrowUpRight, Moon, Sun, Network, StickyNote, Pencil, ImagePlus, Type, Square, ArrowRight, Minus, Maximize, MoreHorizontal } from 'lucide-react';
import { createBoard, type BoardDocument, type OpenBoard, type LibraryEntry } from './contract';
import { branchPlacement } from './branches';

const persistedState = (s: any) => Object.fromEntries(['currentItemStrokeColor','currentItemBackgroundColor','currentItemFillStyle','currentItemStrokeWidth','currentItemStrokeStyle','currentItemRoughness','currentItemOpacity','currentItemFontFamily','currentItemFontSize','currentItemTextAlign','currentItemStartArrowhead','currentItemEndArrowhead'].map(k => [k, s[k]]));
const clone = <T,>(v:T):T => structuredClone(v);
export default function App() {
 const [doc, setDoc] = useState<BoardDocument>(() => createBoard());
 const current = useRef(doc), handle = useRef<string|null>(null), revision = useRef(0), saved = useRef(0), timer = useRef<ReturnType<typeof setTimeout>|undefined>(undefined);
 const [api, setApi] = useState<any>(null), [epoch,setEpoch]=useState(0), [status,setStatus]=useState('Not saved yet');
 const [library,setLibrary]=useState<LibraryEntry[]>([]),[folder,setFolder]=useState(''),[sidebar,setSidebar]=useState(true),[dark,setDark]=useState(false),[expanded,setExpanded]=useState('mindmap');
 const [error,setError]=useState<string|null>(null), [recover,setRecover]=useState<string|null>(null), [menu,setMenu]=useState(false);
 const pending = useRef<null|(()=>Promise<void>)>(null), saving = useRef<Promise<boolean>|null>(null), renaming = useRef<Promise<void>|null>(null), lastSignature=useRef('');
 const boardGen = useRef(0), lastRenamedTitle = useRef(doc.title);
 const [camera,setCamera]=useState(doc.camera); const importing=useRef<HTMLInputElement>(null);
 const refresh = useCallback(async()=>{ const r=await window.board.library(); if(r.ok){setLibrary(r.value.boards);setFolder(r.value.folder);} else setError(r.error); },[]);
 const mark = useCallback((next:BoardDocument)=>{current.current=next;setDoc(next);revision.current++;window.board.setDirty(true);setStatus('Unsaved changes');},[]);
 const flush = useCallback(async():Promise<boolean> => {
   clearTimeout(timer.current);
   if(saving.current){if(!await saving.current)return false;}
   if(saved.current===revision.current && handle.current)return true;
   const run=async()=>{
    const rev=revision.current, snapshot=clone(current.current); setStatus('Saving…');
    const r=await window.board.save(handle.current,snapshot);
    if(!r.ok){setStatus('Save failed');setError(r.error);return false;}
    handle.current=r.value.handle;saved.current=rev;window.board.setDirty(saved.current!==revision.current);
    setStatus(saved.current===revision.current?'All changes saved':'Unsaved changes');void refresh();return true;
   };
   saving.current=run();const success=await saving.current;saving.current=null;
   if(success && saved.current!==revision.current)return await flush();
   return success;
 },[refresh]);
 const schedule = useCallback(()=>{clearTimeout(timer.current);timer.current=setTimeout(()=>void flush(),1000);},[flush]);
 const edit = useCallback((next:BoardDocument)=>{mark(next);schedule();},[mark,schedule]);
 const load = useCallback((opened:OpenBoard|null)=>{ clearTimeout(timer.current);boardGen.current++;const next=opened?.document??createBoard();current.current=next;setDoc(next);handle.current=opened?.handle??null;revision.current=0;saved.current=0;lastSignature.current='';lastRenamedTitle.current=next.title;setCamera(next.camera);setApi(null);setEpoch(n=>n+1);window.board.setDirty(false);setStatus(opened?'All changes saved':'Not saved yet');},[]);
 const commitTitle = useCallback(async()=>{
   const trimmed=current.current.title.trim()||'Untitled board';
   const gen=boardGen.current, h=handle.current;
   if(trimmed!==current.current.title)edit({...current.current,title:trimmed});
   if(!h)return;
   if(trimmed===lastRenamedTitle.current && saved.current===revision.current)return;
   if(!(await flush()))return;
   if(boardGen.current!==gen || handle.current!==h)return;
   const run=async()=>{
    const r=await window.board.rename(h,trimmed);
    if(boardGen.current!==gen || handle.current!==h)return;
    if(r.ok){handle.current=r.value.handle;lastRenamedTitle.current=r.value.document.title;const merged={...current.current,title:r.value.document.title,updatedAt:r.value.document.updatedAt};current.current=merged;setDoc(merged);void refresh();}
    else setError(r.error);
   };
   renaming.current=run();await renaming.current;renaming.current=null;
 },[edit,flush,refresh]);
 const guard = useCallback(async(action:()=>Promise<void>)=>{if(renaming.current)await renaming.current;if(await flush())await action();else pending.current=action;},[flush]);
 const open = useCallback(async(id?:string)=>{await guard(async()=>{const r=await window.board.open(id);if(r.ok){if(r.value)load(r.value);}else {setError(r.error);if(r.canRecover&&id)setRecover(id);}});},[guard,load]);
 const saveAs=useCallback(async()=>{clearTimeout(timer.current);if(saving.current)await saving.current;const rev=revision.current;const r=await window.board.saveAs(clone(current.current));if(r.ok&&r.value){handle.current=r.value.handle;saved.current=rev;setStatus(rev===revision.current?'All changes saved':'Unsaved changes');window.board.setDirty(rev!==revision.current);setError(null);void refresh();if(rev!==revision.current)schedule();return true;}if(!r.ok)setError(r.error);return false;},[refresh,schedule]);
 const act = useCallback(async(action:string)=>{setMenu(false);if(action==='save')await flush();if(action==='save-as')await saveAs();if(action==='new')await guard(async()=>load(null));if(action==='open')await open();if(action==='duplicate')await guard(async()=>{const r=await window.board.duplicate(clone(current.current));if(r.ok){load(r.value);void refresh();}else setError(r.error);});if(action==='folder')await guard(async()=>{const r=await window.board.chooseFolder();if(r.ok&&r.value){load(null);void refresh();}else if(!r.ok)setError(r.error);});if(action==='reveal'){const r=await window.board.reveal(handle.current??undefined);if(!r.ok)setError(r.error);}},[flush,saveAs,guard,open,load,refresh]);
 useEffect(()=>{void refresh();const a=window.board.onClose(()=>void guard(async()=>window.board.closeReady()));const b=window.board.onMenu(action=>void act(action));return()=>{a();b();};},[refresh,guard,act]);
 useEffect(()=>()=>clearTimeout(timer.current),[]);
 const onChange = (elements:readonly any[],state:any,files:any)=>{
  const scene={elements,appState:persistedState(state),files};const cam={x:state.scrollX,y:state.scrollY,zoom:state.zoom.value};
  const signature=JSON.stringify([elements.map(e=>[e.id,e.version,e.isDeleted]),scene.appState,Object.keys(files),cam]);
  if(!lastSignature.current){lastSignature.current=signature;setCamera(cam);return;}
  if(signature===lastSignature.current)return;lastSignature.current=signature;
  setCamera(cam);
  edit({...current.current,scene,camera:cam});
 };
 const addNode=(kind:'mindmap'|'note'|'text')=>{if(!api)return;const s=api.getAppState();const x=(s.width/2)/s.zoom.value-s.scrollX-95,y=(s.height/2)/s.zoom.value-s.scrollY-38;
  const id=crypto.randomUUID();const elements=convertToExcalidrawElements(kind==='text'?[{type:'text',id,x,y,text:'Your thought',fontFamily:5,fontSize:24}]:[{type:'rectangle',id,x,y,width:kind==='note'?220:190,height:kind==='note'?160:76,backgroundColor:kind==='note'?'#fff1b8':'#e5f0eb',fillStyle:'solid',strokeColor:kind==='note'?'#d4b85e':'#548675',roughness:0,roundness:{type:3},label:{text:kind==='note'?'A little room to think.':'New idea',fontFamily:5,fontSize:20},customData:kind==='mindmap'?{mindmap:true,parentId:null}:undefined}] as any,{regenerateIds:false});
  api.updateScene({elements:[...api.getSceneElements(),...elements],appState:{selectedElementIds:{[id]:true}},captureUpdate:CaptureUpdateAction.IMMEDIATELY});api.setActiveTool({type:'selection'});
 };
 const branch=(sibling=false)=>{if(!api)return;const elements=api.getSceneElements();const s=api.getAppState();const selected=elements.filter((e:any)=>s.selectedElementIds[e.id]&&e.customData?.mindmap);if(selected.length!==1)return;
 const placement=branchPlacement(elements,selected[0],sibling);if(!placement)return;const {parent,x,y}=placement,id=crypto.randomUUID(),arrowId=crypto.randomUUID();
 const additions=convertToExcalidrawElements([{type:'rectangle',id,x,y,width:190,height:76,backgroundColor:parent.backgroundColor,fillStyle:'solid',strokeColor:parent.strokeColor,roughness:0,roundness:{type:3},label:{text:'New idea',fontFamily:5,fontSize:20},customData:{mindmap:true,parentId:parent.id}}] as any,{regenerateIds:false});
 const arrows=convertToExcalidrawElements([{type:'arrow',id:arrowId,x:parent.x+parent.width,y:parent.y+parent.height/2,points:[[0,0],[x-parent.x-parent.width,y+38-parent.y-parent.height/2]],strokeColor:parent.strokeColor,roughness:0,startBinding:{elementId:parent.id,focus:0,gap:1},endBinding:{elementId:id,focus:0,gap:1},endArrowhead:'arrow'}] as any,{regenerateIds:false});
 const updated=elements.map((e:any)=>e.id===parent.id?{...e,version:e.version+1,boundElements:[...(e.boundElements??[]),{id:arrowId,type:'arrow'}]}:e);
 const bound=additions.map((e:any)=>e.id===id?{...e,boundElements:[...(e.boundElements??[]),{id:arrowId,type:'arrow'}]}:e);
 api.updateScene({elements:[...updated,...bound,...arrows],appState:{selectedElementIds:{[id]:true}},captureUpdate:CaptureUpdateAction.IMMEDIATELY});
 };
 useEffect(()=>{const key=(e:KeyboardEvent)=>{const target=e.target as HTMLElement;if(target.closest('input,textarea,[contenteditable="true"]'))return;if(e.key==='Tab'||(e.key==='Enter'&&e.shiftKey)){const s=api?.getAppState();if(api?.getSceneElements().some((el:any)=>s.selectedElementIds[el.id]&&el.customData?.mindmap)){e.preventDefault();e.stopImmediatePropagation();branch(e.key==='Enter');}}};window.addEventListener('keydown',key,true);return()=>window.removeEventListener('keydown',key,true);},[api]);
 const images=async(files:File[])=>{if(!api)return;const allowed=files.filter(f=>/^image\/(png|jpeg|webp)$/.test(f.type));if(allowed.length!==files.length)setError('Use PNG, JPEG, or WebP images.');for(const [index,file] of allowed.entries()){if(file.size>25*1024*1024){setError('Please use images smaller than 25 MB.');continue;}const data=await new Promise<string>((resolve,reject)=>{const r=new FileReader();r.onload=()=>resolve(r.result as string);r.onerror=reject;r.readAsDataURL(file);});const bitmap=await createImageBitmap(file);const w=Math.min(480,bitmap.width),h=bitmap.height*w/bitmap.width;bitmap.close();const id=crypto.randomUUID();api.addFiles([{id,dataURL:data,mimeType:file.type,created:Date.now()}]);const s=api.getAppState();const els=convertToExcalidrawElements([{type:'image',fileId:id,x:s.width/2/s.zoom.value-s.scrollX-w/2+index*24,y:s.height/2/s.zoom.value-s.scrollY-h/2+index*24,width:w,height:h}] as any);api.updateScene({elements:[...api.getSceneElements(),...els],captureUpdate:CaptureUpdateAction.IMMEDIATELY});}};
 const imageEvent=(e:React.DragEvent|React.ClipboardEvent)=>{const files=Array.from('dataTransfer'in e?e.dataTransfer.files:e.clipboardData.files);if(files.length){e.preventDefault();e.stopPropagation();void images(files).catch(err=>setError(String(err)));}};
 const spacing=doc.theme.spacing*camera.zoom;const background={backgroundColor:doc.theme.background,backgroundImage:doc.theme.grid==='dots'?`radial-gradient(${doc.theme.gridColor} 1px, transparent 1px)`:doc.theme.grid==='lines'?`linear-gradient(${doc.theme.gridColor} 1px, transparent 1px), linear-gradient(90deg, ${doc.theme.gridColor} 1px, transparent 1px)`:'none',backgroundSize:`${spacing}px ${spacing}px`,backgroundPosition:`${camera.x*camera.zoom}px ${camera.y*camera.zoom}px`};
 return <div className={`studio ${dark?'dark':''}`}>
 <header className="topbar"><div className="brand"><span className="brand-mark">✳</span> LYRIKAI <span className="brand-light">board</span></div><span className="divider"/><input aria-label="Board title" className="board-title" value={doc.title} onChange={e=>edit({...current.current,title:e.target.value})} onBlur={()=>{void commitTitle();}}/><span className={`save-state ${status==='Save failed'?'failure':''}`}><i/>{status}</span><div className="top-actions"><button title="Save board" onClick={()=>void flush()}><Save size={17}/></button><button title={dark?'Light interface':'Dark interface'} onClick={()=>setDark(!dark)}>{dark?<Sun size={17}/>:<Moon size={17}/>}</button><button aria-label="Board actions" onClick={()=>setMenu(!menu)}><MoreHorizontal size={21}/></button></div>{menu&&<div className="menu">{[['new','New board'],['open','Open board…'],['save-as','Save as…'],['duplicate','Duplicate board'],['folder','Choose boards folder…'],['reveal','Show in Finder']].map(([action,label])=><button key={action} onClick={()=>void act(action)}>{label}</button>)}</div>}</header>
 <div className="workspace">{sidebar&&<aside className="library"><div className="section-head"><span>YOUR SPACE</span><button title="Hide library" onClick={()=>setSidebar(false)}><PanelLeftClose size={16}/></button></div><button className="new-board" onClick={()=>void act('new')}><Plus size={17}/> New board</button><div className="library-heading">Boards <span>{library.length}</span></div><div className="board-list">{library.length===0?<p className="library-empty">A home for your next idea.<br/>Your saved boards appear here.</p>:library.map(b=><button className={`board-item ${handle.current===b.handle?'selected':''}`} key={b.handle} onClick={()=>void open(b.handle)}><span className="board-thumbnail"><Network size={20}/></span><span><strong>{b.title}</strong><small>{b.error?'Needs recovery':new Date(b.updatedAt).toLocaleDateString(undefined,{month:'short',day:'numeric'})}</small></span></button>)}</div><button className="folder-link" title={folder} onClick={()=>void act('reveal')}><Folder size={15}/><span>Boards folder</span><ArrowUpRight size={14}/></button><p className="local-note">On your Mac. Yours to keep.</p></aside>}
 <main className="board-surface" style={background} onDropCapture={imageEvent} onPasteCapture={imageEvent} onDragOver={e=>e.preventDefault()}>
 {!sidebar&&<button className="show-library floating" title="Show library" onClick={()=>setSidebar(true)}><PanelLeftOpen size={18}/></button>}
 <Excalidraw key={epoch} excalidrawAPI={setApi} initialData={{elements:doc.scene.elements,files:doc.scene.files,appState:{...doc.scene.appState,scrollX:doc.camera.x,scrollY:doc.camera.y,zoom:{value:doc.camera.zoom} as any,viewBackgroundColor:'transparent',theme:'light'}}} onChange={onChange} theme="light" UIOptions={{canvasActions:{loadScene:false,saveToActiveFile:false,export:false,changeViewBackgroundColor:false,toggleTheme:false},tools:{image:false}}}>
 <MainMenu><MainMenu.DefaultItems.ClearCanvas/><MainMenu.DefaultItems.Help/></MainMenu>
 </Excalidraw>
 <div className="toolsets floating">{[{id:'mindmap',name:'Clean Studio',icon:Network},{id:'draw',name:'Sketchbook',icon:Pencil},{id:'notes',name:'Pinboard',icon:StickyNote}].map(({id,name,icon:Icon})=><section key={id}><button className="toolset-title" onClick={()=>setExpanded(expanded===id?'':id)}><Icon size={17}/><span>{name}</span>{expanded===id?<ChevronDown size={14}/>:<ChevronRight size={14}/>}</button>{expanded===id&&<div className="toolset-content">{id==='mindmap'?<><button onClick={()=>addNode('mindmap')}><Plus size={15}/>Add idea</button><button onClick={()=>branch()}><ArrowRight size={15}/>Child <kbd>Tab</kbd></button><button onClick={()=>branch(true)}><Network size={15}/>Sibling <kbd>⇧ ↵</kbd></button><p>Select an idea to grow a branch.</p></>:id==='notes'?<><button onClick={()=>addNode('note')}><StickyNote size={15}/>Sticky note</button><button onClick={()=>addNode('text')}><Type size={15}/>Text</button><button onClick={()=>importing.current?.click()}><ImagePlus size={15}/>Import image</button><p>Or drop an image onto your board.</p></>:<><button onClick={()=>api?.setActiveTool({type:'freedraw'})}><Pencil size={15}/>Freehand</button><button onClick={()=>api?.setActiveTool({type:'rectangle'})}><Square size={15}/>Shape</button><button onClick={()=>api?.setActiveTool({type:'arrow'})}><ArrowRight size={15}/>Connector</button><p>Style selected objects with the canvas tools.</p></>}</div>}</section>)}</div>
 {doc.scene.elements.filter(e=>!e.isDeleted).length===0&&<div className="empty-canvas"><span className="eyebrow">A LITTLE SPACE FOR BIG IDEAS</span><h1>Start anywhere.</h1><p>A thought, an image, a connection.<br/>Make room for what comes next.</p><button onClick={()=>addNode('mindmap')}><Plus size={16}/> Plant your first idea</button></div>}
 <div className="canvas-footer"><span className="hint">Space + drag to explore · Scroll to zoom</span><div className="canvas-settings floating"><label title="Board background"><input aria-label="Board background" type="color" value={doc.theme.background} onChange={e=>edit({...current.current,theme:{...current.current.theme,background:e.target.value}})}/></label><select aria-label="Board grid" value={doc.theme.grid} onChange={e=>edit({...current.current,theme:{...current.current.theme,grid:e.target.value as any}})}><option value="dots">Dots</option><option value="lines">Lines</option><option value="none">No grid</option></select><button title="Zoom out" onClick={()=>api?.updateScene({appState:{zoom:{value:Math.max(.1,camera.zoom/1.2)}}})}><Minus size={15}/></button><span>{Math.round(camera.zoom*100)}%</span><button title="Zoom in" onClick={()=>api?.updateScene({appState:{zoom:{value:Math.min(10,camera.zoom*1.2)}}})}><Plus size={15}/></button><button title="Fit board" onClick={()=>api?.scrollToContent(undefined,{fitToContent:true})}><Maximize size={15}/></button></div></div>
 </main></div><input ref={importing} hidden type="file" accept="image/png,image/jpeg,image/webp" multiple onChange={e=>{void images(Array.from(e.target.files??[])).catch(err=>setError(String(err)));e.target.value='';}}/>
 {error&&<div className="modal-scrim"><div className="modal" role="alertdialog" aria-modal="true" aria-label="Board needs attention"><span className="eyebrow">LET’S KEEP YOUR IDEAS SAFE</span><h2>A little attention needed.</h2><p>{error}</p><div className="modal-actions">{recover?<button onClick={async()=>{const r=await window.board.recover(recover);if(r.ok){load(r.value);setRecover(null);setError(null);}else setError(r.error);}}>Open recovery copy</button>:<><button onClick={async()=>{setError(null);if(await flush()){const action=pending.current;pending.current=null;await action?.();}}}>Retry save</button><button onClick={async()=>{if(await saveAs()){const action=pending.current;pending.current=null;await action?.();}}}>Save as…</button></>}<button className="secondary" onClick={()=>{setError(null);setRecover(null);pending.current=null;}}>Keep editing</button>{pending.current&&<button className="danger" onClick={async()=>{const action=pending.current;pending.current=null;setError(null);window.board.setDirty(false);await action?.();}}>Discard changes & continue</button>}</div></div></div>}
 </div>;
}
