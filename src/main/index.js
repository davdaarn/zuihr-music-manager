'use strict'

import {
  app,
  protocol,
  BrowserWindow,
  WebContents
} from 'electron';

import {
  createProtocol
} from 'vue-cli-plugin-electron-builder/lib';

import installExtension, {
  VUEJS_DEVTOOLS
} from 'electron-devtools-installer';



const isDevelopment = process.env.NODE_ENV !== 'production';
const drivelist = require('drivelist');
const electron = require('electron');
const mm = require('music-metadata');
const util = require('util');
const NodeID3 = require('node-id3');
const NodeID3Promise = require('node-id3').Promise;
const chalk = require('chalk');
const {
  ipcMain,
  webContents
} = require('electron');
const ipc = electron.ipcMain;
const DataStore = require('nedb');

ipcMain.handle('getPathToAppData', async (event, args) => {
  return app.getPath('appData');
})

ipcMain.handle('findAllMountedDrives', async (event, args) => {
  console.log(process.platform);
  if (process.platform === 'win32') {

    const spawn = require("child_process").spawn;
    const child = spawn("powershell.exe", [
      // `Write-Host "Drive information for $env:ComputerName"
      `Get-WmiObject -Class Win32_LogicalDisk |
        Where-Object {$_.DriveType -ne 5} |
        Sort-Object -Property Name | 
        Select-Object Name, VolumeName, FileSystem, Description, VolumeDirty, MediaType, DeviceID, DriveType, \`
          @{"Label"="DiskSize(GB)";"Expression"={"{0:N}" -f ($_.Size/1GB) -as [float]}}, \`
          @{"Label"="FreeSpace(GB)";"Expression"={"{0:N}" -f ($_.FreeSpace/1GB) -as [float]}}, \`
          @{"Label"="%Free";"Expression"={"{0:N}" -f ($_.FreeSpace/$_.Size*100) -as [float]}} |
        ConvertTo-Json`
    ]);

    child.stdout.on("data", function (data) {

      if (data) {
        let dataArray = JSON.parse(data.toString());
        // console.log(dataArray);
        win.webContents.send('test', dataArray);

      }
    });
    child.stderr.on("data", function (data) {
      // console.log("Powershell Errors: " + data);
    });
    child.on("exit", function () {
      console.log("Powershell Script finished");
    });
    child.stdin.end(); //end input
  }


  //////////////
  // const drives = await drivelist.list();
  // return drives;
  //////////////
  // win.webContents.send('drives', drives);
  // drives.forEach(drive => {
  //   drive.mountpoints.forEach(mount => {
  //     console.log(mount.path);
  //   })
  // })
})

ipcMain.handle('getMetaData', async (event, args) => {
  console.log(chalk.green(args));

  const success = true;
  // const success = await NodeID3.update({
  //   comment: {
  //     language: 'eng',
  //     text: 'TEST',
  //   },
  //   popularimeter: {
  //     rating: 192, // 1-255
  //   },
  // }, args);

  let data;
  console.log(chalk.green(success));
  if (success === true) {

    await NodeID3Promise.read(args).then(x => {
      // console.log(chalk.cyan('here'), util.inspect(x, {
      //   showHidden: false,
      //   depth: null
      // }));
      data = x;
    })

  }

  return data;

  // let data = await mm.parseFile(args);
  // console.log(chalk.blue('data'), util.inspect(data, {
  //   showHidden: false,
  //   depth: null
  // }));
  // return data.common;
})



let win = null;

// Scheme must be registered before the app is ready
protocol.registerSchemesAsPrivileged([{
  scheme: 'app',
  privileges: {
    secure: true,
    standard: true
  }
}])

async function createWindow() {
  // Create the browser window.
  win = new BrowserWindow({
    width: 1280,
    height: 720,
    minWidth: 1280,
    minHeight: 720,
    webPreferences: {
      // Use pluginOptions.nodeIntegration, leave this alone
      // See nklayman.github.io/vue-cli-plugin-electron-builder/guide/security.html#node-integration for more info
      // nodeIntegration: process.env.ELECTRON_NODE_INTEGRATION
      nodeIntegration: true,
      // enableRemoteModule: true,
      // webSecurity: false,
    }
  })

  if (process.env.WEBPACK_DEV_SERVER_URL) {
    // Load the url of the dev server if in development mode
    await win.loadURL(process.env.WEBPACK_DEV_SERVER_URL)
    if (!process.env.IS_TEST) {
      win.webContents.openDevTools()
    }
  } else {
    createProtocol('app')
    // Load the index.html when not in development
    win.loadURL('app://./index.html')
  }

}

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
  if (BrowserWindow.getAllWindows().length === 0) createWindow()
})

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', async () => {
  // const appData = app.getPath('appData');
  // const db = {};
  // db.playlists = new DataStore({
  //   filename: `${appData}/playlister/db/playlists.db`,
  //   autoload: true
  // });
  // db.songs = new DataStore({
  //   filename: `${appData}/playlister/db/songs.db`,
  //   autoload: true
  // });

  if (isDevelopment && !process.env.IS_TEST) {
    // Install Vue Devtools
    try {
      await installExtension(VUEJS_DEVTOOLS)
    } catch (e) {
      console.error('Vue Devtools failed to install:', e.toString())
    }
  }

  const protocolName = 'safe-file-protocol'

  protocol.registerFileProtocol(protocolName, (request, callback) => {
    const url = request.url.replace(`${protocolName}://`, '')
    try {
      return callback(decodeURIComponent(url))
    } catch (error) {
      // Handle the error as needed
      console.error(error)
    }
  })

  createWindow()
})

// Exit cleanly on request from parent process in development mode.
if (isDevelopment) {
  if (process.platform === 'win32') {
    process.on('message', (data) => {
      if (data === 'graceful-exit') {
        app.quit()
      }
    })
  } else {
    process.on('SIGTERM', () => {
      app.quit()
    })
  }
}
