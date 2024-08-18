import {app, BrowserWindow, Menu, ipcMain, globalShortcut} from 'electron'
import {createRequire} from 'node:module'
import {fileURLToPath} from 'node:url'
import path from 'node:path'
import os from 'node:os'
const require = createRequire(import.meta.url)
const __dirname = path.dirname(fileURLToPath(import.meta.url))

// The built directory structure
//
// ├─┬ dist-electron
// │ ├─┬ main
// │ │ └── index.js    > Electron-Main
// │ └─┬ preload
// │   └── index.mjs   > Preload-Scripts
// ├─┬ dist
// │ └── index.html    > Electron-Renderer
//

export const APP_ROOT = path.join(__dirname, '../..')
export const MAIN_DIST = path.join(APP_ROOT, 'dist-electron')
export const RENDERER_DIST = path.join(APP_ROOT, 'dist')
export const VITE_DEV_SERVER_URL = process.env.VITE_DEV_SERVER_URL

process.env.APP_ROOT = APP_ROOT

process.env.VITE_PUBLIC = VITE_DEV_SERVER_URL ? path.join(APP_ROOT, 'public') : RENDERER_DIST

let mainWin: BrowserWindow | null = null
// let store = new Store<any>()

initApplication()

function initApplication() {

    // 设置没有原生菜单，后续自己自定义
    Menu.setApplicationMenu(null)

    // Disable GPU Acceleration for Windows 7
    if (os.release().startsWith('6.1')) app.disableHardwareAcceleration()

    // Set application name for Windows 10+ notifications
    if (process.platform === 'win32') app.setAppUserModelId(app.getName())

    if (!app.requestSingleInstanceLock()) {
        app.quit()
        process.exit(0)
    }

    app.on('window-all-closed', () => {
        mainWin = null
        if (process.platform !== 'darwin') app.quit()
    })

    app.on('second-instance', () => {
        if (mainWin) {
            // Focus on the main window if the user tried to open another
            if (mainWin.isMinimized()) mainWin.restore()
            mainWin.focus()
        }
    })

    app.on('activate', () => {
        const allWindows = BrowserWindow.getAllWindows()
        if (allWindows.length) {
            allWindows[0].focus()
        } else {
            createMainWin()
        }
    })

    app.whenReady().then(() => {
            createMainWin()
            initShortcut()
            initMainWinEvt()
        }
    )
}
function initShortcut() {
    // 设置全局快捷键
    globalShortcut.register('CommandOrControl+F12', () => {
        mainWin.webContents.toggleDevTools()
    })
}

function createMainWin() {
    const preload: string = path.join(__dirname, '../preload/index.mjs')
    const indexHtml: string = path.join(RENDERER_DIST, 'index.html')
    mainWin = new BrowserWindow({
        title: '自动任务平台',
        icon: path.join(process.env.VITE_PUBLIC, 'logo.ico'),
        width: 1024,
        height: 670,
        minWidth: 1024,
        minHeight: 670,
        frame: false,
        webPreferences: {
            preload,
        },
    })

    if (VITE_DEV_SERVER_URL) { // #298
        mainWin.loadURL(VITE_DEV_SERVER_URL)
        mainWin.webContents.openDevTools()
    } else {
        mainWin.loadFile(indexHtml)
    }

    // win.webContents.on('will-navigate', (event, url) => { }) #344
}

function initMainWinEvt() {
    // ipcMain.on("saveStore", (event, [name, data]) => {
    //     store.set(name, data)
    // })
    // ipcMain.handle('readStore',async (event, [name]) => {
    //     return await store.get(name)
    // })

    ipcMain.on('maximize', (event) => {
        if (mainWin.isMaximized()) {
            mainWin.unmaximize()
        } else {
            mainWin.maximize()
        }
    })
    ipcMain.on('minimize', (event) => {
        mainWin.minimize()
    })

    ipcMain.on('closeWin', (event) => {
        mainWin.close()
    })

    mainWin.on('maximize', function() {
        mainWin.webContents.send('updateMaxState', true)
    });

    mainWin.on('unmaximize', function() {
        mainWin.webContents.send('updateMaxState', false)
    });
}