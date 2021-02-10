<template>
  <div class="max-h-screen">
    <div class="flex flex-col h-screen">
      <div class="flex-grow flex max-h-screen">
        <!-- sidebar -->
        <Sidebar class="w-72 sidebar" />
        <!-- content -->
        <Display class="w-full" />
        <!-- </div> -->
      </div>
      <!-- player -->
      <PlayerControls />
      <StatusBar />
    </div>
  </div>
</template>

<script>
import Display from '../components/Display';
import Sidebar from '../components/Sidebar';
import PlayerControls from '../components/PlayerControls';
import StatusBar from '../components/StatusBar';

export default {
  name: 'Content',

  components: {
    Display,
    Sidebar,
    PlayerControls,
    StatusBar
  },

  data: () => ({})
};
</script>

<style >
/* ::-webkit-scrollbar-track {
  background-color: rgb(71, 71, 71);
} */

::-webkit-scrollbar {
  width: 4px;
}

::-webkit-scrollbar-thumb {
  border-radius: 5px;
  background-color: #555;
}

::-webkit-scrollbar-thumb:hover {
  background-color: rgb(112, 112, 112);
}
</style>
