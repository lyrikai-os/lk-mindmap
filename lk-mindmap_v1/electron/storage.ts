import { promises as fs } from 'node:fs';
import path from 'node:path';
import { createHash, randomUUID } from 'node:crypto';
import type { BoardDocument, OpenBoard, LibraryEntry } from '../src/contract';
const MAX = 120 * 1024 * 1024;
export class BoardError extends Error { constructor(message: string, public code = 'IO', public canRecover = false) { super(message); } }
const object = (v: any) => v && typeof v === 'object' && !Array.isArray(v);
const finite = (v: any) => typeof v === 'number' && Number.isFinite(v) && Math.abs(v) <= 1e9;
export function validateDocument(v: any): BoardDocument {
  const fail = (message: string): never => { throw new BoardError(message, 'INVALID'); };
  if (!object(v) || v.format !== 'lyrikai-board') fail('This is not a LYRIKAI board file.');
  if (v.version !== 1) throw new BoardError('This board version is unsupported.', 'VERSION');
  if (typeof v.id !== 'string' || !v.id || v.id.length > 128 || typeof v.title !== 'string' || !v.title.trim() || v.title.length > 200) fail('Invalid board identity or title.');
  if (![v.createdAt, v.updatedAt].every(d => typeof d === 'string' && Number.isFinite(Date.parse(d)))) fail('Invalid board dates.');
  if (!object(v.camera) || ![v.camera.x, v.camera.y, v.camera.zoom].every(finite) || v.camera.zoom < .1 || v.camera.zoom > 30) fail('Invalid camera.');
  if (!object(v.theme) || ![v.theme.background,v.theme.gridColor].every(c => typeof c === 'string' && /^#[\da-f]{6}$/i.test(c)) || !['none','dots','lines'].includes(v.theme.grid) || !finite(v.theme.spacing) || v.theme.spacing < 4 || v.theme.spacing > 200) fail('Invalid board theme.');
  if (!object(v.scene) || !Array.isArray(v.scene.elements) || v.scene.elements.length > 20000 || !object(v.scene.appState) || !object(v.scene.files)) fail('Invalid drawing scene.');
  const ids = new Set();
  for (const e of v.scene.elements) {
    if (!object(e) || typeof e.id !== 'string' || !e.id || ids.has(e.id) || !['rectangle','diamond','ellipse','line','arrow','freedraw','text','image','frame','magicframe','embeddable','iframe'].includes(e.type)) fail('Invalid drawing element.');
    ids.add(e.id);
    if (![e.x,e.y,e.width,e.height].every(finite) || e.width < 0 || e.height < 0) fail('Invalid element geometry.');
    if (e.angle !== undefined && !finite(e.angle)) fail('Invalid element angle.');
    if (e.points !== undefined && (!Array.isArray(e.points) || e.points.length > 100000 || !e.points.every((p: any) => Array.isArray(p) && p.length === 2 && p.every(finite)))) fail('Invalid drawing points.');
    if (['iframe','embeddable'].includes(e.type)) fail('Online embeds are not supported by offline boards.');
  }
  if (Object.keys(v.scene.files).length > 2000) fail('Too many images.');
  for (const [id, f] of Object.entries(v.scene.files) as [string, any][]) {
    if (!object(f) || f.id !== id || !['image/png','image/jpeg','image/webp','image/gif','image/svg+xml'].includes(f.mimeType) || typeof f.dataURL !== 'string' || f.dataURL.length > 30 * 1024 * 1024) fail('Invalid image asset.');
    // SVG is intentionally excluded: imported image assets must be passive raster data.
    if (!/^data:image\/(png|jpeg|webp|gif);base64,[A-Za-z0-9+/]*={0,2}$/.test(f.dataURL) || !f.dataURL.startsWith(`data:${f.mimeType};base64,`)) fail('Only embedded raster images are supported.');
  }
  for (const e of v.scene.elements) if (e.type === 'image' && !e.isDeleted && e.fileId && !v.scene.files[e.fileId]) fail('An image asset is missing.');
  if (Buffer.byteLength(JSON.stringify(v)) > MAX) fail('Board exceeds the 120 MB limit.');
  return v;
}
const hash = (s: string) => createHash('sha256').update(s).digest('hex');
type Entry = { file: string; fingerprint?: string };
export class BoardStorage {
  private entries = new Map<string, Entry>();
  private queue: Promise<any> = Promise.resolve();
  constructor(public folder: string) {}
  register(file: string): string {
    file = path.resolve(file);
    for (const [handle,e] of this.entries) if (e.file === file) return handle;
    const handle = randomUUID(); this.entries.set(handle,{file}); return handle;
  }
  filename(handle: string) { const e = this.entries.get(handle); if (!e) throw new BoardError('Unknown board handle.', 'HANDLE'); return e.file; }
  private async read(file: string) { const stat = await fs.stat(file); if (stat.size > MAX) throw new BoardError('Board exceeds the 120 MB limit.', 'INVALID'); const raw = await fs.readFile(file,'utf8'); let parsed; try { parsed = JSON.parse(raw); } catch { throw new BoardError('Board file is damaged.', 'INVALID'); } return { raw, document: validateDocument(parsed) }; }
  async library(): Promise<{folder:string; boards:LibraryEntry[]}> {
    await fs.mkdir(this.folder,{recursive:true});
    const names = (await fs.readdir(this.folder)).filter(n => n.endsWith('.lkmindmap'));
    const boards = await Promise.all(names.map(async name => {
      const file=path.join(this.folder,name), handle=this.register(file);
      try { const {document:d}=await this.read(file); return {handle,title:d.title,filename:file,updatedAt:d.updatedAt}; }
      catch (e) {return {handle,title:path.basename(name,'.lkmindmap'),filename:file,updatedAt:'',error:(e as Error).message};}
    }));
    return {folder:this.folder,boards:boards.sort((a,b)=>b.updatedAt.localeCompare(a.updatedAt))};
  }
  async open(handle: string): Promise<OpenBoard> {
    const file=this.filename(handle);
    try { const {raw,document}=await this.read(file); this.entries.get(handle)!.fingerprint=hash(raw); return {handle,document,filename:file}; }
    catch(e) { let canRecover=false; try {await this.read(file+'.bak');canRecover=true;} catch {} throw new BoardError((e as Error).message,(e as BoardError).code,canRecover); }
  }
  private serial<T>(fn:()=>Promise<T>): Promise<T> { const next=this.queue.then(fn,fn);this.queue=next.catch(()=>{});return next; }
  private async atomic(file:string, raw:string) {
    const tmp=file+'.tmp-'+randomUUID(); let fd;
    try {fd=await fs.open(tmp,'wx',0o600);await fd.writeFile(raw);await fd.sync();await fd.close();fd=undefined;await fs.rename(tmp,file);}
    finally {await fd?.close();await fs.unlink(tmp).catch(()=>{});}
  }
  async save(handle:string|null, input:BoardDocument): Promise<OpenBoard> {
    const stamped={...JSON.parse(JSON.stringify(input)),updatedAt:new Date().toISOString()};
    const document=validateDocument(stamped);
    return this.serial(async()=> {
      let fresh = !handle;
      if (!handle) {await fs.mkdir(this.folder,{recursive:true});handle=this.register(path.join(this.folder,`${document.title.replace(/[^\p{L}\p{N} _-]/gu,'').trim().slice(0,70)||'Board'}-${randomUUID()}.lkmindmap`));}
      const e=this.entries.get(handle)!;
      if (!e) throw new BoardError('Unknown board handle.','HANDLE');
      let previous: string|undefined;
      try {previous=await fs.readFile(e.file,'utf8');} catch(err:any) {if(err.code!=='ENOENT') throw err; if(!fresh) throw new BoardError('Board file was removed externally. Use Save As.','CONFLICT');}
      if (previous!==undefined) {
        if (fresh || !e.fingerprint || hash(previous)!==e.fingerprint) throw new BoardError('This file changed outside LYRIKAI board. Use Save As to preserve both versions, or reopen the external version.','CONFLICT');
        validateDocument(JSON.parse(previous));
        await this.atomic(e.file+'.bak',previous);
      }
      const raw=JSON.stringify(document);
      await this.atomic(e.file,raw);e.fingerprint=hash(raw);
      return {handle,document,filename:e.file};
    });
  }
  async saveAt(file:string,document:BoardDocument) {
    // Dialog selection explicitly authorizes this destination; establish its baseline now.
    const handle=this.register(file); const entry=this.entries.get(handle)!;
    try { const {raw}=await this.read(file); entry.fingerprint=hash(raw); }
    catch(e:any) {
      if(e.code!=='ENOENT') throw e;
      const stamped={...JSON.parse(JSON.stringify(document)),updatedAt:new Date().toISOString()};
      const next=validateDocument(stamped);
      const raw=JSON.stringify(next);
      await this.atomic(file,raw);entry.fingerprint=hash(raw);return {handle,document:next,filename:file};
    }
    return this.save(handle,document);
  }
  async duplicate(input:BoardDocument) { const now=new Date().toISOString();return this.save(null,{...input,id:randomUUID(),title:(input.title+' copy').slice(0,200),createdAt:now,updatedAt:now}); }
  private sanitizeName(title: string) { return title.replace(/[^\p{L}\p{N} _-]/gu,'').trim().slice(0,70)||'Board'; }
  private assertInFolder(file: string) {
    const root = path.resolve(this.folder);
    const resolved = path.resolve(file);
    if (resolved !== root && !resolved.startsWith(root + path.sep)) throw new BoardError('Board is outside the boards folder.', 'PATH');
  }
  async rename(handle: string, title: string): Promise<OpenBoard> {
    const trimmed = String(title??'').trim();
    if (!trimmed || trimmed.length > 200) throw new BoardError('Invalid board identity or title.', 'INVALID');
    return this.serial(async () => {
      const e = this.entries.get(handle);
      if (!e) throw new BoardError('Unknown board handle.', 'HANDLE');
      this.assertInFolder(e.file);
      const { raw, document } = await this.read(e.file);
      if (!e.fingerprint || hash(raw) !== e.fingerprint) throw new BoardError('This file changed outside LYRIKAI board. Reopen before renaming.', 'CONFLICT');
      const next = validateDocument({ ...document, title: trimmed, updatedAt: new Date().toISOString() });
      const dest = path.join(this.folder, `${this.sanitizeName(trimmed)}-${document.id.slice(0, 8)}.lkmindmap`);
      this.assertInFolder(dest);
      if (path.resolve(dest) !== path.resolve(e.file)) {
        try { await fs.access(dest); throw new BoardError('A board file with that name already exists.', 'CONFLICT'); }
        catch (err: any) { if (err instanceof BoardError) throw err; if (err?.code !== 'ENOENT') throw err; }
        const previousFile = e.file;
        await fs.rename(previousFile, dest);
        try { await fs.rename(previousFile + '.bak', dest + '.bak'); } catch {}
        e.file = dest;
      }
      await this.atomic(e.file + '.bak', raw);
      const serialized = JSON.stringify(next);
      await this.atomic(e.file, serialized);
      e.fingerprint = hash(serialized);
      return { handle, document: next, filename: e.file };
    });
  }
  async recover(handle:string) { const {document}=await this.read(this.filename(handle)+'.bak'); return this.save(null,{...document,id:randomUUID(),title:(document.title+' recovered').slice(0,200),updatedAt:new Date().toISOString()}); }
}
