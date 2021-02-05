const {
  ipcRenderer
} = require('electron');

const state = {
  library: [],
  // 
  isSearching: false,
  isPlayingSong: false,
  songPaths: [],
  processing: false,
  isDirty: false,
  songsToProcessCount: 0,
  processingSongNumber: 0,
};

const getters = {
  library: state => {
    return state.library;
  },
};

const actions = {
  async setProcessing(context, value) {
    context.commit('SET_PROCESSING', value);
  },

  async setProcessingSongNumber(context, number) {

    context.commit('SET_PROCESSING_SONG_NUMBER', number);
  },

  async setSongsToProcessCount(context, count) {
    context.commit('SET_SONGS_TO_PROCESS_COUNT', count);
  },

  async setIsLibraryDirty(context, value) {
    console.log('is library dirty', value);
    if (value) {
      context.dispatch('loadLibrary');
    }
    context.commit('SET_IS_LIBRARY_DIRTY', value);
  },

  async findSongs(context, baseDir) {
    context.commit('SET_SEARCHING', true);
    // fileWorker.postMessage('findSongs');
    ipcRenderer.invoke('FIND_SONGS', baseDir).then(x => {
      console.log(x);
    }).catch(err => {
      console.log(err);
    }).finally(x => {
      console.log(x);
    });
  },

  async loadLibrary(context) {
    ipcRenderer
      .invoke('LOAD_LIBRARY')
      .then(docs => {
        context.commit('LOAD_LIBRARY', docs)
      })
      .catch(console.log)
      .finally(x => {});
  },
};

const mutations = {
  LOAD_LIBRARY(state, value) {
    console.log('loading library', value);
    state.library = value;
  },
  SET_SEARCHING(state, value) {
    state.isSearching = value;
  },
  SET_SONG_PATHS(state, value) {
    state.songPaths = value;
  },
  SET_PROCESSING(state, value) {
    state.processing = value;
    state.songsToProcessCount = 0;
  },
  SET_SONGS_TO_PROCESS_COUNT(state, value) {
    state.songsToProcessCount = value;
  },
  SET_PROCESSING_SONG_NUMBER(state, value) {
    state.processingSongNumber = value;
  },
  SET_IS_LIBRARY_DIRTY(state, value) {
    console.log('is library dirty', value);
    state.isDirty = value;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}

// ipcRenderer.on('SONGS_TO_PROCESS_COUNT', (e, count) => {
//   state.songsToProcessCount += count;
//   // store.commit('SET_SONGS_TO_PROCESS_COUNT', count);
//   console.log('Songs To Process', count);
// });
