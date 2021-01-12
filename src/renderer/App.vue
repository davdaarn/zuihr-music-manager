<template>
  <v-app class="max-h-screen">
    <div class="flex flex-col h-screen">
      <div class="bg-gray-200 flex-grow flex max-h-screen">
        <!-- sidebar -->
        <Sidebar class="w-72" />
        <!-- content -->
        <!-- <div class="bg-grey-200 h-full w-full overflow-auto"> -->
        <Display class="w-full" />
        <!-- </div> -->
      </div>
      <!-- player -->
      <PlayerControls />
    </div>
  </v-app>
</template>

<script>
import Display from './components/Display';
import Sidebar from './components/Sidebar';
import PlayerControls from './components/PlayerControls';

export default {
  name: 'App',

  components: {
    Display,
    Sidebar,
    PlayerControls
  },

  data: () => ({})
};
</script>

<style >
::-webkit-scrollbar-track {
  /* -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3); */
  border-radius: 5px;
  /* background-color: #f5f5f5; */
}

::-webkit-scrollbar {
  width: 5px;
  /* background-color: #f5f5f5; */
}

::-webkit-scrollbar-thumb {
  border-radius: 5px;
  /* -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3); */
  background-color: #555;
}
</style>
