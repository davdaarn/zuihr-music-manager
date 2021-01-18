<template>
  <div class="w-full h-full flex flex-wrap mt-10">
    <div
      class="w-44 h-60 bg-gray-700 transition duration-200 hover:bg-gray-600 rounded mx-2 my-2 flex flex-col justify-between items-center shadow-lg relative"
    >
      <div
        class="w-36 h-36 bg-red-500 mt-4 rounded shadow-lg bg-cover"
        :style="{ backgroundImage: `url(${placeHolderImage})` }"
      ></div>
      <div class="mb-4 text-theme-text-active">My Playlist</div>
      <div
        class="absolute mdi mdi-play-circle text-theme-text-active hover:text-green-500 text-5xl top-32 right-6 shadow-2xl rounded-full"
      ></div>
    </div>

    <div
      class="w-44 h-60 bg-gray-700 transition duration-200 hover:bg-gray-600 rounded mx-2 my-2 flex justify-center items-center shadow-lg"
    >
      <div
        class="mdi mdi-music-note-plus text-theme-text-active hover:text-green-500 text-5xl"
      ></div>
    </div>
  </div>
</template>

<script>
import placeHolderImage from '../assets/lava.jpeg';

export default {
  data() {
    return {
      placeHolderImage: placeHolderImage
    };
  }
};
</script>

<style scoped>
</style>