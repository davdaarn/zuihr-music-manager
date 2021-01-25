<template>
  <div class="flex flex-col">
    <!-- Replace with a header -->

    <div class="h-20 flex-grow">
      <div class="h-full overflow-auto">
        <!--         
        Todo - Header Bar: not using yet - make a component
        <div
          class="h-20 w-full fixed top-0 flex items-center"
          style="z-index: 50"
        >
          <div class="text-white h-full flex">
            <div>Items will go here</div>
          </div>
        </div> 
        -->

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
</style>
