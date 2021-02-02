<template>
  <div class="text-gray-400 hover:bg-gray-700 h-14 p-2">
    <div class="flex flex-row justify-items-start">
      <!-- <div class="w-12 flex items-center ml-2">
        <div class="align-middle">
          {{ index + 1 }}
        </div>
      </div> -->

      <div class="w-4/12">
        <div class="flex items-center">
          <!-- {{ log(song) }} -->
          <img
            class="w-10 h-10 bg-cover shadow-2xl"
            :src="`data:image/jpg;base64, ${source.songs[0].albumArt.image64}`"
          />

          <div class="pl-2 flex flex-col">
            <div>
              {{ truncate(source.songs ? source.songs[0].title : "nope") }}
            </div>
            <router-link
              v-if="source.songs[0].artist"
              :to="`/artist/${source.songs[0].artist}`"
              class="text-sm"
            >
              {{ truncate(source.songs[0].artist) }}
            </router-link>
            <div v-else class="text-sm">...</div>
          </div>
        </div>
      </div>

      <div class="w-4/12 flex items-center">
        {{ truncate(source.songs ? source.songs[0].album : "nope") }}
      </div>
      <!-- <div>Sometdin</div> -->
      <div class="flex justify-around items-center h-10 w-4/12">
        <div class="flex">
          <div class="mdi mdi-heart-outline hover:text-red-500"></div>
          <div class="pl-2 pr-2">
            <!-- Todo: make this accurate -->
            {{ Math.floor(source.songs[0].length / 60) }}:{{
              Math.round(source.songs[0].length) % 60
            }}
          </div>
          <div class="relative">
            <div
              class="mdi mdi-dots-horizontal hover:text-white select-auto"
            ></div>
            <!-- <div
              class="mdi mdi-dots-horizontal hover:text-white select-auto"
              v-on:click="showOptions(song, index)"
            ></div> -->
            <!-- <div
              v-if="songToShowOptions === index"
              class="absolute h-auto w-48 bg-gray-900 rounded-sm shadow-2xl top-8 -left-24 z-50"
            >
              <div class="mdi mdi-heart-outline p-2 hover:text-red-500">
                Stuff
              </div>
              <div class="p-2 hover:text-gray-200 hover:bg-gray-600">Stuff</div>
              <div class="p-2 hover:text-gray-200 hover:bg-gray-600">Stuff</div>
              <div class="p-2 hover:text-gray-200 hover:bg-gray-600">Stuff</div>
              <div class="p-2 hover:text-gray-200 hover:bg-gray-600">Stuff</div>
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
            </div> -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SongRow',
  props: {
    index: Number,
    source: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  data() {
    return {
      maxLength: 40
    };
  },
  created() {
    // console.log(this.source);
  },
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

<style lang="scss" scoped>
</style>