<template>
  <div>
    <v-btn outlined v-on:click="playTest">Play</v-btn>
    <v-btn outlined v-on:click="stopTest">Stop</v-btn>
    <v-btn outlined v-on:click="directoryUp">Back</v-btn>
    <v-btn outlined v-on:click="logDir">Directory</v-btn>
    <div>
      <span>Directory: </span>
      <span v-if="currentDir.length > 0" @click="toRoot"> -> Home </span>
      <span v-for="(d, i) in currentDir" :key="d" v-on:click="getPath(i)">
        -> {{ d }}</span
      >
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
const ipc = require('electron').ipcRenderer;
import { DirectoryItem } from '../types';
import { Howler, Howl } from 'howler';

// const drivelist = require('drivelist');

export default {
  data() {
    return {
      homedir: '',
      directoryItems: [],
      isLoading: false,
      currentDir: [],
      song: null
    };
  },
  methods: {
    logDir() {
      console.log(this.currentDir);
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
        volume: 0.5
      });

      this.song.play();
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
          } else if (p.isFile()) {
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
    navigateTo(fullPath) {},
    async toRoot() {
      // ipc.on('drives', (e, m) => {
      //   console.log(e, m);
      //   this.directoryItems = m;
      // });
      this.isLoading = true;
      ipc
        .invoke('findAllMountedDrives')
        .then(res => {
          let temp = res
            .filter(x => !x.error)
            .map(r => {
              switch (r.busType) {
                case 'USB':
                  return new DirectoryItem({
                    path: r.mountpoints[0].path,
                    // type: getType(r),
                    type: r.busType,
                    icon: 'mdi-usb-port'
                  });
                case 'SATA':
                  return new DirectoryItem({
                    path: r.mountpoints[0].path,
                    // type: getType(r),
                    type: r.busType,
                    icon: 'mdi-harddisk'
                  });
                default:
                  return;
              }
            });
          this.directoryItems = temp.sort((a, b) => {
            if (a.path < b.path) {
              return -1;
            }
            if (a.path > b.path) {
              return 1;
            }
            return 0;
          });
        })
        .catch(console.log)
        .finally(x => {
          // setTimeout(() => {
          //   this.isLoading = false;
          // }, 5000);
          this.currentDir = [];
          this.isLoading = false;
        });
    }
  },
  created() {
    this.$nextTick(() => {
      this.toRoot();
    });
  }
};
</script>

<style>
</style>
