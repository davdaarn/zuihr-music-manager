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
