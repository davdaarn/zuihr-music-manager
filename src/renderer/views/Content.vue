<template>
  <div class="max-h-screen">
    <div class="flex flex-col h-screen">
      <div class="flex-grow flex max-h-screen">
        <!-- sidebar -->
        <Sidebar class="w-72" />
        <!-- content -->
        <Display class="w-full" />
        <!-- </div> -->
      </div>
      <!-- player -->
      <PlayerControls />
    </div>
  </div>
</template>

<script>
import Display from '../components/Display';
import Sidebar from '../components/Sidebar';
import PlayerControls from '../components/PlayerControls';

export default {
  name: 'Content',

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
  /* background-color: dimgray; */
}

::-webkit-scrollbar {
  width: 5px;
}

::-webkit-scrollbar-thumb {
  border-radius: 5px;
  background-color: #555;
}
</style>
