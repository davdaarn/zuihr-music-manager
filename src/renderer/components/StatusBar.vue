<template>
  <div class="flex justify-between w-full h-6 bg-gray-900 text-gray-500">
    <!-- left -->
    <div></div>
    <!-- middle -->
    <div class="flex">
      <!-- <div>{{ songsToProcessCount }}</div> -->
    </div>
    <!-- right -->
    <div class="flex">
      <div
        class="mx-2 cursor-pointer hover:text-green-400 mdi mdi-head-snowflake-outline"
        title="Discover Mode Is Active"
      ></div>
      <div
        class="mx-2 cursor-pointer hover:text-green-400 mdi mdi-piggy-bank-outline"
        title="Donate To The Project"
      ></div>
      <div
        class="mx-2 cursor-pointer hover:text-green-400 mdi mdi-emoticon-happy-outline"
        title="Send Feedback"
      ></div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'StatusBar',
  data() {
    return {};
  },
  computed: {
    ...mapState({
      songsToProcessCount: state => state.library.songsToProcessCount
    })
  }
};
</script>

<style>
</style>