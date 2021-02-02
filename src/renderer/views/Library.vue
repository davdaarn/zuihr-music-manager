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
        <div class="mdi mdi-refresh text-xl"></div>
      </div>
    </div>
    <!--  -->
    <div class="px-4 overflow-hidden">
      {{ log("redraw...") }}
      {{ log(visibleItems.length) }}
      <div class="overflow-y-scroll h-full" ref="root">
        <div ref="viewport" :style="viewportStyle">
          <div ref="spacer" :style="spacerStyle">
            <SongRow
              v-for="(song, index) in visibleItems"
              :key="index"
              :source="song"
              :index="index"
            ></SongRow>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// todo anything in the template referencing .songs[0] call method instead
import placeHolderImage from '../assets/lava.jpeg';
import SongRow from '../components/SongRow';
import { mapState } from 'vuex';

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

        window.addEventListener('test', null, options);
        window.removeEventListener('test', null, options);
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
    // 'virtual-list': VirtualListSongRowSongRow,
    SongRow
  },
  data() {
    return {
      songComponent: SongRow,
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
      showPlayPauseButton: null,
      totalContentHeight: null,
      rowHeight: 55.99, // Todo: do better than this...
      scrollTop: 0,
      nodePadding: 20,
      rootHeight: 400
    };
  },
  computed: {
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
      return this.songs.slice(
        this.startIndex,
        this.startIndex + this.visibleNodeCount
      );
    },
    itemCount() {
      return this.songs.length;
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
      console.log('watching state...');
      this.songs = state;
      this.filteredSongs = state.slice(0, this.songsPerPage);
      console.log(this.songs);
    },
    songs: function(newsongs, oldsongs) {
      console.log(newsongs.length, oldsongs.length);
      this.totalContentHeight = newsongs.length * this.rowHeight;
      console.log(this.totalContentHeight);
    }
  },
  methods: {
    log(d) {
      console.log(d);
    },
    handleScroll(event) {
      console.log('scrolling');
      this.scrollTop = this.$refs.root.scrollTop;
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

    // this.filteredSongs = this.songs.slice(0, this.songsPerPage);
  },
  mounted() {
    this.$refs.root.addEventListener(
      'scroll',
      this.handleScroll,
      this.doesBrowserSupportPassiveScroll() ? { passive: true } : false
    );
    this.rootHeight = this.$refs.root.clientHeight;
    // console.log();

    // const largestHeight = this.calculateInitialRowHeight();
    // this.rowHeight =
    //   typeof largestHeight !== 'undefined' && largestHeight !== null
    //     ? largestHeight
    //     : 30;
  },
  destroyed() {
    // this.$refs.root.removeEventListener('scroll', this.handleScroll);
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