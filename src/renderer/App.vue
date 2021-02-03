<template>
  <!-- <v-app id="content-body" class="bg-gray-800 select-none" :class="theme"> -->
  <div id="content-body" class="bg-gray-800 select-none" :class="theme">
    <Content id="content" />
  </div>
  <!-- </v-app> -->
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
    // if (this.$db) {
    this.$store.dispatch('library/loadLibrary');
    // }
  }
};
</script>

<style>
body::-webkit-scrollbar {
  display: none;
}
</style>
