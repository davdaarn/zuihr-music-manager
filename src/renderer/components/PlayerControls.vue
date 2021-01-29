<template>
  <div class="h-24">
    <div class="flex h-full justify-around">
      <!-- song peak -->
      <div class="flex-initial self-center flex flex-col"></div>
      <!-- controls -->
      <div class="flex-initial self-center flex flex-col">
        <div class="flex justify-between w-64 self-center items-center">
          <span
            class="mdi mdi-shuffle-variant text-theme-text-muted hover:text-theme-text-active text-xl"
            v-bind:class="{ 'hover:text-red-700': testClass }"
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
        <div class="flex pt-3">
          <div class="text-theme-text-muted">0:00</div>
          <div class="pl-3 pr-3">
            <input type="range" />
          </div>
          <div class="text-theme-text-muted">4:18</div>
        </div>
      </div>
      <!-- volume -->
      <div class="flex-initial self-center flex flex-col"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PlayerControls',
  data() {
    return {
      testClass: true
    };
  },
  methods: {
    playPause() {
      this.$store.dispatch('playPause');
    },
    seeker() {
      // if (this.)
    }
  },
  created() {}
};
</script>

<style lang="scss">
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

input[type="range"]:hover::-webkit-slider-thumb {
  background: #53be57;
  box-shadow: -403px 0 0 400px #53be57;
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

input[type="range"]::-webkit-slider-runnable-track {
  height: 10px;
  background: #5757576c;
  border: none;
}
</style>