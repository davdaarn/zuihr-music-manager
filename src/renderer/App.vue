<template>
  <div
    id="content-body"
    class="select-none bg-gradient-to-b from-coolGray-900 to-coolGray-800"
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
html {
  /* background-color: #00233b33; */
}
body::-webkit-scrollbar {
  display: none;
}

.point-to-me {
  pointer-events: all;
}

.router-link-exact-active {
  background-color: #475569;
  cursor: pointer;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
}
</style>
