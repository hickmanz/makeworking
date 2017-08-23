// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.
const BrowserWindow = require('electron').remote.BrowserWindow
const path = require('path')

function progressWindow() {
    const modalPath = path.join( __dirname, './sections/progress.html')
    let win = new BrowserWindow({width: 400, height: 200, frame: false })
    win.on('close', function () { win = null })
    win.loadURL(modalPath)
    win.show()
}
