<template>
  <div class="flex flex-col">
    <div
      class="h-20 mx-12 mt-4 bg-contain bg-no-repeat bg-center"
      :style="{ backgroundImage: `url(${logo_blue})` }"
    ></div>

    <div class="p-2 flex flex-col justify-around">
      <router-link to="/" class="hover:bg-blueGray-700 rounded">
        <div class="p-2 cursor-pointer flex items-center">
          <span
            class="pr-2 mdi mdi-home text-theme-text-active text-2xl"
          ></span>
          <span class="text-theme-text-active">Home</span>
        </div>
      </router-link>
      <!-- <router-link to="/test">
        <div class="pl-6 pt-2 cursor-pointer">
          <span class="mdi mdi-text-search text-theme-text-active"></span>
          <span class="text-theme-text-active">Test</span>
        </div>
      </router-link> -->
      <router-link to="/library" class="hover:bg-blueGray-700 rounded">
        <div class="p-2 cursor-pointer flex items-center">
          <span
            class="pr-2 mdi mdi-playlist-music text-theme-text-active text-2xl"
          ></span>
          <span class="text-theme-text-active">Libary</span>
        </div>
      </router-link>
    </div>

    <!-- <hr /> -->

    <div class="pt-4 pl-4 text-sm text-theme-text-muted">Playlists</div>
    <div class="pt-4 pl-4 text-sm">
      <span class="mdi mdi-playlist-plus text-theme-text-active"></span>
      <span class="text-theme-text-active">Create new</span>
    </div>

    <!-- <hr /> -->

    <div class="h-20 flex-grow pr-4 pt-4 pb-4">
      <ul class="h-full overflow-auto flex flex-col px-2">
        <router-link
          v-for="(item, index) in items"
          :key="index"
          class="py-2 pl-6 select-none cursor-pointer hover:bg-blueGray-700 text-lg rounded"
          :to="`/playlist/${index}`"
        >
          <span class="text-theme-text-active">{{ truncate(item.text) }}</span>
        </router-link>
      </ul>
    </div>

    <!-- <div class="h-20 w-64"></div> -->
  </div>
</template>

<script>
import logo_blue from '../assets/own_blue.png';

export default {
  name: 'Sidebar',
  data: () => ({
    mini: false,
    drawer: false,
    selectedItem: 0,
    maxLength: 18,
    logo_blue,
    items: [
      { text: 'Oldies', icon: 'mdi-folder' },
      {
        text: 'My Favorite Classic Video Game Soundtracks',
        icon: 'mdi-account-multiple'
      },
      { text: 'Coding Music', icon: 'mdi-star' },
      { text: 'OST', icon: 'mdi-history' },
      { text: 'Deep', icon: 'mdi-check-circle' },
      { text: 'Hard Core', icon: 'mdi-check-circle' },
      { text: 'Inspirational', icon: 'mdi-check-circle' }
    ]
  }),
  methods: {
    truncate(text) {
      if (text.length > this.maxLength) {
        return text.substring(0, this.maxLength) + '...';
      } else {
        return text;
      }
    }
  }
};
</script>

<style>
.sidebar {
  box-shadow: black;
}
</style>