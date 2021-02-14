<template>
  <div
    class="text-gray-300 h-14 p-2 hover:bg-blueGray-700 song-row-item"
    :class="isInFocus"
    @click="setFocusedSong"
    @mouseover="hover = true"
    @mouseleave="hover = false"
  >
    <div class="flex flex-row justify-items-start pointer-events-none">
      <!--  -->
      <div class="w-12 flex items-center mx-2 flex-none pointer-events-auto">
        <div class="align-middle">
          <div
            v-if="hover"
            class="mdi text-3xl hover:text-active"
            :class="hoverLogic()"
            @click="playPauseThis"
          ></div>
          <div v-else>
            <div v-if="!nonHoverLogic()">
              {{ index + 1 }}
            </div>
            <!-- <img
              v-if="nonHoverLogic()"
              src="https://open.scdn.co/cdn/images/equaliser-animated-green.73b73928.gif"
            /> -->
            <img v-if="nonHoverLogic()" :src="`safe-file-protocol://${eq}`" />
          </div>
        </div>
      </div>
      <!--  -->
      <div class="w-4/12">
        <div class="flex items-center">
          <!-- {{ log(song) }} -->
          <img
            class="w-10 h-10 bg-cover shadow-2xl rounded-md"
            :src="`data:image/jpg;base64, ${source.songs[0].albumArt.image64}`"
          />

          <div class="pl-2 flex flex-col">
            <div class="">
              {{ truncate(source.songs ? source.songs[0].title : "nope") }}
            </div>
            <router-link
              v-if="source.songs[0].artist"
              :to="`/artist/${source.songs[0].artist}`"
              class="text-sm text-gray-400 hover:text-gray-300 link pointer-events-auto"
            >
              {{ truncate(source.songs[0].artist) }}
            </router-link>
            <div v-else class="text-sm text-gray-400 pointer-events-auto">
              ...
            </div>
          </div>
        </div>
      </div>
      <!--  -->
      <div class="w-4/12 flex items-center">
        <router-link
          v-if="source.songs[0].artist"
          :to="`/album/${source.songs[0].album}`"
          class="link pointer-events-auto"
        >
          {{ truncate(source.songs ? source.songs[0].album : "nope") }}
        </router-link>
      </div>
      <!-- <div>Sometdin</div> -->
      <div class="flex justify-around items-center h-10 w-4/12">
        <div class="flex">
          <div
            class="mdi mdi-heart-outline text-gray-400 hover:text-red-500 cursor-pointer pointer-events-auto"
          ></div>
          <div class="pl-2 pr-2 w-20 flex justify-center">
            <!-- Todo: make this accurate -->
            <div>
              {{ songDuration() }}
            </div>
          </div>
          <div class="relative">
            <!-- <div
              class="mdi mdi-dots-horizontal hover:text-white select-auto"
            ></div> -->
            <div
              class="mdi select-auto cursor-pointer pointer-events-auto text-gray-400"
              :class="
                source.songs.length > 1
                  ? 'mdi-music-box-multiple-outline text-yellow-300 hover:text-yellow-200'
                  : 'mdi-dots-horizontal hover:text-white'
              "
              v-on:click="showOptions(source, index)"
            ></div>
            <div
              v-if="songToShowOptions === index"
              class="absolute h-auto w-48 bg-gray-900 rounded-sm shadow-2xl top-8 -left-24 z-50"
            >
              <div class="mdi mdi-heart-outline p-2 hover:text-red-500">
                Stuff
              </div>
              <div class="p-2 hover:text-gray-200 hover:bg-gray-600">Stuff</div>
              <div class="p-2 hover:text-gray-200 hover:bg-gray-600">Stuff</div>
              <div class="p-2 hover:text-gray-200 hover:bg-gray-600">Stuff</div>
              <div class="p-2 hover:text-gray-200 hover:bg-gray-600">Stuff</div>
              <hr />
              <div class="p-2 hover:text-gray-200 hover:bg-gray-600">
                Other Stuff
              </div>
              <div class="p-2 hover:text-gray-200 hover:bg-gray-600">
                Other Stuff
              </div>
              <div class="p-2 hover:text-gray-200 hover:bg-gray-600">
                Other Stuff
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { playerState } from '../types';
// import eq from '../assets/equalizer.gif';
import path from 'path';

export default {
  name: 'SongRow',
  props: {
    index: Number,
    displayType: String,
    source: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  components: {},
  data() {
    return {
      maxLength: 30,
      hover: false,
      songToShowOptions: null,
      eq: path.join(__static, '/equalizer.gif')
    };
  },
  created() {
    // console.log(this.source);
  },
  methods: {
    truncate(text) {
      if (text.length > this.maxLength) {
        return text.substring(0, this.maxLength) + '...';
      } else {
        return text;
      }
    },
    setFocusedSong() {
      this.$store.dispatch('app/setSongInFocus', {
        song: this.source,
        index: this.index
      });
    },
    showOptions(song, index) {
      if (this.songToShowOptions === index) {
        this.songToShowOptions = null;
      } else {
        this.songToShowOptions = index;
      }
      console.log(song, index);
    },
    playPauseThis() {
      this.$store.dispatch('player/playThis', this.source);
    },
    hoverLogic() {
      let state = this.$store.state.player;
      // console.log(state.onDeck.song._id, this.source._id, state.playerState);
      if (state.onDeck.song && state.onDeck.song._id === this.source._id) {
        if (state.playerState === playerState.playing) {
          return 'mdi-pause-circle-outline';
        }
      }
      return 'mdi-play-circle-outline';
    },
    nonHoverLogic() {
      let state = this.$store.state.player;
      if (
        state.onDeck.song &&
        state.onDeck.song._id === this.source._id &&
        state.playerState === playerState.playing
      ) {
        return true;
      }

      return false;
    },
    songDuration() {
      let m = Math.floor(this.source.songs[0].length / 60);
      let s = Math.round(this.source.songs[0].length) % 60;

      if (s < 10) {
        s = `0${s}`;
      }

      return `${m}:${s}`;
    }
  },
  computed: {
    isInFocus: function() {
      if (this.$store.state.app.songInFocusIndex === this.index) {
        return 'bg-blueGray-600';
      }

      return '';
    }
  }
};
</script>

<style lang="scss" scoped>
.link:hover {
  text-decoration-line: none;
  // text-decoration-color: #00e6cf;
  color: #00e6cf;
}
</style>