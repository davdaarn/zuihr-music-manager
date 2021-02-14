<template>
  <div class="flex flex-col text-theme-text-active">
    <div
      class="h-20 mx-12 my-4 bg-contain bg-no-repeat bg-center"
      :style="{ backgroundImage: `url(${logo})` }"
    ></div>

    <div class="flex">
      <div class="w-1"></div>
      <div
        class="px-6 py-4 text-lg text-white flex justify-between items-center w-full"
      >
        <span>Your Music</span>
      </div>
    </div>

    <div class="flex flex-col justify-around">
      <router-link to="/" class="hover:bg-blueGray-700 w-full flex">
        <div class="indicator w-1"></div>
        <div class="px-6 py-1 cursor-pointer flex items-center">
          <span class="pr-2 mdi mdi-home-outline text-2xl"></span>
          <span class="">Home</span>
        </div>
      </router-link>
      <!--  -->
      <router-link to="/library" class="hover:bg-blueGray-700 w-full flex">
        <div class="indicator w-1"></div>
        <div class="px-6 py-1 cursor-pointer flex items-center">
          <span class="pr-2 mdi mdi-playlist-music text-2xl"></span>
          <span class="">Library</span>
        </div>
      </router-link>
      <!--  -->
      <router-link to="/stats" class="hover:bg-blueGray-700 w-full flex">
        <div class="indicator w-1"></div>
        <div class="px-6 py-1 cursor-pointer flex items-center">
          <span class="pr-2 mdi mdi-chart-timeline-variant text-2xl"></span>
          <span class="">Stats</span>
        </div>
      </router-link>
    </div>

    <!-- <hr /> -->

    <div class="flex">
      <div class="w-1"></div>
      <div
        class="px-6 py-4 text-lg text-white flex justify-between items-center w-full"
      >
        <span>Playlists</span>
        <span
          class="mdi mdi-playlist-plus text-2xl cursor-pointer hover:text-active"
        ></span>
      </div>
    </div>

    <!-- <hr /> -->

    <div class="h-20 flex-grow pb-24">
      <ul class="h-full overflow-auto flex flex-col">
        <router-link
          v-for="(item, index) in items"
          :key="index"
          class="hover:bg-blueGray-700 w-full flex"
          :to="`/playlist/${index}`"
        >
          <div class="indicator w-1"></div>
          <span class="px-6 py-2">{{ truncate(item.text) }}</span>
        </router-link>
      </ul>
    </div>

    <!-- <div class="h-20 w-64"></div> -->
  </div>
</template>

<script>
import logo from '../assets/own_2.png';

export default {
  name: 'Sidebar',
  data: () => ({
    mini: false,
    drawer: false,
    selectedItem: 0,
    maxLength: 18,
    logo,
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
      { text: 'Inspirational', icon: 'mdi-check-circle' },
      { text: 'Inspirational', icon: 'mdi-check-circle' },
      { text: 'Quiet Days', icon: 'mdi-check-circle' },
      { text: 'Feel Good', icon: 'mdi-check-circle' },
      { text: 'Fun', icon: 'mdi-check-circle' }
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

.router-link-exact-active .indicator {
  background-color: rgba(0, 229, 206, 1);
  border-radius: 0px 50px 50px 0px;
}

.router-link-exact-active {
  color: #00e6cf;
  /* filter: blur(10px); */
  /* background: linear-gradient(
    90deg,
    rgba(0, 229, 206, 0.2) 0%,
    rgba(0, 0, 0, 0.1) 15%
  ); */
  /* cursor: pointer;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgb(0, 0, 0, 0.1); */
}

ul::-webkit-scrollbar-track {
  /* background-color: rgb(36, 102, 163); */
  margin-bottom: 10px;
}
</style>