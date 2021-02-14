<template>
  <div class="max-h-screen">
    <div class="flex flex-col h-screen">
      <div class="flex-grow flex max-h-screen z-0">
        <!-- sidebar -->
        <Sidebar class="w-72 sidebar" />
        <!-- content -->
        <Display class="w-full" />
        <!-- </div> -->
      </div>
      <!-- player -->
      <PlayerControls class="absolute bottom-0 w-full z-50" />
      <!-- <StatusBar /> -->
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
    PlayerControls
    // StatusBar
  },

  data: () => ({})
};
</script>

<style >
::-webkit-scrollbar-track {
  /* background-color: rgb(36, 102, 163); */
  margin-bottom: 100px;
}

::-webkit-scrollbar {
  width: 4px;
}

::-webkit-scrollbar-thumb {
  border-radius: 5px;
  background-color: #00e6cf63;
}

::-webkit-scrollbar-thumb:hover {
  background-color: #00e6cf;
}
</style>
