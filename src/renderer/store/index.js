import Vue from 'vue';
import Vuex from 'vuex';
import app from './modules/app';
import player from './modules/player';
import library from './modules/library';

const {
  ipcRenderer
} = require('electron');

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    app,
    player,
    library
  }
});


// todo: create an ipc handler class

ipcRenderer.on('ham', (e, args) => {
  // store.commit('SET_SEARCHING', false);
  // store.commit('SET_SONG_PATHS', args);
  console.log(args);
});

ipcRenderer.on('SONGS_TO_PROCESS_COUNT', (e, count) => {
  console.log('count', count);
  store.dispatch('library/setSongsToProcessCount', count);
});

ipcRenderer.on('PROCESSING_SONG_NUMBER', (e, number) => {
  console.log('processing song #', number);
  store.dispatch('library/setProcessingSongNumber', number);
});

ipcRenderer.on('PROCESSING_SONGS', (e, value) => {
  console.log('processing songs', value);
  store.dispatch('library/setProcessing', value);
});

ipcRenderer.on('SET_IS_LIBRARY_DIRTY', (e, value) => {
  console.log('is library dirty', value);
  store.dispatch('library/setIsLibraryDirty', value);
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
