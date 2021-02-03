const state = {
  songInFocus: null,
  songInFocusIndex: null
};

const getters = {};

const actions = {
  setSongInFocus(context, {
    song,
    index
  }) {
    context.commit('SET_SONG_IN_FOCUS', {
      song,
      index
    });
  },
};

const mutations = {
  SET_SONG_IN_FOCUS(state, value) {
    console.log(value);
    state.songInFocus = value.song;
    state.songInFocusIndex = value.index;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
