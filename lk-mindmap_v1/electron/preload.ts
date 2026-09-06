import { contextBridge, ipcRenderer } from 'electron';
import type { BoardBridge } from '../src/contract';
const subscribe=(channel:string,callback:(...args:any[])=>void)=>{const handler=(_event:any,...args:any[])=>callback(...args);ipcRenderer.on(channel,handler);return ()=>ipcRenderer.removeListener(channel,handler);};
const bridge:BoardBridge={
 library:()=>ipcRenderer.invoke('board:library'),open:handle=>ipcRenderer.invoke('board:open',handle),
 save:(handle,document)=>ipcRenderer.invoke('board:save',handle,document),saveAs:document=>ipcRenderer.invoke('board:saveAs',document),
 duplicate:document=>ipcRenderer.invoke('board:duplicate',document),rename:(handle,title)=>ipcRenderer.invoke('board:rename',handle,title),recover:handle=>ipcRenderer.invoke('board:recover',handle),
 chooseFolder:()=>ipcRenderer.invoke('board:chooseFolder'),reveal:handle=>ipcRenderer.invoke('board:reveal',handle),
 setDirty:dirty=>ipcRenderer.send('board:dirty',dirty),closeReady:()=>ipcRenderer.send('board:closeReady'),
 onClose:callback=>subscribe('board:close',callback),onMenu:callback=>{const dispose=subscribe('board:menu',callback);ipcRenderer.send('board:listening');return dispose;}
};
contextBridge.exposeInMainWorld('board',bridge);
