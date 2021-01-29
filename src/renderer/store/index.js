import Vue from 'vue';
import Vuex from 'vuex';
const {
  ipcRenderer
} = require('electron');

import {
  Howl
} from '../libs/howler';


Vue.use(Vuex);

const playerState = {
  stopped: 0,
  paused: 1,
  playing: 2
}

const store = new Vuex.Store({
  state: {
    onDeck: {
      song: null,
      howl: null
    },
    queue: [],
    repeat: false,
    shuffle: false,
    library: [],
    songInFocus: null,
    processingSongs: false,
    playerState: playerState.stopped,
    playerVolume: 0.5,
    playerMuted: false,
    // 
    isSearching: false,
    isPlayingSong: false,
    songQueue: [],
    songPaths: [],
  },
  mutations: {
    LOAD_LIBRARY(state, value) {
      state.library = value;
    },
    SET_ON_DECK(state, value) {
      state.onDeck = value;
    },
    SET_SONG_IN_FOCUS(state, value) {
      state.songInFocus = value;
    },
    SET_REPEAT(state, value) {
      state.repeat = value;
    },
    SET_SHUFFLE(state, value) {
      state.shuffle = value;
    },
    SET_QUEUE(state, value) {
      state.queue = value;
    },
    SET_PLAYER_STATE(state, value) {
      state.playerState = value;
    },
    // 
    SET_SEARCHING(state, value) {
      state.isSearching = value;
    },
    SET_SONG_PATHS(state, value) {
      state.songPaths = value;
    },

  },
  actions: {
    setSongInFocus({
      commit
    }, {
      song
    }) {
      commit('SET_SONG_IN_FOCUS', song);
    },

    async findSongs({
      commit,
      state
    }, baseDir) {
      commit('SET_SEARCHING', true);
      console.log('calling findSongs')
      console.log(baseDir);
      // fileWorker.postMessage('findSongs');
      ipcRenderer.invoke('FIND_SONGS', baseDir).then(x => {
        console.log(x);
      }).catch(err => {
        console.log(err);
      }).finally(x => {
        console.log(x);
      });
    },

    async loadLibrary({
      commit,
      state
    }) {
      ipcRenderer
        .invoke('LOAD_LIBRARY')
        .then(docs => {
          console.log(docs.length);
          commit('LOAD_LIBRARY', docs)
        })
        .catch(console.log)
        .finally(x => {});
    },

    async playThis({
      commit
    }, song) {

      if (this.state.onDeck.howl) {
        this.state.onDeck.howl.unload();
      }

      await commit('SET_ON_DECK', {
        song: song,
        howl: new Howl({
          src: `safe-file-protocol://${song.songs[0].path}`,
          volume: this.state.playerVolume,
          preload: true,
        })
      });

      this.state.onDeck.howl.play();

      commit('SET_PLAYER_STATE', playerState.playing);
    },

    async playPause({
      commit
    }) {
      console.log(this.state.onDeck);

      if (this.state.onDeck.howl) {
        switch (this.state.playerState) {
          case playerState.playing:
            this.state.onDeck.howl.pause();
            commit('SET_PLAYER_STATE', playerState.paused);
            break;
          case playerState.paused:
            this.state.onDeck.howl.play();
            commit('SET_PLAYER_STATE', playerState.playing);
            break;
        }
      } else if (!this.state.onDeck.howl) {

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


export default store;

// fileWorker.onmessage = e => {
//   store.commit(e.data.type, e.data.payload);
// }

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
