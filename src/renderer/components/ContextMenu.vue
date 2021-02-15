<template>
  <div
    class="text-gray-300 bg-gray-800 rounded-lg py-2 px-4 shadow-2xl w-40"
    :style="{ top: top, left: left }"
    @click.stop
    ref="root"
  >
    <div
      class="p-3 hover:text-active hover:bg-blueGray-700 rounded cursor-pointer"
      @click.stop
    >
      Stuff
    </div>
    <div
      class="p-3 hover:text-active hover:bg-blueGray-700 rounded cursor-pointer"
      @click.stop
    >
      Stuff
    </div>
    <div
      class="p-3 hover:text-active hover:bg-blueGray-700 rounded cursor-pointer"
      @click.stop
    >
      Stuff
    </div>
    <div
      class="p-3 hover:text-active hover:bg-blueGray-700 rounded cursor-pointer"
      @click.stop
    >
      Stuff
    </div>
    <hr @click.stop />
    <div
      class="p-3 hover:text-active hover:bg-blueGray-700 rounded cursor-pointer"
      @click.stop
    >
      Other Stuff
    </div>
    <div
      class="p-3 hover:text-active hover:bg-blueGray-700 rounded cursor-pointer"
      @click.stop
    >
      Other Stuff
    </div>
    <div
      class="p-3 hover:text-active hover:bg-blueGray-700 rounded cursor-pointer"
      @click.stop
    >
      Other Stuff
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
      // top: 0,
      // left: 0
    };
  },
  methods: {
    click() {
      console.log('I was clicked');
    },
    setMenu(value) {
      this.$store.dispatch('app/setContextMenuData', value);
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
</style>