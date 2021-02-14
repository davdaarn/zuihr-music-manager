<template>
  <div
    class="text-white bg-gray-900 hover:text-active cursor-pointer"
    :style="{ top: top, left: left }"
  >
    <div class="mdi mdi-heart-outline p-2 hover:text-red-500">Stuff</div>
    <div class="p-2 hover:text-gray-200 hover:bg-gray-600">Stuff</div>
    <div class="p-2 hover:text-gray-200 hover:bg-gray-600">Stuff</div>
    <div class="p-2 hover:text-gray-200 hover:bg-gray-600">Stuff</div>
    <div class="p-2 hover:text-gray-200 hover:bg-gray-600">Stuff</div>
    <hr />
    <div class="p-2 hover:text-gray-200 hover:bg-gray-600">Other Stuff</div>
    <div class="p-2 hover:text-gray-200 hover:bg-gray-600">Other Stuff</div>
    <div class="p-2 hover:text-gray-200 hover:bg-gray-600">Other Stuff</div>
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
    }
  },
  computed: {
    ...mapState({
      top: state => state.app.contextMenuData.event.clientY + 'px',
      left: state => state.app.contextMenuData.event.clientX + 'px'
    })
  },
  created() {
    console.log('menu created');
    // console.log(this.source.event.clientX, this.source.event.clientY);
    // this.top = this.source.event.clientY + 'px';
    // this.left = this.source.event.clientX + 'px';
  }
};
</script>

<style lang="sass" scoped>
</style>