<template>
  <div class="flex flex-col h-full">
    <div class="h-20 flex-grow pl-2">
      <div class="h-full overflow-auto">
        <div class="h-24"></div>
        <!-- put router here... -->
        <v-btn outlined v-on:click="playTest">Play</v-btn>
        <v-btn outlined v-on:click="stopTest">Stop</v-btn>
        <v-btn outlined v-on:click="directoryUp">Back</v-btn>
        <v-btn outlined v-on:click="logDir">Directory</v-btn>
        <div
          class="w-1/3 h-1/3"
          @dragenter.prevent
          @dragover.prevent
          v-on:drop.prevent="testWalk"
        >
          Drop Songs here
        </div>
        <p id="p1" draggable="true">This element is draggable.</p>
        <div>
          <p>{{ pathCount }} songs discovered</p>
          <p>Processing song # {{ songIndex }}</p>
          <p>
            New songs added: {{ songsAdded }}, Songs already in library:
            {{ existingSongs }}
          </p>
          <v-progress-linear
            v-model="progress"
            striped
            stream
            color="green"
            height="25"
          >
            <strong>{{ Math.ceil(progress) }}%</strong>
          </v-progress-linear>
        </div>
        <!-- <v-btn outlined v-on:click="testWalk">Test Walk</v-btn> -->
        <v-btn outlined v-on:click="$store.dispatch('findSongs')"
          >Test Worker</v-btn
        >
        <v-btn outlined v-on:click="test3">Test 3</v-btn>
        <img v-if="dataURL" :src="dataURL" alt="Item Artwork" />
        <img v-if="dataURL" :src="dataURL" alt="Item Artwork" />
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
          :active="isSearching"
          :indeterminate="isSearching"
          top
          color="deep-purple accent-4"
        ></v-progress-linear>
        <div
          v-for="(d, i) in directoryItems"
          :key="i"
          v-on:click="handleOnDirectoryItemClick(d, i)"
          style="cursor: pointer"
          draggable="true"
          v-bind:id="d.path"
          v-on:dragstart="updateTarget"
        >
          <v-icon>{{ d.icon }}</v-icon>
          {{ d.path }}
        </div>
      </div>
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
import { DirectoryItem, SongContainer } from '../types';
const NodeID3Promise = require('node-id3').Promise;
// import { Howler, Howl } from 'howler';
import { Howler, Howl } from '../libs/howler';
import { Song } from '../types';

import { mapState, mapGetters } from 'vuex';

// const sharp = require('sharp');

// const drivelist = require('drivelist');

export default {
  data() {
    return {
      homedir: '',
      directoryItems: [],
      isLoading: false,
      currentDir: [],
      song: null,
      dataURL: null,
      pathCount: 0,
      songIndex: 0,
      songsAdded: 0,
      existingSongs: 0
    };
  },
  computed: {
    progress: function() {
      return (this.songIndex / this.pathCount) * 100;
    },
    isSearching() {
      return this.$store.state.isSearching;
    }
  },
  methods: {
    logDir() {
      // console.log(this.currentDir);
      this.currentDir = ['C:/', 'Users', 'davda', 'OneDrive', 'Music'];
      const fullPath = this.currentDir.join('/').replace('//', '/');
      this.updateDirectoryItems(fullPath);
    },
    renderImage(data, format) {
      let blob = new Blob([data.buffer], {
        type: metadata.image.mime
      });
      let urlCreator = window.URL || window.webkitURL;
      return urlCreator.createObjectURL(blob);
    },
    // used for drag and drop
    updateTarget(e) {
      console.log(e);
      e.dataTransfer.setData('Text', e.target.id);
    },
    // using
    testWalk(e) {
      // Todo: handle drag from computer or from app
      // let data = e.dataTransfer.getData('Text');
      // let fullPath = '';
      // console.log(this.currentDir);
      // if (this.currentDir.length > 0) {
      //   fullPath = this.currentDir.join('/').replace('//', '/') + '/';
      // }
      // fullPath += data;
      // console.log(fullPath);
      // ipcRenderer
      //   .invoke('findSongs', e)
      //   .then()
      //   .catch()
      //   .finally();

      let paths = [];
      e.dataTransfer.files.forEach(file => {
        paths.push(file.path);
      });

      this.$store.dispatch('findSongs', paths).then(x => {
        console.log(x);
      });

      /**
       * todo: if possible check if song exists before parsing file
       * db querries probably faster than a file read
       * this might imporve performance when processing lots of songs
       */
      const createSong = index => {
        this.songIndex = index;
        if (index <= paths.length - 1) {
          const p = paths[index];
          (async () => {
            try {
              // const metadata = await mm.parseFile(p, { skipCovers: false });
              // const { common, format } = metadata;
              // const cover = mm.selectCover(common.picture);

              // console.log(
              //   util.inspect(metadata, { showHidden: true, depth: null })
              // );

              // console.log(
              //   util.inspect(cover, { showHidden: true, depth: null })
              // );
              console.log(p);
              const song = await ipcRenderer.invoke('compressImage', p);

              console.log(song);
              // return;

              // // Todo: use more appropreate default values
              // const album = common.album ? common.album : '';
              // const artist = common.artist ? common.artist : '';
              // const diskNumber = common.disk ? common.disk : '';
              // const genre = common.genre ? common.genre : '';
              // // format, // to be determined
              // // image, // Too large, maybe create a thumbnail...
              // const length = format.duration ? format.duration : '';
              // const path = p;
              // const rating = 0;
              // const tags = [];
              // // Todo: if title is bad, use path to get title
              // const title = common.title ? common.title : '';
              // const trackNumber = common.track ? common.track : '';
              // const year = common.year ? common.year : '';

              // // Todo: better id generation
              // const uid = `${title}${album}${artist}`;

              // const song = new Song({
              //   id: uid,
              //   album,
              //   artist,
              //   genre,
              //   path,
              //   length,
              //   rating,
              //   tags,
              //   thumbnail: {
              //     format: cover.format,
              //     data: image
              //   },
              //   title,
              //   trackNumber,
              //   year
              // });

              const uid = song.id;

              // console.log(item);
              // todo: make function // processNewSong(song);
              this.$db.songs.find({ _id: uid }, (err, docs) => {
                if (err) {
                  console.warn(err.message);
                } else if (docs.length > 1) {
                  console.error("Entities should have unique id's"); // This should never happen
                } else if (docs.length === 1) {
                  const exists = docs[0].songs.some(x => x.path === song.path); // check for existing file path
                  if (!exists) {
                    // update doc
                    this.$db.songs.update(
                      { _id: uid },
                      { $push: { songs: song } },
                      (err, numEffected, param3, param4) => {
                        if (err) {
                          console.error(err);
                        } else if (numEffected === 0 || numEffected > 1) {
                          console.error('Error updating document'); // Somthing when wrong
                        } else {
                          this.existingSongs++;
                        }
                      }
                    );
                  } else {
                    console.warn('song already in library');
                  }
                } else {
                  // insert new doc
                  const songContainer = new SongContainer({
                    _id: uid,
                    songs: [song]
                  });
                  this.$db.songs.insert(songContainer, (err, newDoc) => {
                    if (err) {
                      console.error(err);
                    } else {
                      this.songsAdded++;
                    }
                  });
                }
              });

              createSong(index + 1);
            } catch (err) {
              console.error(err.message);
            }
          })();
        } else if (index > paths.length - 1) {
          console.log('exiting', Date());
          // Todo: currently assuming no errors...
          this.isLoading = false;
        }
      };

      console.log('creating playlist items', Date());
      // createSong(0);
      console.log('last line...', Date());
    },
    //
    test(e) {
      const paths = [];
      e.dataTransfer.files.forEach(element => {
        // console.log(element);
        if (fs.lstatSync(element.path).isDirectory()) {
          // this.searchInDirectory(
          //   fs.readdirSync(element.path, { withFileTypes: true })
          // );
          let paths = fs.readdirSync(element.path, { withFileTypes: true });
          console.log(paths.length);
          paths.forEach((p, i) => {
            console.log(i, p);
            // NodeID3Promise.read(`${element.path}/${p.name}`).then(metadata => {
            //   console.log(metadata);
            // });

            /////////
            NodeID3Promise.read(`${element.path}/${p.name}`).then(metadata => {
              // console.log(metadata);
              const item = new Song({
                album: metadata.album,
                artist: metadata.artist,
                format: element.type,
                genre: metadata.genre,
                path: element.path,
                length: metadata.length,
                rating: metadata.popularimeter
                  ? metadata.popularimeter.rating
                  : 1,
                // if metadata is bad, use file name minus the extension
                title: metadata.title
                  ? metadata.title
                  : element.name.split('.mp3')[0],
                trackNumber: metadata.trackNumber,
                year: metadata.year
              });

              console.log(item);

              this.$db.songs.find(
                { title: item.title, album: item.album, artist: item.artist },
                (err, docs) => {
                  if (err) {
                    console.log(err);
                  } else if (docs.length < 1) {
                    console.log('song does not exist');
                    this.$db.songs.insert(item, (err, newDoc) => {
                      if (err) {
                      } else {
                        console.log(`${item.title} added`);
                      }
                    });
                  } else {
                    console.log('file exists');
                  }
                }
              );
            });
            /////////
          });
        } else if (
          fs.lstatSync(element.path).isFile() &&
          RegExp('[.]mp3$').test(element.path)
        ) {
          NodeID3Promise.read(element.path).then(metadata => {
            // console.log(metadata);
            const item = new Song({
              album: metadata.album,
              artist: metadata.artist,
              format: element.type,
              genre: metadata.genre,
              path: element.path,
              rating: metadata.popularimeter
                ? metadata.popularimeter.rating
                : 1,
              // if metadata is bad, use file name minus the extension
              title: metadata.title
                ? metadata.title
                : element.name.split('.mp3')[0],
              year: metadata.year
            });

            this.$db.songs.find(
              { title: item.title, album: item.album, artist: item.artist },
              (err, docs) => {
                if (err) {
                } else if (docs.length < 1) {
                  this.$db.songs.insert(item, (err, newDoc) => {
                    if (err) {
                    } else {
                      console.log(`${item.title} added`);
                    }
                  });
                } else {
                  console.log('file exists');
                }
              }
            );
          });
        } else {
        }
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
      this.$db.songs.find({}, (err, docs) => {
        console.log(err, docs);
      });
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
        this.currentDir.join('/').replace('//', '/') + `/${path}`;
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
      const fullPath = this.currentDir.join('/').replace('//', '/');
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
      const fullPath = this.currentDir.join('/').replace('//', '/');
      // readdirSync using full path
      // update current list of directoryItems
      this.updateDirectoryItems(fullPath);
    },
    async directoryUp() {
      // pop last element in currentDir
      if (this.currentDir.length > 1) {
        this.currentDir.pop(-1, 1);
        // create full path from currentDir
        const fullPath = this.currentDir.join('/').replace('//', '/');
        // readdirSync using full path
        // update current list of directoryItems
        this.updateDirectoryItems(fullPath);
      } else {
        this.toRoot();
      }
    },
    // Todo: navigateTo(fullPath) {},
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
                path: `${r.DeviceID}/`,
                // type: getType(r),
                type: r.DriveType,
                icon: 'mdi-usb-port'
              });
            case 3:
              return new DirectoryItem({
                path: `${r.DeviceID}/`,
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
