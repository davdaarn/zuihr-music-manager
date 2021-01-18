<template>
  <div
    id="content-body"
    class="bg-gradient-to-b from-gray-700 to-gray-900"
    :class="theme"
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
  }
};
</script>

<style>
body::-webkit-scrollbar {
  display: none;
}
</style>
