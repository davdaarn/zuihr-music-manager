const state = {
  songInFocus: null,
};

const getters = {};

const actions = {
  setSongInFocus(context, {
    song
  }) {
    context.commit('SET_SONG_IN_FOCUS', song);
  },
};

const mutations = {
  SET_SONG_IN_FOCUS(state, value) {
    state.songInFocus = value;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
