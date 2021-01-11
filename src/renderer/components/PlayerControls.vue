<template>
  <div class="h-24 bg-gray-400">
    <div class="flex h-full justify-around">
      <!-- song peak -->
      <div class="flex-initial self-center flex flex-col"></div>
      <!-- controls -->
      <div class="flex-initial self-center flex flex-col">
        <div class="flex justify-between w-64 self-center">
          <v-icon small class="">mdi-shuffle-variant</v-icon>
          <v-icon class="">mdi-skip-previous-outline</v-icon>
          <v-icon large class="">mdi-motion-play-outline</v-icon>
          <v-icon class="">mdi-skip-next-outline</v-icon>
          <v-icon small class="">mdi-repeat</v-icon>
        </div>
        <div class="flex pt-3">
          <div>0:00</div>
          <div class="pl-3 pr-3">
            <input type="range" />
          </div>
          <div>4:18</div>
        </div>
      </div>
      <!-- volume -->
      <div class="flex-initial self-center flex flex-col"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PlayerControls'
};
</script>

<style>
input[type="range"] {
  -webkit-appearance: none;
  width: 400px;
  height: 10px;
  background: #555;
  outline: none;
  border-radius: 15px;
  overflow: hidden;
  cursor: pointer;
  box-shadow: 0 0 5px black;

  opacity: 0.6;
  -webkit-transition: 0.3s;
  transition: opacity 0.3s;
}

input[type="range"]:hover {
  opacity: 1;
}

::-webkit-slider-thumb:hover {
  /* width: 30px;
  height: 30px; */
  background: #008bfd;
  background: #00fd0a;
  box-shadow: -403px 0 0 400px #00fd0a;
}

::-webkit-slider-thumb {
  -webkit-appearance: none;
  /* appearance: none; */
  width: 10px;
  height: 10px;
  background: #d1d1d1;
  cursor: pointer;
  /* border: 2px solid #555; */
  /* color: #00fd0a; */
  border-radius: 50%;
  box-shadow: -403px 0 0 400px #d1d1d1;
}
/* input {
  -webkit-appearance: none;
  background: #555;
} */
</style>