<template>
  <div id="content-body" :class="theme">
    <Content id="content" class="dark:bg-dark-primary " />
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
      theme: 'dark' // 'dark' or null
    };
  }
};
</script>

<style>
body::-webkit-scrollbar {
  display: none;
}
</style>
