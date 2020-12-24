<template>
  <div>
    <v-btn outlined v-on:click="getPath">Test</v-btn>
    <v-btn outlined v-on:click="directoryUp">Back</v-btn>
    <v-btn outlined v-on:click="logDir">Directory</v-btn>
    <div>
      <span>Directory: </span>
      <span>{{ homedir }}</span>
      <!-- <div v-if="isLoading">
        <v-progress-circular
          indeterminate
          color="primary"
        ></v-progress-circular>
      </div> -->
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
      v-on:click="d.type !== 'file' ? directoryDown(d) : null"
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

// const drivelist = require('drivelist');

export default {
  data() {
    return {
      homedir: '',
      directoryItems: [],
      isLoading: false,
      currentDir: []
    };
  },
  methods: {
    logDir() {
      console.log(this.currentDir);
    },
    async getPath() {
      this.homedir = os.homedir();

      // let file = `${this.homedir}/test.txt`;
      // console.log(file);

      let dir = 'C:/';
      // const homeNames = fs.readdirSync(this.homedir);
      let homeNames = fs.readdirSync(dir);
      // console.log(homeNames);
      homeNames = homeNames.filter(item => !/(^|\/)\.[^\/\.]/g.test(item));
      // console.log(homeNames);
      homeNames.forEach(file => {
        try {
          const filePath = path.join(dir, file);
          const stat = fs.statSync(filePath);
          // console.log(stat.isDirectory(), file);
          // if (stat.isFile()) {
          //   console.log('The is a File ' + file);
          if (stat.isDirectory()) {
            // console.log(file);
          }
        } catch (err) {
          console.log('err');
        }
      });
      // console.log(homeNames);

      // const drives = await drivelist.list();
      // console.log(drives);
    },
    // async navigate(dir, back = false) {
    //   // console.log(dir);
    //   // console.log(this.currentDir);

    //   if (!back && dir !== '' && dir) {
    //     this.currentDir += `${dir.path}\\`;
    //   } else {
    //     this.currentDir = dir;
    //   }
    //   console.log(this.currentDir);
    //   this.directoryItems = [];
    //   let paths = fs.readdirSync(this.currentDir, { withFileTypes: true }); // returns array of dirnet
    //   // console.log(paths);
    //   paths.forEach(p => {
    //     // console.log(p.isDirectory());
    //     try {
    //       if (p.isDirectory()) {
    //         this.directoryItems.push(
    //           new DirectoryItem({
    //             path: p.name,
    //             // type: getType(r),
    //             type: 'system',
    //             icon: 'mdi-folder-text-outline'
    //           })
    //         );
    //       } else if (p.isFile()) {
    //         this.directoryItems.push(
    //           new DirectoryItem({
    //             path: p.name,
    //             // type: getType(r),
    //             type: 'file',
    //             icon: 'mdi-file-music-outline'
    //           })
    //         );
    //       }
    //     } catch (error) {
    //       console.log(error);
    //     }
    //   });
    // },

    async updateDirectoryItems(fullPath) {
      this.directoryItems = [];
      let paths = fs.readdirSync(fullPath, { withFileTypes: true }); // returns array of dirnet
      // console.log(paths);
      paths.forEach(p => {
        // console.log(p.isDirectory());
        try {
          console.log(p);
          if (p.isDirectory()) {
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
    // navigateTo(fullPath)
    async toRoot() {
      // ipc.on('drives', (e, m) => {
      //   console.log(e, m);
      //   this.directoryItems = m;
      // });
      this.isLoading = true;
      ipc
        .invoke('findAllMountedDrives')
        .then(res => {
          console.log(res);
          let temp = res
            .filter(x => !x.error)
            .map(r => {
              console.log(!r.error);
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
          console.log(temp);
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
