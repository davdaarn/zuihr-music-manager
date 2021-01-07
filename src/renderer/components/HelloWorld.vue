<template>
  <div>
    <v-btn outlined v-on:click="playTest">Play</v-btn>
    <v-btn outlined v-on:click="stopTest">Stop</v-btn>
    <v-btn outlined v-on:click="directoryUp">Back</v-btn>
    <v-btn outlined v-on:click="logDir">Directory</v-btn>
    <div
      style="
        width: 200px;
        height: 200px;
        background-color: rgba(55, 55, 55, 0.2);
      "
      @dragenter.prevent
      @dragover.prevent
      v-on:drop.prevent="test"
    >
      Drop Songs here
    </div>
    <v-btn outlined v-on:click="test2">Test 2</v-btn>
    <v-btn outlined v-on:click="test3">Test 3</v-btn>
    <img v-if="dataURL" :src="dataURL" alt="Item Artwork" />
    <div>
      <span>Directory: </span>
      <span v-if="currentDir.length > 0" @click="toRoot">
        <v-chip>Home</v-chip>
      </span>
      <span v-for="(d, i) in currentDir" :key="d" v-on:click="getPath(i)">
        <span>
          <v-icon>mdi-chevron-right</v-icon>
        </span>
        <v-chip>{{ d }}</v-chip>
      </span>
    </div>
    <v-progress-linear
      :active="isLoading"
      :indeterminate="isLoading"
      top
      color="deep-purple accent-4"
    ></v-progress-linear>
    <div
      v-for="(d, i) in directoryItems"
      :key="i"
      v-on:click="handleOnDirectoryItemClick(d, i)"
      style="cursor: pointer"
    >
      <v-icon>{{ d.icon }}</v-icon>
      {{ d.path }}
    </div>
  </div>
</template>

<script>
const fs = require('fs');
const path = require('path');
const os = require('os');
// const ipc = require('electron').ipcRenderer;
const { ipcRenderer } = require('electron');
const mm = require('music-metadata');
const util = require('util');
import { DirectoryItem } from '../types';
const NodeID3Promise = require('node-id3').Promise;
// import { Howler, Howl } from 'howler';
import { Howler, Howl } from '../libs/howler';

// const drivelist = require('drivelist');

export default {
  data() {
    return {
      homedir: '',
      directoryItems: [],
      isLoading: false,
      currentDir: [],
      song: null,
      dataURL: null
    };
  },
  methods: {
    logDir() {
      // console.log(this.currentDir);
      this.currentDir = ['C:\\', 'Users', 'davda', 'OneDrive', 'Music'];
      const fullPath = this.currentDir.join('\\').replace('\\\\', '\\');
      this.updateDirectoryItems(fullPath);
    },
    test(e) {
      const paths = [];
      e.dataTransfer.files.forEach(element => {
        // console.log(element);
        paths.push(fs.readdirSync(element.path, { withFileTypes: true }));
        console.log(paths);
      });
    },
    test2() {
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

        child.stdout.on('data', function(data) {
          if (data) {
            let dataArray = JSON.parse(data.toString());
            console.log(dataArray);
            // win.webContents.send('test', dataArray);
          }
        });
        child.stderr.on('data', function(data) {
          // console.log("Powershell Errors: " + data);
        });
        child.on('exit', function() {
          console.log('Powershell Script finished');
        });
        child.stdin.end(); //end input
      }
    },
    test3() {
      console.log(this.$db);
      // this.$db.playlists.find({}, (err, docs) => {
      //   console.log(err, docs);
      // });
    },
    handleOnDirectoryItemClick(item, index) {
      if (item.type !== 'file') {
        this.directoryDown(item);
      } else {
        console.log(item);
        this.playNewSong(item.path);
      }
    },
    async playNewSong(path) {
      // console.log(path);
      const fullPath =
        this.currentDir.join('\\').replace('\\\\', '\\') + `\\${path}`;
      // console.log(fullPath);
      if (this.song) this.song.stop();
      this.song = await new Howl({
        src: [`safe-file-protocol://${fullPath}`],
        volume: 0.1,
        preload: true
      });

      // mm.parseFile(`safe-file-protocol://${fullPath}`)
      //   .then(metadata => {
      //     console.log(
      //       util.inspect(metadata, { showHidden: false, depth: null })
      //     );
      //   })
      //   .catch(err => {
      //     console.error(err.message);
      //   });

      NodeID3Promise.read(fullPath).then(metadata => {
        if (metadata.image) {
          let blob = new Blob([metadata.image.imageBuffer], {
            type: metadata.image.mime
          });
          let urlCreator = window.URL || window.webkitURL;
          let imageUrl = urlCreator.createObjectURL(blob);
          console.log(imageUrl);
          this.dataURL = imageUrl;
        }
      });

      // ipcRenderer.invoke('getMetaData', fullPath).then(metadata => {
      //   console.log(metadata);
      //   // if (metadata.picture && metadata.picture.length > 0) {
      //   //   let blob = new Blob([metadata.picture[0].data], {
      //   //     type: metadata.picture[0].format
      //   //   });
      //   //   let urlCreator = window.URL || window.webkitURL;
      //   //   let imageUrl = urlCreator.createObjectURL(blob);
      //   //   console.log(imageUrl);
      //   //   this.dataURL = imageUrl;
      //   // }
      //   if (metadata.image) {
      //     let blob = new Blob([metadata.image.imageBuffer], {
      //       type: metadata.image.mime
      //     });
      //     let urlCreator = window.URL || window.webkitURL;
      //     let imageUrl = urlCreator.createObjectURL(blob);
      //     console.log(imageUrl);
      //     this.dataURL = imageUrl;
      //   }

      //   // this.dataURL = `data:${metadata.format};base64,${metadata.data.toString(
      //   //   'base64'
      //   // )};`;
      //   // console.log(this.dataURL);
      //   // console.log(metadata);
      //   // var blob = new Blob();
      //   // console.log(util.inspect(metadata, { showHidden: false, depth: null }));
      // });

      // this.song.play();
    },
    async playTest() {
      if (this.song) this.song.play();
    },
    async stopTest() {
      if (this.song) this.song.stop();
    },
    async getPath(currentDirIndex) {
      this.currentDir = this.currentDir.slice(0, currentDirIndex + 1);
      const fullPath = this.currentDir.join('\\').replace('\\\\', '\\');
      console.log(fullPath);
      this.updateDirectoryItems(fullPath);
    },
    async updateDirectoryItems(fullPath) {
      this.directoryItems = [];
      let paths = fs.readdirSync(fullPath, { withFileTypes: true }); // returns array of dirnet
      // console.log(paths);
      paths.forEach(p => {
        // console.log(p);
        try {
          if (p.isDirectory() || p.isSymbolicLink()) {
            this.directoryItems.push(
              new DirectoryItem({
                path: p.name,
                // type: getType(r),
                type: 'system',
                icon: 'mdi-folder-text-outline'
              })
            );
          } else if (p.isFile() && RegExp('[.]mp3$').test(p.name)) {
            this.directoryItems.push(
              new DirectoryItem({
                path: p.name,
                // type: getType(r),
                type: 'file',
                icon: 'mdi-file-music-outline'
              })
            );
          }
        } catch (error) {
          console.log(error);
        }
      });
    },
    async directoryDown(nextDir) {
      // push nextDir to currentDir array
      this.currentDir.push(nextDir.path);
      // create full path from currentDir
      const fullPath = this.currentDir.join('\\').replace('\\\\', '\\');
      // readdirSync using full path
      // update current list of directoryItems
      this.updateDirectoryItems(fullPath);
    },
    async directoryUp() {
      // pop last element in currentDir
      if (this.currentDir.length > 1) {
        this.currentDir.pop(-1, 1);
        // create full path from currentDir
        const fullPath = this.currentDir.join('\\').replace('\\\\', '\\');
        // readdirSync using full path
        // update current list of directoryItems
        this.updateDirectoryItems(fullPath);
      } else {
        this.toRoot();
      }
    },
    // navigateTo(fullPath) {},
    async toRoot() {
      this.isLoading = true;

      ipcRenderer
        .invoke('findAllMountedDrives')
        .then(res => {})
        .catch(console.log)
        .finally(x => {
          this.currentDir = [];
          this.isLoading = false;
        });
    }
  },
  created() {
    console.log('created');
    // this.$nextTick(() => {
    ipcRenderer.on('test', (e, args) => {
      console.log('on test');
      console.log(args);
      let temp = args
        .filter(x => x.FileSystem)
        .map(r => {
          switch (r.DriveType) {
            case 2:
              return new DirectoryItem({
                path: `${r.DeviceID}\\`,
                // type: getType(r),
                type: r.DriveType,
                icon: 'mdi-usb-port'
              });
            case 3:
              return new DirectoryItem({
                path: `${r.DeviceID}\\`,
                // type: getType(r),
                type: r.DriveType,
                icon: 'mdi-harddisk'
              });
            default:
              return;
          }
        });
      this.directoryItems = temp;
      this.isLoading = false;
    });
    this.toRoot();
    // });
  }
};
</script>

<style>
</style>
