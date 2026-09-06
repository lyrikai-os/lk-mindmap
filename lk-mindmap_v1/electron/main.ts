import { app, BrowserWindow, dialog, ipcMain, Menu, shell } from 'electron';
import path from 'node:path';
import os from 'node:os';
import { fileURLToPath } from 'node:url';
import { promises as fs } from 'node:fs';
import { BoardStorage, BoardError } from './storage';
const here=path.dirname(fileURLToPath(import.meta.url));
if(process.env.LYRIKAI_USER_DATA) app.setPath('userData',process.env.LYRIKAI_USER_DATA);
app.setName('LYRIKAI board');
let win:BrowserWindow, storage:BoardStorage, dirty=false, permittedClose=false, ready=false;
const pending:string[]=[];
function send(action:string) { if(ready && win && !win.isDestroyed()) win.webContents.send('board:menu',action);else pending.push(action); }
app.on('open-file',(event,file)=>{event.preventDefault(); if(storage) send('open:'+storage.register(file));else pending.push('file:'+file);});
if(!app.requestSingleInstanceLock()) app.quit();
else {
app.on('second-instance',(_e,args)=>{for(const file of args.filter(a=>a.endsWith('.lkmindmap'))) send('open:'+storage.register(file));win?.show();win?.focus();});
app.whenReady().then(async()=>{
  const config=path.join(app.getPath('userData'),'board-settings.json');
  let folder=process.env.LYRIKAI_BOARD_HOME||path.join(os.homedir(),'lyrikai','lk-labs','lk-mindmap','boards');
  if(!process.env.LYRIKAI_BOARD_HOME) try {const data=JSON.parse(await fs.readFile(config,'utf8'));if(typeof data.folder==='string'&&path.isAbsolute(data.folder))folder=data.folder;} catch {}
  storage=new BoardStorage(folder);
  const wrap=(fn:(...args:any[])=>any)=>async(event:Electron.IpcMainInvokeEvent,...args:any[])=>{
    if(event.sender!==win?.webContents || event.senderFrame!==win.webContents.mainFrame) return {ok:false,error:'Unauthorized frame.'};
    try{return {ok:true,value:await fn(...args)};}catch(e){return {ok:false,error:(e as Error).message,code:(e as BoardError).code,canRecover:(e as BoardError).canRecover};}
  };
  ipcMain.handle('board:library',wrap(()=>storage.library()));
  ipcMain.handle('board:open',wrap(async(handle?:string)=>{
    if(handle!==undefined) return storage.open(handle);
    const result=await dialog.showOpenDialog(win,{title:'Open LYRIKAI board',properties:['openFile'],filters:[{name:'LYRIKAI board',extensions:['lkmindmap']}]});
    return result.canceled?null:storage.open(storage.register(result.filePaths[0]));
  }));
  ipcMain.handle('board:save',wrap((handle,document)=>storage.save(handle,document)));
  ipcMain.handle('board:saveAs',wrap(async(document)=>{
    const result=await dialog.showSaveDialog(win,{title:'Save LYRIKAI board as',defaultPath:path.join(storage.folder,document.title.replace(/[/\\]/g,'-')+'.lkmindmap'),filters:[{name:'LYRIKAI board',extensions:['lkmindmap']}]});
    if(result.canceled||!result.filePath)return null;
    return storage.saveAt(result.filePath.endsWith('.lkmindmap')?result.filePath:result.filePath+'.lkmindmap',document);
  }));
  ipcMain.handle('board:duplicate',wrap(document=>storage.duplicate(document)));
  ipcMain.handle('board:rename',wrap((handle,title)=>storage.rename(handle,title)));
  ipcMain.handle('board:recover',wrap(handle=>storage.recover(handle)));
  ipcMain.handle('board:chooseFolder',wrap(async()=>{
    const result=await dialog.showOpenDialog(win,{title:'Choose boards folder',defaultPath:storage.folder,properties:['openDirectory','createDirectory']});
    if(result.canceled)return null;
    const selected=result.filePaths[0];await fs.mkdir(path.dirname(config),{recursive:true});
    await fs.writeFile(config+'.tmp',JSON.stringify({folder:selected}));await fs.rename(config+'.tmp',config);storage.folder=selected;return selected;
  }));
  ipcMain.handle('board:reveal',wrap(async(handle?:string)=>{if(handle) shell.showItemInFolder(storage.filename(handle));else {await fs.mkdir(storage.folder,{recursive:true});const err=await shell.openPath(storage.folder);if(err)throw new Error(err);}return null;}));
  ipcMain.on('board:dirty',(event,value)=>{if(event.sender===win?.webContents && event.senderFrame===win.webContents.mainFrame && typeof value==='boolean'){dirty=value;win.setDocumentEdited(value);}});
  ipcMain.on('board:closeReady',event=>{if(event.sender===win?.webContents && event.senderFrame===win.webContents.mainFrame){permittedClose=true;win.close();}});
  ipcMain.on('board:listening',event=>{if(event.sender!==win?.webContents)return;ready=true;for(const action of pending.splice(0))send(action.startsWith('file:')?'open:'+storage.register(action.slice(5)):action);});
  Menu.setApplicationMenu(Menu.buildFromTemplate([
    {label:'LYRIKAI board',submenu:[{role:'about'},{type:'separator'},{role:'hide'},{role:'hideOthers'},{role:'unhide'},{type:'separator'},{label:'Quit LYRIKAI board',accelerator:'CmdOrCtrl+Q',click:()=>win.close()}]},
    {label:'File',submenu:[{label:'New board',accelerator:'CmdOrCtrl+N',click:()=>send('new')},{label:'Open…',accelerator:'CmdOrCtrl+O',click:()=>send('open')},{label:'Save',accelerator:'CmdOrCtrl+S',click:()=>send('save')},{label:'Save As…',accelerator:'CmdOrCtrl+Shift+S',click:()=>send('save-as')},{type:'separator'},{role:'close'}]},
    {label:'Edit',submenu:[{role:'undo'},{role:'redo'},{type:'separator'},{role:'cut'},{role:'copy'},{role:'paste'},{role:'selectAll'}]},
    {label:'Window',submenu:[{role:'minimize'},{role:'zoom'},{role:'front'}]}
  ]));
  win=new BrowserWindow({width:1440,height:960,minWidth:900,minHeight:650,title:'LYRIKAI board',backgroundColor:'#f6f7f9',webPreferences:{preload:path.join(here,'preload.cjs'),contextIsolation:true,nodeIntegration:false,sandbox:true,webSecurity:true}});
  win.webContents.setWindowOpenHandler(()=>({action:'deny'}));
  win.webContents.on('will-navigate',event=>event.preventDefault());
  win.on('close',event=>{if(!permittedClose&&dirty){event.preventDefault();win.webContents.send('board:close');}});
  win.webContents.on('render-process-gone',async()=>{if(dirty) await dialog.showMessageBox(win,{type:'error',message:'The editor stopped unexpectedly. Your most recent saved board remains on disk.',detail:'Unsaved edits may not have reached the board file. Reopen LYRIKAI board to load the last save.'});});
  if(process.env.VITE_DEV_SERVER_URL) await win.loadURL(process.env.VITE_DEV_SERVER_URL);else await win.loadFile(path.join(here,'../dist/index.html'));
  for(const file of process.argv.filter(a=>a.endsWith('.lkmindmap')))send('open:'+storage.register(file));
});
app.on('window-all-closed',()=>app.quit());
app.on('before-quit',event=>{if(dirty&&!permittedClose&&win&&!win.isDestroyed()){event.preventDefault();win.webContents.send('board:close');}});
}
