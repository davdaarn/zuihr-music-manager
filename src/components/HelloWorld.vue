<template>
  <div>
    <v-btn outlined v-on:click="getPath">Test</v-btn>
    <v-btn outlined v-on:click="back">Back</v-btn>
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
    <div v-for="(d, i) in directories" :key="i" v-on:click="navigate(d)">
      <v-icon>mdi-folder-text-outline</v-icon>
      <!-- {{ d.mountpoints[0].path }} -->
      {{ d }}
    </div>
  </div>
</template>

<script>
const fs = require('fs');
const path = require('path');
const os = require('os');
const ipc = require('electron').ipcRenderer;

// const drivelist = require('drivelist');

export default {
  data() {
    return {
      homedir: '',
      directories: [],
      isLoading: false,
      currentDir: '/'
    };
  },
  methods: {
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
    async navigate(dir) {
      // console.log(dir);
      this.currentDir = dir;
      this.directories = [];
      let paths = fs.readdirSync(dir);
      paths.forEach(p => {
        try {
          p = path.join(dir, p);
          const stat = fs.statSync(p);
          this.directories.push(p);
        } catch (error) {}
      });
    },
    async back() {
      console.log(this.currentDir);
      let temp = this.currentDir.split('\\');
      console.log(temp);
      if (temp.length > 1) {
        temp.splice(-1, 1);
        this.navigate(temp.join('\\'));
      } else {
        console.log(temp[0] == '\\');
        if (temp[0] === '\\') {
          console.log('go home');
        } else {
          this.navigate(temp[0] + '\\');
        }
      }
    }
  },
  created() {
    this.$nextTick(() => {
      // ipc.on('drives', (e, m) => {
      //   console.log(e, m);
      //   this.directories = m;
      // });
      this.isLoading = true;
      ipc
        .invoke('findAllMountedDrives')
        .then(res => {
          // console.log(res);
          let temp = res.map(r => {
            return r.mountpoints[0].path;
          });
          this.directories = temp.sort();
        })
        .catch(console.log)
        .finally(x => {
          setTimeout(() => {
            this.isLoading = false;
          }, 5000);
        });
    });
  }
};
</script>

<style>
</style>
