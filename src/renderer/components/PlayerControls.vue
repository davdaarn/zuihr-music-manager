<template>
  <div class="h-24 bg-gray-900 flex flex-col">
    <!-- <div class="h-1 bg-gray-700"></div> -->
    <div class="flex h-full justify-between">
      <!-- song peak -->
      <!-- todo: click on song to navigate to position in library -->
      <!-- todo: add quick actions -->
      <div class="flex-initial self-center flex flex-col w-4/12">
        <div v-if="songOnDeck" class="ml-4">
          <div class="flex items-center">
            <img
              class="w-18 h-18 bg-cover shadow-2xl rounded-md"
              :src="`data:image/jpg;base64, ${songOnDeck.songs[0].albumArt.image64}`"
            />

            <div class="pl-4 flex flex-col text-gray-300">
              <div class="">
                {{
                  truncate(
                    songOnDeck.songs ? songOnDeck.songs[0].title : "nope"
                  )
                }}
              </div>
              <router-link
                v-if="songOnDeck.songs[0].artist"
                :to="`/artist/${songOnDeck.songs[0].artist}`"
                class="text-sm text-gray-400 hover:text-gray-300 link"
              >
                {{ truncate(songOnDeck.songs[0].artist) }}
              </router-link>
              <div v-else class="text-sm text-gray-400">...</div>
            </div>
          </div>
        </div>
      </div>
      <!-- controls -->
      <div
        class="flex-initial self-center items-center flex flex-col pt-2 w-4/12"
      >
        <div
          class="flex justify-between w-64 self-center items-center text-theme-text-muted"
        >
          <span
            class="mdi mdi-shuffle-variant hover:text-theme-text-active text-xl"
            :class="{ 'hover:text-red-700': testClass }"
          ></span>
          <span
            class="mdi mdi-skip-previous-outline hover:text-theme-text-active text-2xl"
          ></span>
          <span
            class="mdi hover:text-theme-text-active text-4xl"
            :class="playIcon"
            @click="playPause"
          ></span>
          <span
            class="mdi mdi-skip-next-outline hover:text-theme-text-active text-2xl"
            @click="playNext()"
          ></span>
          <span
            class="mdi mdi-repeat hover:text-theme-text-active text-xl"
          ></span>
        </div>
        <div class="flex py-2">
          <div class="text-theme-text-active">{{ time }}</div>
          <div class="pl-3 pr-3">
            <input
              type="range"
              min="0"
              :max="max"
              :value="track"
              @mousedown="seekControl"
              @mouseup="seekControl"
              @input="seekControl"
            />
          </div>
          <div class="text-theme-text-active">{{ duration }}</div>
        </div>
      </div>
      <!-- volume -->
      <div class="self-center flex flex-col w-4/12 items-end mr-4">
        <div class="flex py-2">
          <div
            class="mdi text-2xl text-theme-text-active self-center cursor-pointer"
            :class="volumeIcon()"
          ></div>
          <div class="pl-3 pr-3 volume flex flex-col justify-center">
            <input type="range" min="0" :max="100" :value="volume" />
          </div>
        </div>
      </div>
    </div>
    <!-- <div class="h-0.5" :class="processing ? `incative` : `inactive`"></div> -->
  </div>
</template>

<script>
import { playerState } from '../types';
import { mapState, mapActions } from 'vuex';

export default {
  name: 'PlayerControls',
  data() {
    return {
      testClass: true,
      time: '0:00',
      duration: '0:00',
      track: 0,
      max: 0,
      deg: 0,
      railMode: 'inactive',
      haltTrackUpdate: false,
      volume: 50
    };
  },
  watch: {
    '$store.state': function(o, n) {
      console.log('state changed');
      console.log(o, n);
    }
  },
  computed: {
    ...mapState({
      library: state => state.library.library,
      processing: state => state.library.processing,
      isLibraryDirty: state => state.library.isDirty,
      songsAddedCount: state => state.library.songsAddedCount,
      existingSongCount: state => state.library.existingSongCount,
      duplicateSongCount: state => state.library.duplicateSongCount,
      songsToProcessCount: state => state.library.songsToProcessCount,
      processingSongNumber: state => state.library.processingSongNumber,
      songOnDeck: state => state.player.onDeck.song,
      playerState: state => state.player.playerState,
      playerVolume: state => state.player.playerVolume
    }),
    playIcon() {
      if (this.playerState === playerState.playing) {
        return 'mdi-motion-pause-outline text-gray-300';
      } else {
        return 'mdi-motion-play-outline';
      }
    }
  },
  methods: {
    ...mapActions({
      playNext: 'player/playNext'
    }),
    seekControl(e) {
      console.log(e);
      if (e.type === 'mousedown') {
        this.haltTrackUpdate = true;
        this.track = e.target.value;
      } else if (e.type === 'mouseup') {
        this.haltTrackUpdate = false;
        this.track = e.target.value;
        if (this.$store.state.player.onDeck.howl) {
          let h = this.$store.state.player.onDeck.howl;
          if (e.target.value) {
            h.seek(parseInt(e.target.value));
          }
        }
      } else if (e.type === 'input') {
        this.haltTrackUpdate = true;
        this.track = e.target.value;
      } else {
        this.haltTrackUpdate = false;
      }
    },
    playPause() {
      this.$store.dispatch('player/playPause');
    },
    formatTime: function(secs) {
      var minutes = Math.floor(secs / 60) || 0;
      var seconds = secs - minutes * 60 || 0;

      return minutes + ':' + (seconds < 10 ? '0' : '') + seconds;
    },
    truncate(text) {
      if (text.length > this.maxLength) {
        return text.substring(0, this.maxLength) + '...';
      } else {
        return text;
      }
    },
    seeker() {
      if (this.$store.state.player.onDeck.howl) {
        let h = this.$store.state.player.onDeck.howl;
        let seconds = Math.round(h.seek());
        this.time = this.formatTime(seconds);
        this.duration = this.formatTime(Math.round(h.duration()));
        if (!this.haltTrackUpdate) {
          this.track = Math.round(h.seek());
        }
        this.max = Math.round(h.duration());
      } else {
        this.time = '0:00';
        this.duration = '0:00';
        this.track = 0;
      }

      setTimeout(() => {
        this.seeker();
      }, 1000);
    },
    volumeIcon() {
      return 'mdi-volume-high';
    }
  },
  created() {
    this.seeker();
  }
};
</script>

<style lang="scss">
.link:hover {
  text-decoration-line: underline;
}

.inactive {
  background: #15617c;
}

.processing {
  background: linear-gradient(
    to right,
    #15617c,
    #15617c,
    #15617c,
    #15617c,
    #15617c,
    #2fac67,
    #15617c,
    #15617c,
    #15617c,
    #15617c
  );
  background-size: 200% 200%;
  animation: Processing 2s ease infinite;
}

@keyframes Processing {
  0% {
    background-position: 120% 0%;
  }
  // 50% {
  //   background-position: 100% 0%;
  // }
  100% {
    background-position: -20% 0%;
  }
}

///////////////////////////////

input[type="range"] {
  -webkit-appearance: none;
  width: 400px;
  height: 10px;
  background: rgba(126, 139, 255, 0.3);
  outline: none;
  border-radius: 15px;
  overflow: hidden;
  cursor: pointer;
  box-shadow: 0 0 5px rgba(49, 49, 49, 0.5);

  opacity: 0.6;
  -webkit-transition: 0.3s;
  transition: opacity 0.3s;
}

.volume input[type="range"] {
  -webkit-appearance: none;
  width: 200px;
  height: 8px;
  box-shadow: none;
}

input[type="range"]:hover {
  opacity: 1;
}

input[type="range"]::-webkit-slider-thumb {
  -webkit-appearance: none;
  width: 10px;
  height: 10px;
  background: #d1d1d1;
  cursor: pointer;
  border-radius: 50%;
  box-shadow: -403px 0 0 400px #d1d1d1;
}

.volume input[type="range"]::-webkit-slider-thumb {
  -webkit-appearance: none;
  width: 8px;
  height: 8px;
  box-shadow: -203px 0 0 200px #d1d1d1;
}

input[type="range"]:hover::-webkit-slider-thumb {
  background: #53be57;
  box-shadow: -403px 0 0 400px #53be57;
}

.volume input[type="range"]:hover::-webkit-slider-thumb {
  box-shadow: -203px 0 0 200px #53be57;
}

input[type="range"]::-webkit-slider-runnable-track {
  height: 10px;
  background: #5757576c;
  border: none;
}

.volume input[type="range"]::-webkit-slider-runnable-track {
  height: 8px;
}
</style>