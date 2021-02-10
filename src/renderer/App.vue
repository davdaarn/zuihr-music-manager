<template>
  <div id="content-body" class="bg-blueGray-800 select-none" :class="theme">
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
  created() {
    this.$store.dispatch('library/loadLibrary');
  }
};
</script>

<style>
body::-webkit-scrollbar {
  display: none;
}
</style>
