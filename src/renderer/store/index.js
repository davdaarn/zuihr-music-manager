import Vue from 'vue';
import Vuex from 'vuex';
const {
  ipcRenderer
} = require('electron');

import {
  Howler,
  Howl
} from '../libs/howler';


Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    isSearching: false,
    isPlayingSong: false,
    repeat: false,
    shuffle: false,
    songQueue: [],
    allSongs: [],
    songToPlay: null,
    song: null,
    songPaths: []
  },
  mutations: {
    SET_SEARCHING(state, value) {
      state.isSearching = value;
    },
    LOAD_ALL_SONGS(state, value) {
      state.allSongs = value;
    },
    SET_SONG(state, value) {
      state.songToPlay = value;
    },
    SET_SONG_PATHS(state, value) {
      state.songPaths = value;
    },

  },
  actions: {
    setSongToPlay({
      commit
    }, {
      song
    }) {
      commit('SET_SONG', song);
    },

    async findSongs({
      commit,
      state
    }, baseDir) {
      commit('SET_SEARCHING', true);
      console.log('calling findSongs')
      console.log(baseDir);
      // fileWorker.postMessage('findSongs');
      ipcRenderer.invoke('findSongs', baseDir).then(x => {
        console.log(x);
      }).catch(err => {
        console.log(err);
      }).finally(x => {
        console.log(x);
      });
    },

    async loadAllSongs({
      commit,
      state
    }, {
      db
    }) {
      console.log('calling loadAllSongs');
      // console.log(db.songs);
      ipcRenderer
        .invoke('loadAllSongs')
        .then(docs => {
          // docs.forEach(song => {
          //   if (song.songs[0].thumbnail.data) {
          //     let buffer = Buffer.from(song.songs[0].thumbnail.data);
          //     let blob = new Blob([buffer], {
          //       type: song.songs[0].thumbnail.format
          //     });
          //     let urlCreator = window.URL || window.webkitURL;
          //     let url = urlCreator.createObjectURL(blob);
          //     song.url = url;
          //   }
          // });
          commit('LOAD_ALL_SONGS', docs)
        })
        .catch(console.log)
        .finally(x => {});
    },

    async playPause({
      commit
    }) {
      console.log(this.state.songToPlay);

      if (this.state.song) {
        this.state.song.stop();
        this.state.song = null;
      } else {
        this.state.song = await new Howl({
          src: [`safe-file-protocol://${this.state.songToPlay.songs[0].path}`],
          volume: 0.1,
          preload: true
        });

        this.state.song.play();
      }

    }
  },
  modules: {}
});

ipcRenderer.on('ham', (e, args) => {
  // store.commit('SET_SEARCHING', false);
  // store.commit('SET_SONG_PATHS', args);
  console.log(args);
});

// fileWorker.onmessage = e => {
//   store.commit(e.data.type, e.data.payload);
// }

export default store;
