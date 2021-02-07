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

ipcRenderer.on('SONGS_TO_PROCESS_COUNT', (e, count) => {
  console.log('count', count);
  store.dispatch('library/setSongsToProcessCount', count);
});

ipcRenderer.on('PROCESSING_SONG_NUMBER', (e, number) => {
  console.log('processing song #', number);
  store.dispatch('library/setProcessingSongNumber', number);
});

ipcRenderer.on('SET_DUPLICATE_SONG_COUNT', (e, number) => {
  console.log('duplicate songs:', number);
  store.dispatch('library/setDuplicateSongCount', number);
});

ipcRenderer.on('SET_EXISTING_SONG_COUNT', (e, number) => {
  console.log('processing song #', number);
  store.dispatch('library/setExistingSongCount', number);
});

ipcRenderer.on('SET_SONGS_ADDED_COUNT', (e, number) => {
  console.log('processing song #', number);
  store.dispatch('library/setSongsAddedCount', number);
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

