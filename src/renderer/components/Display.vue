<template>
  <div class="flex flex-col">
    <!-- Replace with a header -->

    <div class="h-20 flex-grow">
      <div class="h-full overflow-auto relative">
        <!-- Todo - Header Bar: not using yet - make a component -->
        <div class="h-12 absolute top-0 w-full flex items-center menu-bar">
          <div
            class="text-white h-full w-full flex justify-between items-center mx-4"
          >
            <div class=""></div>
            <div class="flex w-1/12 justify-end items-center">
              <div
                class="mr-4 mdi mdi-account-outline text-2xl text-gray-300 hover:text-green-500 cursor-pointer"
              ></div>
              <div
                class="mdi mdi-cog-outline text-2xl text-gray-300 hover:text-green-500 cursor-pointer"
              ></div>
            </div>
          </div>
        </div>

        <router-view class="h-full"></router-view>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      bottom: true
    };
  },
  computed: {
    isSearching() {
      return this.$store.state.isSearching;
    }
  },
  methods: {},
  created() {
    console.log('created');
  }
};
</script>

<style>
.menu-bar {
  z-index: 1000;
  background: linear-gradient(rgba(63, 63, 63, 0.2), rgba(63, 63, 63, 0.1));
  text-decoration: none;
  font-size: 15px;
}
</style>
