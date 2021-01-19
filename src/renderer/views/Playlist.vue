<template>
  <div class="w-full h-full flex flex-col">
    <!-- header -->
    <div class="w-full h-64 relative">
      <div
        class="w-full h-full bg-cover bg-fixed shadow-2xl"
        :style="{ backgroundImage: `url(${placeHolderImage})` }"
      >
        <div class="img-blur w-full h-full"></div>
      </div>
      <!-- info -->
      <div class="absolute inset-y-1/4 inset-x-10 flex">
        <!-- <div class="flex-grow-0 w-48 h-48 img-wrap">
          <img
            :src="placeHolderImage"
            class="rounded-lg shadow-2xl h-full w-full bg-cover bg-fixed"
          />
        </div> -->
        <div
          class="w-40 h-40 bg-cover shadow-2xl rounded-lg"
          :style="{ backgroundImage: `url(${placeHolderImage})` }"
        ></div>
        <div class="flex flex-col glex-grow pl-6">
          <div class="flex-grow"></div>
          <div class="text-gray-300 text-7xl">
            Playlist ID:{{ $route.params.id }}
          </div>
          <div class="text-gray-300 p-2">some text skd</div>
        </div>
      </div>
      <!-- end info -->
    </div>
    <!-- list -->
    <div class="w-full h-full">
      <div class="pl-4 pr-4 pt-4 max-w-screen-2xl h-full">
        <table class="w-full text-theme-text-active text-left">
          <thead class="">
            <tr class="h-20">
              <th>#</th>
              <th>Title</th>
              <th>Album</th>
              <th>Somethin</th>
              <th class="mdi mdi-clock-time-eight-outline text-center"></th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(song, index) in emptyArr"
              :key="index"
              class="hover:bg-gray-700 select-none items-center h-14"
              @mouseup.right="mouseup"
              v-on:click="mousedown"
            >
              <td>{{ index + 1 }}</td>
              <td>
                <div class="flex items-center">
                  <div
                    class="w-10 h-10 bg-cover shadow-2xl"
                    :style="{ backgroundImage: `url(${placeHolderImage})` }"
                  ></div>

                  <div class="pl-2">
                    <div>Song Name</div>
                    <div>Artist</div>
                  </div>
                </div>
              </td>
              <td>Album</td>
              <td>Sometdin</td>
              <td class="flex justify-around items-center h-10">
                <div class="flex">
                  <div class="mdi mdi-heart-outline hover:text-red-500"></div>
                  <div class="pl-2 pr-2">4:18</div>
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
  </div>
</template>

<script>
import placeHolderImage from '../assets/lava.jpeg';
export default {
  name: 'Library',
  data() {
    return {
      test: 'test',
      placeHolderImage: placeHolderImage,
      emptyArr: new Array(10).fill(-1),
      songToShowOptions: null,
      id: this.$route.params.id
    };
  },
  methods: {
    showOptions(song, index) {
      if (this.songToShowOptions === index) {
        this.songToShowOptions = null;
      } else {
        this.songToShowOptions = index;
      }
      console.log(song, index);
    },
    mouseup(e) {
      console.log(e);
    },
    mousedown(e) {
      console.log(e);
    }
  },
  watch: {
    $route(to, from) {
      console.log(to, from);
    }
  }
};
</script>

<style scoped>
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
</style>
