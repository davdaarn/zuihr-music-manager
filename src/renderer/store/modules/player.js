import {
  Howl
} from '../../libs/howler';

import {
  playerState
} from '../../types';

const state = {
  onDeck: {
    song: null,
    howl: null
  },
  queue: [],
  repeat: false,
  shuffle: false,
  playerState: playerState.stopped,
  playerVolume: 0.5,
  playerMuted: false,
  processingSongs: false,
};

const getters = {
  songOnDeck: state => {
    return state.onDeck.song;
  },
};

const mutations = {
  SET_ON_DECK(state, value) {
    state.onDeck = value;
  },
  SET_REPEAT(state, value) {
    state.repeat = value;
  },
  SET_SHUFFLE(state, value) {
    state.shuffle = value;
  },
  SET_QUEUE(state, value) {
    state.queue = value;
  },
  SET_PLAYER_STATE(state, value) {
    state.playerState = value;
  },
};
const actions = {
  async playPrevious(context) {},
  async playNext(context) {
    console.log('****************PLAY_NEXT*******************');
  },
  async playThis(context, song) {
    let deck = context.state.onDeck;
    if (deck.howl && deck.song && deck.song._id === song._id) {
      context.dispatch('playPause');
    } else {
      if (context.state.onDeck.howl) {
        context.state.onDeck.howl.unload();
      }

      await context.commit('SET_ON_DECK', {
        song: song,
        howl: new Howl({
          src: `safe-file-protocol://${song.songs[0].path}`,
          volume: context.state.playerVolume,
          // preload: true,
          onend: function () {
            context.commit('SET_PLAYER_STATE', playerState.stopped);
            context.dispatch('playNext')
          }
        })
      });

      context.state.onDeck.howl.play();

      context.commit('SET_PLAYER_STATE', playerState.playing);

    }
  },

  async playPause(context) {
    console.log(context.state.onDeck);

    if (context.state.onDeck.howl) {
      switch (context.state.playerState) {
        case playerState.playing:
          context.state.onDeck.howl.pause();
          context.commit('SET_PLAYER_STATE', playerState.paused);
          break;
        case playerState.paused:
          context.state.onDeck.howl.play();
          context.commit('SET_PLAYER_STATE', playerState.playing);
          break;
      }
    } else if (!context.state.onDeck.howl) {

    }

  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
