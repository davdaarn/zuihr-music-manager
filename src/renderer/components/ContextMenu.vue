<template>
  <div
    class="text-gray-300 bg-gray-800 rounded-lg p-2 shadow-2xl w-60 border border-blueGray-500"
    :style="{ top: top, left: left }"
    @click.stop
    ref="root"
  >
    <div class="">
      <div class="p-3 hover:bg-blueGray-700 rounded cursor-pointer" @click.stop>
        Add to playlist
      </div>
      <div class="p-3 pt-0 h-40 rounded cursor-pointer" @click.stop>
        <ul class="h-full overflow-auto flex flex-col">
          <div
            v-for="(item, index) in items"
            :key="index"
            class="hover:bg-blueGray-700 w-full flex items-center"
            :to="`/playlist/${index}`"
          >
            <div
              class="mdi text-2xl hover:text-active"
              :class="item.icon"
            ></div>
            <span class="px-4 py-1">{{ truncate(item.text) }}</span>
          </div>
        </ul>
      </div>
    </div>
    <div class="p-3 hover:bg-blueGray-700 rounded cursor-pointer" @click.stop>
      Tags
    </div>
    <hr @click.stop />
    <!-- <div class="p-3 rounded cursor-pointer flex items-baseline" @click.stop>
      <div
        class="one h-4 w-4 bg-gray-600 m-1 hover:bg-active rounded-full"
      ></div>
      <div
        class="one h-4 w-4 bg-gray-600 m-1 hover:bg-active rounded-full"
      ></div>
      <div
        class="one h-4 w-4 bg-gray-600 m-1 hover:bg-active rounded-full"
      ></div>
      <div
        class="one h-4 w-4 bg-gray-600 m-1 hover:bg-active rounded-full"
      ></div>
      <div
        class="one h-4 w-4 bg-gray-600 m-1 hover:bg-active rounded-full"
      ></div>
      <div
        class="one h-4 w-4 bg-gray-600 m-1 hover:bg-active rounded-full"
      ></div>
      <div
        class="one h-4 w-4 bg-gray-600 m-1 hover:bg-active rounded-full"
      ></div>
      <div
        class="one h-4 w-4 bg-gray-600 m-1 hover:bg-active rounded-full"
      ></div>
      <div
        class="one h-4 w-4 bg-gray-600 m-1 hover:bg-active rounded-full"
      ></div>
      <div
        class="one h-4 w-4 bg-gray-600 m-1 hover:bg-active rounded-full"
      ></div>
    </div> -->
    <div class="p-3 hover:bg-blueGray-700 rounded cursor-pointer" @click.stop>
      Remove rating
    </div>
    <div class="p-3 hover:bg-blueGray-700 rounded cursor-pointer" @click.stop>
      Remove from library
    </div>
    <div class="p-3 hover:bg-blueGray-700 rounded cursor-pointer" @click.stop>
      Delete from device
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
export default {
  props: {
    source: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  data() {
    return {
      maxLength: 16,
      items: [
        { text: 'Oldies', icon: 'mdi-checkbox-marked' },
        {
          text: 'My Favorite Classic Video Game Soundtracks',
          icon: 'mdi-checkbox-marked'
        },
        { text: 'Coding Music', icon: 'mdi-checkbox-blank-outline' },
        { text: 'OST', icon: 'mdi-checkbox-blank-outline' },
        { text: 'Deep', icon: 'mdi-checkbox-marked' },
        { text: 'Hard Core', icon: 'mdi-checkbox-marked' },
        { text: 'Inspirational', icon: 'mdi-checkbox-blank-outline' },
        { text: 'Inspirational', icon: 'mdi-checkbox-blank-outline' },
        { text: 'Quiet Days', icon: 'mdi-checkbox-blank-outline' },
        { text: 'Feel Good', icon: 'mdi-checkbox-blank-outline' },
        { text: 'Fun', icon: 'mdi-checkbox-marked' }
      ]
    };
  },
  methods: {
    click() {
      console.log('I was clicked');
    },
    setMenu(value) {
      this.$store.dispatch('app/setContextMenuData', value);
    },
    truncate(text) {
      if (text.length > this.maxLength) {
        return text.substring(0, this.maxLength) + '...';
      } else {
        return text;
      }
    }
  },
  computed: {
    ...mapState({
      // top: state => state.app.contextMenuData.event.clientY + 'px',
      // left: state => state.app.contextMenuData.event.clientX + 'px',
      top: state => state.app.contextMenuData.Y + 'px',
      left: state => state.app.contextMenuData.X + 'px',
      contextMenuData: state => state.app.contextMenuData
    })
  },
  created() {},
  mounted() {
    let addjustedPosX = this.contextMenuData.X;
    let addjustedPosY = this.contextMenuData.Y;

    if (
      this.contextMenuData.X + this.$refs.root.clientWidth >
      document.body.offsetWidth
    ) {
      addjustedPosX =
        document.body.offsetWidth - this.$refs.root.clientWidth - 10;
    }

    if (
      this.contextMenuData.Y + this.$refs.root.clientHeight >
      document.body.offsetHeight - 100
    ) {
      addjustedPosY =
        document.body.offsetHeight - this.$refs.root.clientHeight - 100;
    }

    if (
      addjustedPosX !== this.contextMenuData.X ||
      addjustedPosY !== this.contextMenuData.Y
    ) {
      this.$store.dispatch('app/setContextPosition', {
        X: addjustedPosX,
        Y: addjustedPosY
      });
    }
  }
};
</script>

<style lang="sass" scoped>
.one
</style>