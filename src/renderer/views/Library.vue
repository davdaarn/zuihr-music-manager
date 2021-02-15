// Todo: fiqure out why Vuter extention hates this file
<template>
  <div class="flex flex-col">
    <!-- header -->
    <div class="w-full h-48 relative">
      <!-- Header backbround 1 -->
      <div
        class="w-full h-full bg-cover bg-fixed shadow-2xl"
        :style="{ background: getBackground() }"
      ></div>
      <div class="img-blur w-full h-full absolute top-0"></div>

      <!-- Header backbround 2 -->
      <!-- <img
        v-if="songInFocus"
        class="w-full h-full shadow-2xl rounded-lg header-image-bg"
        :src="`data:image/jpg;base64, ${songInFocus.songs[0].albumArt.image256}`"
      />
      <div class="img-blur w-full h-full absolute top-0"></div> -->

      <!-- Image Highlight -->
      <div
        v-if="songs && songs.length > 0 && songInFocus"
        class="absolute top-10 inset-x-10 flex"
      >
        <div class="relative">
          <img
            class="w-32 h-32 bg-cover shadow-2xl rounded-lg"
            :src="`data:image/jpg;base64, ${songInFocus.songs[0].albumArt.image256}`"
          />
          <!-- <div
            class="absolute mdi mdi-play-circle text-theme-text-active hover:text-active text-5xl top-32 right-6 shadow-2xl rounded-full"
            @click="playThis"
          ></div> -->
        </div>
        <div
          class="flex flex-col glex-grow pl-6 justify-between my-4"
          style="text-shadow: #33333399 0 0 10px"
        >
          <div class="text-gray-300 text-4xl">
            {{ truncate(songInFocus.songs[0].title) || "" }}
          </div>
          <div class="text-gray-300 text-xl pt-4 pl-2">
            {{ songInFocus.songs[0].artist || "" }}
          </div>
        </div>
      </div>
      <!--  -->
    </div>

    <!-- controls -->
    <div class="px-4 py-3">
      <div
        class="flex justify-between mx-4 text-theme-text-active items-center"
      >
        <!-- Left Side -->
        <div>
          <!-- Todo: incorporate debounce time -->
          <input
            type="text"
            placeholder="Search"
            class="px-4 py-2 rounded-md bg-blueGray-800 focus:outline-none border border-solid border-blueGray-800 focus:border-active disabled:opacity-25"
            :disabled="songs.length < 1 ? true : false"
            v-model="userSearch"
          />
        </div>
        <!-- center -->
        <div>
          <!-- <div>{{ songs.length }} songs in library</div> -->
        </div>
        <!-- Right Side -->
        <div class="flex items-center">
          <div
            class="mx-2 mdi mdi-plus text-2xl hover:text-active cursor-pointer"
            title="Add New Songs"
            @click="toggleOpen(!manualOpen)"
          ></div>
          <div
            class="mx-2 mdi mdi-refresh text-xl hover:text-active cursor-pointer"
            title="Refresh List"
            @click="reloadLibrary()"
          ></div>
        </div>
      </div>
    </div>

    <!-- content header -->
    <div class="text-gray-300 h-14 px-4">
      <div class="flex flex-row justify-items-start px-2">
        <div class="w-12 flex items-center mx-2 flex-none">#</div>
        <div class="w-4/12 flex items-center">Song</div>
        <div class="w-4/12 flex items-center">Album</div>
        <div class="w-2/12 flex items-center">Rating</div>
        <div
          class="flex justify-around items-center h-10 w-4/12 mdi mdi-clock-outline"
        ></div>
      </div>
      <div
        class="h-0.5 z-50"
        :class="processing ? 'processing' : 'inactive'"
      ></div>
    </div>

    <!-- Contents -->
    <div
      id="drag-zone"
      class="px-4 pt-4 pb-1 h-full w-full overflow-hidden"
      @dragenter.prevent="updateDragZoneStyles"
      @dragleave.prevent="updateDragZoneStyles"
      @dragover.prevent
      @drop.prevent="updateDragZoneStyles"
    >
      <div
        v-if="!dragZoneActive && !processing && !manualOpen && songs.length > 0"
        class="overflow-y-scroll h-full pointer-event-none root"
        @scroll="clearMenu"
        ref="root"
      >
        <div ref="viewport" :style="viewportStyle" class="">
          <div ref="spacer" :style="spacerStyle" class="">
            <SongRow
              class=""
              v-for="(song, index) in visibleItems"
              :key="index"
              :source="song"
              :index="startIndex + index"
            ></SongRow>
            <div class="h-14 p-2 spacer"></div>
            <div class="h-14 p-2 spacer"></div>
          </div>
        </div>
      </div>

      <div
        v-else-if="
          dragZoneActive || processing || manualOpen || songs.length < 1
        "
        class="h-full w-full flex justify-center items-center text-gray-300 drag-zone pointer-events-none"
      >
        <div
          class="w-5/6 h-5/6 border-dashed border-4 border-gray-600 rounded-md shadow-md flex flex-col justify-center items-center"
          :class="{ 'bg-gray-600 opacity-75': dragZoneActive }"
        >
          <div
            v-if="!dragZoneActive && !processing"
            class="flex flex-col justify-center items-center"
          >
            <div class="p-2 text-2xl">Drag Your Music Here!</div>
            <!-- <div class="p-2 text-2xl">Or</div>
            <div class="p-2 text-2xl">Click The Plus Button!</div> -->
          </div>

          <div
            v-else-if="dragZoneActive"
            class="mdi mdi-plus text-9xl text-gray-800"
          ></div>

          <div
            v-else-if="
              (!dragZoneActive && processing) || (!dragZoneActive && manualOpen)
            "
          >
            <div
              class="mdi mdi-close text-2xl"
              @click="toggleOpen(false)"
            ></div>
            <div class="text-2xl m-2">
              Discovered
              <span class="text-active mx-2 text-3xl">{{
                songsToProcessCount
              }}</span>
              Songs!
            </div>

            <div class="text-2xl m-2">
              Processing Song:
              <span class="text-active mx-2 text-3xl">{{
                processingSongNumber
              }}</span>
            </div>

            <div class="text-2xl m-2">
              Songs Added:
              <span class="text-active mx-2 text-3xl">{{
                songsAddedCount
              }}</span>
            </div>

            <div class="text-2xl m-2">
              Duplicates Found:
              <span class="text-yellow-600 mx-2 text-3xl">{{
                duplicateSongCount
              }}</span>
            </div>

            <div class="text-2xl m-2">
              Songs Already In Library:
              <span class="text-yellow-600 mx-2 text-3xl">{{
                existingSongCount
              }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- End Contents -->
  </div>
</template>

<script>
// todo anything in the template referencing .songs[0] call method instead
import placeHolderImage from '../assets/lava.jpeg';
import SongRow from '../components/SongRow';
import { mapState } from 'vuex';
import _ from 'lodash';

const emptyMenu = {
  isActive: false,
  classList: 'pointer-events-none',
  event: null
};

const passiveSupportMixin = {
  methods: {
    // This snippet is taken straight from https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener
    // It will only work on browser so if you are using in an SSR environment, keep your eyes open
    doesBrowserSupportPassiveScroll() {
      let passiveSupported = false;

      try {
        const options = {
          get passive() {
            // This function will be called when the browser
            //   attempts to access the passive property.
            passiveSupported = true;
            return false;
          }
        };
      } catch (err) {
        passiveSupported = false;
      }
      return passiveSupported;
    }
  }
};

export default {
  name: 'Library',
  mixins: [passiveSupportMixin],
  components: {
    SongRow
  },
  data() {
    return {
      songComponent: SongRow,
      placeHolderImage: placeHolderImage,
      // emptyArr: new Array(10).fill(-1),
      maxLength: 40,
      focusedSong: 0,
      songs: [],
      filteredSongs: [],
      showPlayPauseButton: null,
      totalContentHeight: null,
      rowHeight: 55.99,
      scrollTop: 0,
      nodePadding: 0,
      rootHeight: 1500,
      railMode: 'incative',
      dragZoneActive: false,
      manualOpen: false,
      userSearch: ''
      // processing: false
      // songsToProcessCount: 0
    };
  },
  computed: {
    //
    ...mapState({
      songInFocus: state => state.app.songInFocus,

      library: state => state.library.library,
      processing: state => state.library.processing,
      isLibraryDirty: state => state.library.isDirty,
      songsAddedCount: state => state.library.songsAddedCount,
      existingSongCount: state => state.library.existingSongCount,
      duplicateSongCount: state => state.library.duplicateSongCount,
      songsToProcessCount: state => state.library.songsToProcessCount,
      processingSongNumber: state => state.library.processingSongNumber
      // todo: maybe this should stay local...
      // filteredSongs: state => state.library.filteredSongs
    }),
    //
    /**
    Total height of the viewport = number of items in the array x height of each item
    */
    viewportHeight() {
      return this.itemCount * this.rowHeight;
    },
    /**
    Out of all the items in the massive array, we only render a subset of them
    This is the starting index from which we show a few items
    */
    startIndex() {
      let startNode =
        Math.floor(this.scrollTop / this.rowHeight) - this.nodePadding;
      startNode = Math.max(0, startNode);
      return startNode;
    },
    /**
    This is the number of items we show after the starting index
    If the array has a total 10000 items, we want to show items from say index 1049 till 1069
    visible node count is that number 20 and starting index is 1049
    */
    visibleNodeCount() {
      let count =
        Math.ceil(this.rootHeight / this.rowHeight) + 2 * this.nodePadding;
      count = Math.min(this.itemCount - this.startIndex, count);
      return count;
    },
    /**
    Subset of items shown from the full array
    */
    visibleItems() {
      return this.filteredSongs.slice(
        this.startIndex,
        this.startIndex + this.visibleNodeCount
      );
    },
    itemCount() {
      return this.filteredSongs.length + 2;
    },
    /**
    The amount by which we need to translateY the items shown on the screen so that the scrollbar shows up correctly
    */
    offsetY() {
      return this.startIndex * this.rowHeight;
    },
    /**
    This is the direct list container, we apply a translateY to this
    */
    spacerStyle() {
      return {
        transform: 'translateY(' + this.offsetY + 'px)'
      };
    },
    viewportStyle() {
      return {
        overflow: 'hidden',
        height: this.viewportHeight + 'px',
        position: 'relative'
      };
    },
    rootStyle() {
      return {
        height: this.rootHeight + 'px',
        overflow: 'auto'
      };
    }
  },
  watch: {
    '$store.state.library.library'(state) {
      this.songs = state;
      this.filteredSongs = state;
    },

    '$store.state.app.songInFocusIndex'(state) {
      this.focusedSong = state;
    },

    songs: function(newsongs, oldsongs) {
      this.totalContentHeight = newsongs.length * this.rowHeight;
    },

    userSearch: _.debounce(function(e) {
      let query = this.userSearch;
      if (query.length < 1 || typeof query === 'undefined' || query === null) {
        if (this.filteredSongs.length < this.songs.length) {
          this.filteredSongs = this.songs;
          // this.$store.dispatch('library/setFilteredSongs', this.songs);
        }
        // ignore empty or whitespace
      } else if (query.replace(/\s*/g, '').length < 1) {
        if (this.filteredSongs.length < this.songs.length) {
          // this.filteredSongs = this.songs;
          // this.$store.dispatch('library/setFilteredSongs', this.songs);
        }
      } else {
        let filteredSongs = this.songs.filter(s => {
          return s._id.toLowerCase().includes(query.toLowerCase());
        });
        this.filteredSongs = filteredSongs;
        // this.$store.dispatch('library/setFilteredSongs', filteredSongs);
      }
    }, 300)
  },
  methods: {
    log(d) {
      console.log(d);
    },
    toggleOpen(value) {
      this.manualOpen = value;
    },
    reloadLibrary() {
      this.$store.dispatch('library/loadLibrary');
    },
    updateDragZoneStyles(event) {
      // console.log(event);
      console.log(event.type, event.target.id);
      if (event.target.id === 'drag-zone') {
        if (event.type === 'dragenter') {
          this.dragZoneActive = true;
        } else if (event.type === 'drop') {
          this.dragZoneActive = false;

          // when dragged from desktop
          // Todo: handle drag from computer or from app
          let paths = [];
          event.dataTransfer.files.forEach(file => {
            paths.push(file.path);
          });

          this.$store.dispatch('library/findSongs', paths).then(x => {
            console.log(x);
          });
        } else {
          this.dragZoneActive = false;
        }
      }
    },
    findSongs() {},
    shadow() {
      return '';
    },
    handleScroll(event) {
      this.scrollTop = this.$refs.root.scrollTop;
    },
    handleResize() {
      this.rootHeight = this.$refs.root.clientHeight;
    },
    playThis() {
      this.$store.dispatch('player/playThis', songInFocus);
    },
    getBackground() {
      if (
        this.songInFocus !== null &&
        this.songInFocus &&
        this.songInFocus.songs[0].colorPalette
      ) {
        let p = this.songInFocus.songs[0].colorPalette;
        return `linear-gradient(45deg, ${p.DarkMuted.hex}, ${p.DarkMuted.hex}, ${p.DarkMuted.hex})`;
      }

      return '#27272a';
    },
    getBackgroundImage() {
      if (
        this.songInFocus !== null &&
        this.songInFocus &&
        this.songInFocus.songs[0].albumArt
      ) {
        console.log(this.songInFocus.songs[0].albumArt);
        return this.songInFocus.songs[0].albumArt.image64;

        // let buffer = Buffer.from(
        //   this.filteredSongs[this.focusedSong].songs[0].albumArt.image64
        // );

        // console.log(buffer);

        // let blob = null;

        // try {
        //   blob = new Blob([...buffer], {
        //     type:
        //       this.filteredSongs[this.focusedSong].songs[0].albumArt.format ||
        //       'image/jpeg'
        //   });
        //   console.log(blob);
        // } catch (error) {
        //   console.log(error);
        // }

        // if (blob) {
        //   let urlCreator = window.URL || window.webkitURL;
        //   let url = urlCreator.createObjectURL(blob);
        //   console.log(url);
        //   return `url(${url})`;
        // }

        // let p = this.filteredSongs[this.focusedSong].songs[0].colorPalette;
        // return `linear-gradient(45deg, ${p.DarkMuted.hex}, ${p.DarkMuted.hex}, ${p.DarkMuted.hex})`;
      }

      return '#383838';
    },
    // renderImage(song) {
    //   if (song.songs[0].albumArt.image64) {
    //     let buffer = Buffer.from(song.songs[0].albumArt.image256);
    //     let blob = new Blob([buffer], {
    //       type: song.songs[0].albumArt.format
    //     });
    //     let urlCreator = window.URL || window.webkitURL;
    //     let url = urlCreator.createObjectURL(blob);
    //     console.log(url);
    //     return url;
    //   }
    //   return this.placeHolderImage;
    // },
    truncate(text) {
      if (text.length > this.maxLength) {
        return text.substring(0, this.maxLength) + '...';
      } else {
        return text;
      }
    },
    clearMenu() {
      this.$store.dispatch('app/setContextMenuData', emptyMenu);
    }
  },
  created() {
    this.songs = this.$store.state.library.library;
    this.filteredSongs = this.songs;
  },
  mounted() {
    // todo: maybe replce with v-on:scroll.capture ???
    this.$refs.root.addEventListener(
      'scroll',
      this.handleScroll,
      this.doesBrowserSupportPassiveScroll() ? { passive: true } : false
    );

    window.addEventListener('resize', this.handleResize);

    this.rootHeight = this.$refs.root.clientHeight;
    if (this.$refs && this.$refs.spacer && this.$refs.spacer.children[0]) {
      this.rowHeight = this.$refs.spacer.children[0].clientHeight || 55.9;
    }
    // console.log();
    // const largestHeight = this.calculateInitialRowHeight();
    // this.rowHeight =
    //   typeof largestHeight !== 'undefined' && largestHeight !== null
    //     ? largestHeight
    //     : 30;
  },
  ready: function() {},
  beforeDestroy() {
    if (this.$refs.root) {
      this.$refs.root.removeEventListener('scroll', this.handleScroll);
    }

    window.removeEventListener('resize', this.handleResize);
  }
};
</script>

<style scoped lang="scss">
.picker {
  z-index: 100;
}

.blurred {
  filter: blur(50px);
}

.search {
  border: 1px solid #00000000;
}

.search:focus {
  border: 1px solid #00e6cf;
}

.header-image-bg {
  object-fit: cover;
}

.drag-zone::after {
  // content: "Drag Your Music Here Or Click The Plus Icon";
}

///////////////////////////////

.inactive {
  background: #00e6cf63;
}

.processing {
  background: linear-gradient(
    to right,
    #00e6cf63,
    #00e6cf63,
    #00e6cf63,
    #00e6cf63,
    #00e6cf63,
    #00e6cf,
    #00e6cf63,
    #00e6cf63,
    #00e6cf63,
    #00e6cf63,
    #00e6cf63
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

input[type="number"]::-webkit-inner-spin-button {
  -webkit-appearance: none;
}
input[type="number"]::-webkit-outer-spin-button {
  -webkit-appearance: none;
}

.img-blur {
  content: "";
  background-image: linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.1));
  // backdrop-filter: blur(40px);
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