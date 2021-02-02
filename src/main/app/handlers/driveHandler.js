import {
  ipcMain,
  webContents
} from 'electron';
import {
  mainAppWindow
} from '../../shared/mainAppWindow';

ipcMain.handle('findAllMountedDrives', async (event, args) => {
  console.log(process.platform);
  if (process.platform === 'win32') {

    const spawn = require('child_process').spawn;
    const child = spawn('powershell.exe', [
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

    const win = mainAppWindow.getInstance();

    child.stdout.on('data', function (data) {
      // todo: json error happens here
      if (data) {
        let dataArray = JSON.parse(data.toString());
        // console.log(dataArray);
        win.webContents.send('test', dataArray);

      }
    });
    child.stderr.on('data', function (data) {
      // console.log("Powershell Errors: " + data);
    });
    child.on('exit', function () {
      console.log('Powershell Script finished');
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
