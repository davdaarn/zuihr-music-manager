<template>
  <div class="w-full h-6 bg-gray-900 flex text-gray-500">
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
export default {
  name: 'StatusBar'
};
</script>

<style>
</style>