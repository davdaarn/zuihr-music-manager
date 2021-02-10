const {
  ipcRenderer
} = require('electron');

const state = {
  library: [],
  filteredSongs: [],
  // 
  isSearching: false,
  isPlayingSong: false,
  songPaths: [],
  processing: false,
  isDirty: false,
  songsToProcessCount: 0,
  processingSongNumber: 0,
  duplicateSongCount: 0,
  existingSongCount: 0,
  songsAddedCount: 0,
  processingCompleteSummary: null,
};

const getters = {
  library: state => {
    return state.library;
  },
};

const actions = {
  async setFilteredSongs(context, value) {
    context.commit('SET_FILTERED_SONGS', value);
  },

  async setProcessing(context, value) {
    context.commit('SET_PROCESSING', value);
  },

  async setProcessingSongNumber(context, number) {

    context.commit('SET_PROCESSING_SONG_NUMBER', number);
  },

  async setDuplicateSongCount(context, number) {

    context.commit('SET_DUPLICATE_SONG_COUNT', number);
  },

  async setExistingSongCount(context, number) {

    context.commit('SET_EXISTING_SONG_COUNT', number);
  },

  async setSongsAddedCount(context, number) {

    context.commit('SET_SONGS_ADDED_COUNT', number);
  },

  async setSongsToProcessCount(context, count) {
    context.commit('SET_SONGS_TO_PROCESS_COUNT', count);
  },

  async setProcessingCompleteSummary(context, count) {
    context.commit('SET_PROCESSING_COMPLETE_SUMMARY', count);
  },

  async setIsLibraryDirty(context, value) {
    if (value) {
      context.dispatch('loadLibrary');
    }
    context.commit('SET_IS_LIBRARY_DIRTY', value);
  },

  async findSongs(context, baseDir) {
    context.commit('SET_SEARCHING', true);
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
    // state.filteredSongs = value;
  },
  SET_FILTERED_SONGS(state, value) {
    state.filteredSongs = value;
  },
  SET_SEARCHING(state, value) {
    state.isSearching = value;
  },
  SET_SONG_PATHS(state, value) {
    state.songPaths = value;
  },
  SET_PROCESSING(state, value) {
    state.processing = value;
  },
  SET_SONGS_TO_PROCESS_COUNT(state, value) {
    state.songsToProcessCount += value;
  },
  SET_PROCESSING_SONG_NUMBER(state, value) {
    state.processingSongNumber = value;
  },
  SET_DUPLICATE_SONG_COUNT(state, value) {
    state.duplicateSongCount = value;
  },
  SET_EXISTING_SONG_COUNT(state, value) {
    state.existingSongCount = value;
  },
  SET_SONGS_ADDED_COUNT(state, value) {
    state.songsAddedCount = value;
  },
  SET_PROCESSING_COMPLETE_SUMMARY(state, value) {
    state.processingCompleteSummary = value;
  },
  SET_IS_LIBRARY_DIRTY(state, value) {
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

