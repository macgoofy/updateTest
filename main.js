const {app, autoUpdater, BrowserWindow} = require('electron')
const path = require('path')
const url = require('url')

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let
    win;
var feedUrl;

function createWindow() {
    // Create the browser window.
    win = new BrowserWindow({width: 800, height: 600})

    // and load the index.html of the app.
    win.loadURL(url.format({
        pathname: path.join(__dirname, 'index.html'),
        protocol: 'file:',
        slashes: true
    }))

    // Open the DevTools.
    win.webContents.openDevTools()

    // Emitted when the window is closed.
    win.on('closed', () => {
        // Dereference the window object, usually you would store windows
        // in an array if your app supports multi windows, this is the time
        // when you should delete the corresponding element.
        win = null
    })

    feedURL = "http://localhost:8080/electron-updateserver/ws/updates/resourceMAC/ixconnectApp/BETA/MAC/1.0.1/4/8F6E-5901-ADD6-27F5-6986-5849-19CA-69BE-561A-B294-CB19-DF97-F21D-AC6C-86CE-76C7/goofy/MAC_JSON"
    console.info("Update-URL-Anfrage feedURL=" + feedURL);
    autoUpdater.setFeedURL(feedURL);
    autoUpdater.addListener("update-downloaded", function (event, releaseNotes, releaseName, releaseDate, updateURL) {
        console.info("update-downloaded");
            autoUpdater.quitAndInstall();
    });
    autoUpdater.addListener("error", function (error) {
        console.error("error: " + error);
    });

    autoUpdater.addListener("checking-for-update", function () {
        console.info("pruefe die Updates");
    });
    autoUpdater.addListener("update-available", function () {
        console.info("update vorhanden");
    });
    autoUpdater.addListener("update-not-available", function () {
        console.info("Kein Update vorhanden!");
    });
    autoUpdater.addListener("download-progress", function (progressInfo, bytesPerSecond, percent, total, transferred) {
        console.info("Update wird herunter geladen: " + bytesPerSecond + " b/sec; " + percent + " pct (" + transferred + " von " + total + ")");
    });

    autoUpdater.checkForUpdates();
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', () => {
    // On macOS it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('activate', () => {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (win === null) {
        createWindow()
    }
})


// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
