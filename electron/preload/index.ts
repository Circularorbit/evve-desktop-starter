import { ipcRenderer, contextBridge } from 'electron'

// --------- Expose some API to the Renderer process ---------

contextBridge.exposeInMainWorld('electronAPI', {
    closeWin: () => ipcRenderer.send('closeWin'),
    minimize: () => ipcRenderer.send('minimize'),
    maximize: () => ipcRenderer.send('maximize'),
    updateMaxState: (callback) => ipcRenderer.on('updateMaxState', (event, value) => {callback(value)})
})