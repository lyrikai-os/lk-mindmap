import { describe,it,expect,beforeEach,afterEach,vi } from 'vitest';
import { promises as fs } from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { BoardStorage,validateDocument } from '../electron/storage';
import { createBoard } from '../src/contract';
let folder:string, store:BoardStorage;
beforeEach(async()=>{folder=await fs.mkdtemp(path.join(os.tmpdir(),'lyrikai-storage-'));store=new BoardStorage(folder);});
afterEach(async()=>{vi.restoreAllMocks();await fs.rm(folder,{recursive:true,force:true});});
describe('portable board persistence',()=>{
 it('roundtrips embedded images and retains previous valid backup',async()=>{
 const doc=createBoard();doc.scene.files={image:{id:'image',mimeType:'image/png',dataURL:'data:image/png;base64,aGVsbG8='}};
 doc.scene.elements=[{id:'e',type:'image',x:0,y:0,width:100,height:100,fileId:'image'}];
 const first=await store.save(null,doc);const second=await store.save(first.handle,{...doc,title:'Updated'});
 expect((await store.open(second.handle)).document.scene.files).toEqual(doc.scene.files);
 expect(JSON.parse(await fs.readFile(first.filename+'.bak','utf8')).title).toBe('Untitled board');
 const copied=path.join(folder,'portable.lkmindmap');await fs.copyFile(first.filename,copied);
 const other=new BoardStorage(folder);expect((await other.open(other.register(copied))).document.scene.files).toEqual(doc.scene.files);
 });
 it('detects external edits regardless of mtime and leaves external file untouched',async()=>{
 const first=await store.save(null,createBoard());const stat=await fs.stat(first.filename);
 const raw=JSON.stringify({...first.document,title:'External'});await fs.writeFile(first.filename,raw);await fs.utimes(first.filename,stat.atime,stat.mtime);
 await expect(store.save(first.handle,{...first.document,title:'Internal'})).rejects.toMatchObject({code:'CONFLICT'});
 expect(await fs.readFile(first.filename,'utf8')).toBe(raw);
 });
 it('serializes concurrent updates and preserves the prior revision',async()=>{
 const first=await store.save(null,createBoard());await Promise.all([store.save(first.handle,{...first.document,title:'Two'}),store.save(first.handle,{...first.document,title:'Three'})]);
 expect((await store.open(first.handle)).document.title).toBe('Three');expect(JSON.parse(await fs.readFile(first.filename+'.bak','utf8')).title).toBe('Two');
 });
 it('keeps primary on backup failure and cleans temporary files',async()=>{
 const first=await store.save(null,createBoard());const raw=await fs.readFile(first.filename,'utf8');
 await fs.mkdir(first.filename+'.bak');
 await expect(store.save(first.handle,{...first.document,title:'Lost?'})).rejects.toThrow();
 expect(await fs.readFile(first.filename,'utf8')).toBe(raw);expect((await fs.readdir(folder)).some(n=>n.includes('.tmp-'))).toBe(false);
 });
 it('keeps primary on replacement failure',async()=>{
 const first=await store.save(null,createBoard());const raw=await fs.readFile(first.filename,'utf8');const rename=fs.rename.bind(fs);
 vi.spyOn(fs,'rename').mockImplementation(async(a,b)=>{if(b===first.filename)throw Object.assign(new Error('denied'),{code:'EACCES'});return rename(a,b);});
 await expect(store.save(first.handle,{...first.document,title:'Blocked'})).rejects.toThrow('denied');expect(await fs.readFile(first.filename,'utf8')).toBe(raw);
 });
 it('recovers into a new file while preserving damaged original',async()=>{
 const first=await store.save(null,createBoard());await store.save(first.handle,{...first.document,title:'Second'});await fs.writeFile(first.filename,'broken');
 await expect(store.open(first.handle)).rejects.toMatchObject({canRecover:true});const recovered=await store.recover(first.handle);
 expect(recovered.filename).not.toBe(first.filename);expect(recovered.document.id).not.toBe(first.document.id);expect(await fs.readFile(first.filename,'utf8')).toBe('broken');
 });
 it('rejects malformed files, invalid geometry, unsafe images and unknown handles',async()=>{
 expect(()=>validateDocument({...createBoard(),version:99})).toThrow('unsupported');
 const doc=createBoard();doc.camera.zoom=Infinity;expect(()=>validateDocument(doc)).toThrow('camera');
 const unsafe=createBoard();unsafe.scene.files={x:{id:'x',mimeType:'image/png',dataURL:'https://example.com/x.png'}};expect(()=>validateDocument(unsafe)).toThrow();
 await expect(store.open('/etc/passwd')).rejects.toMatchObject({code:'HANDLE'});
 });
 it('duplicates with distinct identity and first-save unique filenames',async()=>{
 const first=await store.save(null,createBoard());const copy=await store.duplicate(first.document);expect(copy.document.id).not.toBe(first.document.id);expect(copy.filename).not.toBe(first.filename);expect((await store.library()).boards).toHaveLength(2);
 });
 it('bumps updatedAt on every successful save while keeping createdAt',async()=>{
 const first=await store.save(null,createBoard());
 const created=first.document.createdAt;
 await new Promise(r=>setTimeout(r,8));
 const second=await store.save(first.handle,{...first.document,title:'Later'});
 expect(second.document.createdAt).toBe(created);
 expect(Date.parse(second.document.updatedAt)).toBeGreaterThan(Date.parse(first.document.updatedAt));
 });
 it('renames board title and file within the boards folder',async()=>{
 const first=await store.save(null,{...createBoard(),title:'Morning ideas'});
 const renamed=await store.rename(first.handle,'Evening board');
 expect(renamed.document.title).toBe('Evening board');
 expect(renamed.filename).not.toBe(first.filename);
 expect(renamed.filename.endsWith('.lkmindmap')).toBe(true);
 expect(renamed.filename.includes('Evening board')).toBe(true);
 expect(path.resolve(renamed.filename).startsWith(path.resolve(folder)+path.sep)).toBe(true);
 await expect(fs.access(first.filename)).rejects.toMatchObject({code:'ENOENT'});
 expect((await store.open(renamed.handle)).document.title).toBe('Evening board');
 });
 it('refuses rename collisions without overwriting the other board',async()=>{
 const a=await store.save(null,{...createBoard(),title:'Keep'});
 const b=await store.save(null,{...createBoard(),title:'Move'});
 const conflictPath=path.join(folder,`Taken-${b.document.id.slice(0,8)}.lkmindmap`);
 await fs.copyFile(a.filename,conflictPath);
 await expect(store.rename(b.handle,'Taken')).rejects.toMatchObject({code:'CONFLICT'});
 expect(await fs.readFile(b.filename,'utf8')).toContain('Move');
 expect(JSON.parse(await fs.readFile(conflictPath,'utf8')).title).toBe('Keep');
 });
});
