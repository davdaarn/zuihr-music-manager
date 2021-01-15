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
    isSearching: false
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
  console.log(args);
});

// fileWorker.onmessage = e => {
//   store.commit(e.data.type, e.data.payload);
// }

export default store;
