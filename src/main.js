const { app, BrowserWindow, Menu, ipcMain } = require('electron');
const path = require('node:path');

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) {
  app.quit();
}

const menuTemplate = [
  {
    label: '文件',
    submenu: [
      { label: '退出', accelerator: 'CmdOrCtrl+Q', click: () => {app.quit()} }
    ]
  },
  {
    label: '帮助',
    submenu: [
      // { label: '关于', click: () => app.showAboutPanel()},
      { label: '关于', click: () => openAboutWindow()},
      { type: 'separator' },
      { label: '检查更新', click: () => {console.log('检查更新')} },
    ]
  }
];

const customMenu = Menu.buildFromTemplate(menuTemplate);
// 应用到整个应用（所有窗口共享）
// Menu.setApplicationMenu(customMenu);

const createWindow = () => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    // 去掉边框和标题栏
    // frame: false, 
    // titleBarStyle: 'hidden',
    webPreferences: {
      // 启用 Node.js 集成（允许渲染进程使用 Node API）
      nodeIntegration: false,
      // 启用上下文隔离
      contextIsolation: true,
      preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY,
    },
  });
  mainWindow.setMenu(customMenu);
  // and load the index.html of the app.
  mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);

  // Open the DevTools.
  // mainWindow.webContents.openDevTools();
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  app.setAboutPanelOptions({
    applicationName: "Electron Vue", // 应用名称
    applicationVersion: "v1.0.0", // 应用版本
    copyright: "© 2025 linxu.com", // 版权信息
    iconPath: path.join(__dirname, 'assets', 'icons', 'pig@64.png'), // 应用图标
    version: "", // 覆盖默认的 Electron 版本显示
    authors: ["linxu"],
    website: "http://www.linxu.com"
  });
  createWindow();

  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
function openAboutWindow() {
  // __dirname（指向主进程文件在asar的目录:.webpack/main）
  // app.getAppPath()（指向asar根目录）
  const aboutPath = path.join(__dirname, 'html', 'about.html');
  const aboutWindow = new BrowserWindow({
    width: 300,
    height: 200,
    title: "关于",
    resizable: false,
    // webPreferences: { contextIsolation: false, nodeIntegration: true }
  });
  // aboutWindow.webContents.openDevTools();
  aboutWindow.setMenu(Menu.buildFromTemplate([])); // 空菜单
  aboutWindow.loadFile(aboutPath);
}

// 共享数据（主进程全局变量）
let appState = {
  version: 1,
};

// 监听渲染进程的数据请求
ipcMain.handle('app-state-load', () => {
  return appState; // 返回当前共享数据
});

// 监听渲染进程的数据更新
ipcMain.on('app-state-update', (event, newData) => {
  // 更新主进程数据
  let state = { ...appState, ...newData };
  // 广播给所有渲染进程（关键：同步多窗口）
  BrowserWindow.getAllWindows().forEach(window => {
    window.webContents.send('app-state-updated', state);
  });
});