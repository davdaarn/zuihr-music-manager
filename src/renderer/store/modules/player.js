import {
  Howl
} from '../../libs/howler';

const playerState = {
  stopped: 0,
  paused: 1,
  playing: 2
}

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

const getters = {};

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
  async playThis(context, song) {

    if (context.state.onDeck.howl) {
      context.state.onDeck.howl.unload();
    }

    await context.commit('SET_ON_DECK', {
      song: song,
      howl: new Howl({
        src: `safe-file-protocol://${song.songs[0].path}`,
        volume: context.state.playerVolume,
        // preload: true,
      })
    });

    context.state.onDeck.howl.play();

    context.commit('SET_PLAYER_STATE', playerState.playing);
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
