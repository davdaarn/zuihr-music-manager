<template>
  <div class="flex flex-col">
    <!-- Replace with a header -->
    <div class="h-20 bg-gray-400"></div>
    <div class="h-20 flex-grow p-4">
      <div class="h-full overflow-auto">
        <router-view class="h-full"></router-view>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  computed: {},
  methods: {},
  created() {
    console.log('created');
  }
};
</script>

<style>
</style>
