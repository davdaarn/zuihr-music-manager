<template>
  <div class="flex flex-col">
    <!-- header -->
    <div class="w-full h-64 relative">
      <div
        class="w-full h-full bg-cover bg-fixed shadow-2xl"
        :style="{ background: getBackground() }"
      ></div>
      <!-- Image Highlight -->
      <div
        v-if="songs && songs.length > 0 && focusedSong !== null"
        class="absolute inset-y-1/4 inset-x-10 flex"
      >
        <div class="relative">
          <img
            class="w-40 h-40 bg-cover shadow-2xl rounded-lg"
            :src="`data:image/jpg;base64, ${songs[focusedSong].songs[0].albumArt.image256}`"
          />
          <div
            class="absolute mdi mdi-play-circle text-theme-text-active hover:text-green-500 text-5xl top-32 right-6 shadow-2xl rounded-full"
            @click="playThis"
          ></div>
        </div>
        <div class="flex flex-col glex-grow pl-6">
          <div class="flex-grow"></div>
          <div class="text-gray-300 text-7xl">
            {{ songs[focusedSong].songs[0].title }}
          </div>
          <div class="text-gray-300 text-xl pt-4 pl-2">
            {{ songs[focusedSong].songs[0].artist }}
          </div>
        </div>
      </div>
      <!--  -->
    </div>

    <div class="px-4 py-4">
      <!-- controls -->
      <div
        class="flex justify-end space-x-4 text-theme-text-active items-center"
      >
        <div>Songs per page:</div>

        <div
          class="flex relative items-center cursor-pointer hover:bg-gray-700 translate hover:text-green-400"
          class:bg-gray-600="showRowsPerPage"
          @click="songsPerPageDropDown"
        >
          <div class="w-12 ml-1">{{ songsPerPage }}</div>
          <div
            class="mdi pl-2 text-2xl"
            :class="showRowsPerPage ? 'mdi-menu-left' : 'mdi-menu-down'"
          ></div>
          <div
            v-if="showRowsPerPage"
            class="absolute h-auto w-14 bg-gray-900 rounded-sm shadow-2xl top-8 flex flex-col items-center hover:text-theme-text-active text-theme-text-active picker"
          >
            <div
              class="p-2 hover:text-green-400 cursor-pointer"
              @click="updateSongsPerPage(10)"
            >
              10
            </div>
            <div
              class="p-2 hover:text-green-400 cursor-pointer"
              @click="updateSongsPerPage(50)"
            >
              50
            </div>
            <div
              class="p-2 hover:text-green-400 cursor-pointer"
              @click="updateSongsPerPage(100)"
            >
              100
            </div>
            <div
              class="p-2 hover:text-green-400 cursor-pointer"
              @click="updateSongsPerPage(200)"
            >
              200
            </div>
            <div
              class="p-2 hover:text-green-400 cursor-pointer"
              @click="updateSongsPerPage(500)"
            >
              500
            </div>
            <div
              class="p-2 hover:text-green-400 cursor-pointer"
              @click="updateSongsPerPage(1000)"
            >
              1000
            </div>
          </div>
        </div>

        <div>1-100 of 13492</div>
        <div class="mdi mdi-chevron-left text-xl"></div>
        <div class="mdi mdi-chevron-right text-xl"></div>
        <div class="mdi mdi-refresh text-xl"></div>
      </div>
    </div>
    <!--  -->
    <div class="px-4 overflow-y-auto">
      {{ log("redraw 1") }}
      <table class="w-full text-theme-text-active text-left h-full">
        <thead class="">
          <tr class="h-20 z-50">
            <th class="bg-gray-800">#</th>
            <th class="bg-gray-800">Title</th>
            <th class="bg-gray-800">Album</th>
            <th
              class="mdi mdi-clock-time-eight-outline text-center bg-gray-800"
            ></th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(song, index) in filteredSongs"
            :key="index"
            class="hover:bg-gray-700 items-center h-14"
            :class="[focusedSong === index ? 'bg-gray-600' : '']"
            @click="setFocusedSong(song, index)"
          >
            <td class="">{{ index + 1 }}</td>
            <td>
              <div class="flex items-center">
                <!-- {{ log(song) }} -->
                <img
                  class="w-10 h-10 bg-cover shadow-2xl"
                  :src="`data:image/jpg;base64, ${song.songs[0].albumArt.image64}`"
                />

                <div class="pl-2">
                  <div>
                    {{ truncate(song.songs ? song.songs[0].title : "nope") }}
                  </div>
                  <router-link
                    v-if="song.songs[0].artist"
                    :to="`/artist/${song.songs[0].artist}`"
                    class="text-sm"
                  >
                    {{ truncate(song.songs[0].artist) }}
                  </router-link>
                  <div v-else class="text-sm">...</div>
                </div>
              </div>
            </td>
            <td>
              {{ truncate(song.songs ? song.songs[0].album : "nope") }}
            </td>
            <!-- <td>Sometdin</td> -->
            <td class="flex justify-around items-center h-10">
              <div class="flex">
                <div class="mdi mdi-heart-outline hover:text-red-500"></div>
                <div class="pl-2 pr-2">
                  <!-- Todo: make this accurate -->
                  {{ Math.floor(song.songs[0].length / 60) }}:{{
                    Math.round(song.songs[0].length) % 60
                  }}
                </div>
                <div class="relative">
                  <div
                    class="mdi mdi-dots-horizontal hover:text-white select-auto"
                    v-on:click="showOptions(song, index)"
                  ></div>
                  <div
                    v-if="songToShowOptions === index"
                    class="absolute h-auto w-48 bg-gray-900 rounded-sm shadow-2xl top-8 -left-24 z-50"
                  >
                    <div class="mdi mdi-heart-outline p-2 hover:text-red-500">
                      Stuff
                    </div>
                    <div class="p-2 hover:text-gray-200 hover:bg-gray-600">
                      Stuff
                    </div>
                    <div class="p-2 hover:text-gray-200 hover:bg-gray-600">
                      Stuff
                    </div>
                    <div class="p-2 hover:text-gray-200 hover:bg-gray-600">
                      Stuff
                    </div>
                    <div class="p-2 hover:text-gray-200 hover:bg-gray-600">
                      Stuff
                    </div>
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
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
// todo anything in the template referencing .songs[0] call method instead
import placeHolderImage from '../assets/lava.jpeg';
import { mapState } from 'vuex';
export default {
  name: 'Library',
  data() {
    return {
      placeHolderImage: placeHolderImage,
      emptyArr: new Array(10).fill(-1),
      songToShowOptions: null,
      maxLength: 40,
      showRowsPerPage: false,
      currentPage: 1,
      songsPerPage: 50, // Todo: $db.settings.songsPerPage
      focusedSong: 0,
      songs: [],
      filteredSongs: [],
      showPlayPauseButton: null
    };
  },
  computed: {},
  watch: {
    '$store.state.library.library'(state) {
      console.log('watching state...');
      this.songs = state;
      this.filteredSongs = state.slice(0, this.songsPerPage);
    }
  },
  methods: {
    log(d) {
      console.log(d);
    },
    playThis() {
      this.$store.dispatch('player/playThis', this.songs[this.focusedSong]);
    },

    getBackground() {
      // console.log(this.focusedSong);
      // console.log(this.songs[this.focusedSong]);

      if (
        this.focusedSong !== null &&
        this.songs[this.focusedSong] &&
        this.songs[this.focusedSong].songs[0].colorPalette
      ) {
        let p = this.songs[this.focusedSong].songs[0].colorPalette;
        return `linear-gradient(45deg, ${p.Vibrant.hex}, ${p.Vibrant.hex}, ${p.LightVibrant.hex})`;
      }

      return 'linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab)';
    },
    renderImage(song) {
      // console.log('cheese');
      // console.log(song.songs[0].albumArt.image64);
      if (song.songs[0].albumArt.image64) {
        let buffer = Buffer.from(song.songs[0].albumArt.image64);
        let blob = new Blob([buffer], {
          type: song.songs[0].albumArt.format
        });
        let urlCreator = window.URL || window.webkitURL;
        let url = urlCreator.createObjectURL(blob);
        // console.log(url);
        return url;
      }
      return this.placeHolderImage;
    },
    setFocusedSong(song, index) {
      this.focusedSong = index;
      this.$store.dispatch('app/setSongInFocus', { song });
    },
    songToShow() {
      return this.$store.state.allSongs;
    },
    songsPerPageDropDown() {
      this.showRowsPerPage = !this.showRowsPerPage;
    },
    updateSongsPerPage(count) {
      this.songsPerPage = count;
      this.filteredSongs = this.songs.slice(0, count);
    },
    truncate(text) {
      if (text.length > this.maxLength) {
        return text.substring(0, this.maxLength) + '...';
      } else {
        return text;
      }
    },
    showOptions(song, index) {
      if (this.songToShowOptions === index) {
        this.songToShowOptions = null;
      } else {
        this.songToShowOptions = index;
      }
      // console.log(song, index);
    },
    mouseup(e) {
      console.log(e);
    },
    mousedown(e) {
      console.log(e);
    }
  },
  created() {
    this.songs = this.$store.state.library.library;
    this.filteredSongs = this.songs.slice(0, this.songsPerPage);
  }
};
</script>

<style scoped>
.picker {
  z-index: 100;
}

input[type="number"]::-webkit-inner-spin-button {
  -webkit-appearance: none;
}
input[type="number"]::-webkit-outer-spin-button {
  -webkit-appearance: none;
}

.img-blur {
  content: "";
  /* box-shadow: 0 0 1rem 0 black; */
  /* background-color: rgba(0, 0, 0, 0.5); */
  background-image: linear-gradient(
    rgba(55, 65, 81, 0.3),
    rgba(31, 41, 55, 0.5),
    rgba(31, 41, 55, 0.7)
  );
  backdrop-filter: blur(30px);
}

th {
  position: sticky;
  top: 0;
  /* margin-bottom: 4em; */
  z-index: 50;
}

table {
  text-align: left;
  position: relative;
  border-collapse: collapse;
}
</style>