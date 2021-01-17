import Vue from 'vue';
import Vuex from 'vuex';
const {
  ipcRenderer
} = require('electron');


Vue.use(Vuex);

// const fileWorker = new Worker('../utils/fileWorker.js', {
//   type: 'module',
//   credentials: 'include',
// });

const store = new Vuex.Store({
  state: {
    isSearching: false,
    isPlayingSong: false,
    repeat: false,
    shuffle: false,
    songQueue: [],
  },
  mutations: {
    SET_SEARCHING(state, value) {
      state.isSearching = value;
    }
  },
  actions: {
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
    }
  },
  modules: {}
});

ipcRenderer.on('ham', (e, args) => {
  store.commit('SET_SEARCHING', false);
  console.log(args);
});

// fileWorker.onmessage = e => {
//   store.commit(e.data.type, e.data.payload);
// }

export default store;
