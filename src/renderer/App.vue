<template>
  <div
    id="content-body"
    class="bg-gray-800 select-none"
    :class="theme"
    @click.right="rightClick"
    @contextmenu.prevent
  >
    <Content id="content" />
  </div>
</template>

<script>
import Content from './views/Content';

export default {
  name: 'App',

  components: {
    Content
  },
  data() {
    return {
      // theme: 'dark' // 'dark' or null
      theme: 'theme-default-dark'
    };
  },
  methods: {
    rightClick(e) {
      console.log(e);
      console.log(e.target.classList.value.includes('song-row-item'));
    }
  },
  created() {
    this.$store.dispatch('library/loadLibrary');
  }
};
</script>

<style>
body::-webkit-scrollbar {
  display: none;
}

.point-to-me {
  pointer-events: all;
}
</style>
