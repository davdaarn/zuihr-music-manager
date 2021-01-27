<template>
  <div class="text-white">Hello {{ artist }}</div>
</template>

<script>
export default {
  data() {
    return {
      artist: this.$route.params.artist
    };
  }
};
</script>

<style>
</style>