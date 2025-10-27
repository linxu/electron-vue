// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts

const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronStore', {
  // 获取共享数据
  getState: () => ipcRenderer.invoke('app-state-load'),
  // 更新共享数据
  updateState: (data) => ipcRenderer.send('app-state-update', data),
  // 监听数据更新
  onStateUpdated: (callback) => {
    ipcRenderer.on('app-state-updated', (event, state) => callback(state));
  }
});
