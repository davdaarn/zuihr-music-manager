<template>
  <div class="h-24 bg-gray-900 flex flex-col">
    <!-- <div class="h-1 bg-gray-700"></div> -->
    <div class="flex h-full justify-around">
      <!-- song peak -->
      <div class="flex-initial self-center flex flex-col"></div>
      <!-- controls -->
      <div class="flex-initial self-center flex flex-col pt-2">
        <div class="flex justify-between w-64 self-center items-center">
          <span
            class="mdi mdi-shuffle-variant text-theme-text-muted hover:text-theme-text-active text-xl"
            :class="{ 'hover:text-red-700': testClass }"
          ></span>
          <span
            class="mdi mdi-skip-previous-outline text-theme-text-muted hover:text-theme-text-active text-2xl"
          ></span>
          <span
            class="mdi mdi-motion-play-outline text-theme-text-muted hover:text-theme-text-active text-4xl"
            @click="playPause"
          ></span>
          <span
            class="mdi mdi-skip-next-outline text-theme-text-muted hover:text-theme-text-active text-2xl"
          ></span>
          <span
            class="mdi mdi-repeat text-theme-text-muted hover:text-theme-text-active text-xl"
          ></span>
        </div>
        <div class="flex py-2">
          <div class="text-theme-text-active">{{ time }}</div>
          <div class="pl-3 pr-3">
            <input type="range" min="0" :max="max" :value="track" />
          </div>
          <div class="text-theme-text-active">{{ duration }}</div>
        </div>
      </div>
      <!-- volume -->
      <div class="flex-initial self-center flex flex-col"></div>
    </div>
    <div class="h-1" :class="processing ? `incative` : `inactive`"></div>
  </div>
</template>

<script>
import { mapState } from 'vuex';

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
      railMode: 'inactive'
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
      processingSongNumber: state => state.library.processingSongNumber
    })
  },
  methods: {
    playPause() {
      this.$store.dispatch('player/playPause');
    },
    formatTime: function(secs) {
      var minutes = Math.floor(secs / 60) || 0;
      var seconds = secs - minutes * 60 || 0;

      return minutes + ':' + (seconds < 10 ? '0' : '') + seconds;
    },
    seeker() {
      if (this.$store.state.player.onDeck.howl) {
        let h = this.$store.state.player.onDeck.howl;
        let seconds = Math.round(h.seek());
        this.time = this.formatTime(seconds);
        this.duration = this.formatTime(Math.round(h.duration()));
        this.track = Math.round(h.seek());
        this.max = Math.round(h.duration());
      } else {
        this.time = '0:00';
        this.duration = '0:00';
        this.track = 0;
      }

      setTimeout(() => {
        this.seeker();
      }, 1000);
    }
  },
  created() {
    this.seeker();
  }
};
</script>

<style lang="scss">
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
    #15617c,
    // #15617c
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

input[type="range"]:hover::-webkit-slider-thumb {
  background: #53be57;
  box-shadow: -403px 0 0 400px #53be57;
}

input[type="range"]::-webkit-slider-runnable-track {
  height: 10px;
  background: #5757576c;
  border: none;
}
</style>