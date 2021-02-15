const state = {
  songInFocus: null,
  songInFocusIndex: null,
  contextMenuData: {
    isActive: false,
    classList: 'pointer-events-none',
    event: null,
    X: null,
    Y: null,
  }
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

  setContextMenuData(context, value) {
    context.commit('SET_CONTEXT_MENU_DATA', value);
  },

  setContextPosition(context, value) {
    context.commit('SET_CONTEXT_POSITION', value);
  }
};

const mutations = {
  SET_SONG_IN_FOCUS(state, value) {
    state.songInFocus = value.song;
    state.songInFocusIndex = value.index;
  },
  SET_CONTEXT_MENU_DATA(state, value) {
    state.contextMenuData = value;
  },
  SET_CONTEXT_POSITION(state, value) {
    state.contextMenuData.X = value.X;
    state.contextMenuData.Y = value.Y;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
