<template>
  <v-app>
    <div class="flex flex-col h-screen">
      <div class="bg-gray-200 flex-grow flex">
        <!-- sidebar -->
        <Sidebar />
        <!-- content -->
        <div class="bg-blue-200 h-full w-full">
          <HelloWorld />
        </div>
      </div>
      <!-- player -->
      <PlayerControls />
    </div>
  </v-app>
</template>

<script>
import HelloWorld from './components/HelloWorld';
import Sidebar from './components/Sidebar';
import PlayerControls from './components/PlayerControls';

export default {
  name: 'App',

  components: {
    HelloWorld,
    Sidebar,
    PlayerControls
  },

  data: () => ({})
};
</script>

<style >
::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  border-radius: 10px;
  /* background-color: #f5f5f5; */
}

::-webkit-scrollbar {
  width: 5px;
  /* background-color: #f5f5f5; */
}

::-webkit-scrollbar-thumb {
  border-radius: 10px;
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  background-color: #555;
}
</style>
