<template>
  <v-app>
    <div style="border-bottom: 1px solid" class="main">
      <div class="sidebar">
        <h1 style="height: 250px; background-color: blue"></h1>
        <!-- <hr /> -->
        <div class="sidebar_playlist">
          <ul>
            <li v-for="(item, index) in items" v-bind:key="index" class="item">
              {{ item.text }}
            </li>
          </ul>
        </div>
        <div style="height: 250px; background-color: blue"></div>
      </div>
      <!--  -->
      <!-- <v-main id="main"> -->
      <HelloWorld id="main" />
      <!-- </v-main> -->
      <!--  -->
    </div>
    <div class="footer"></div>
  </v-app>
</template>

<script>
import HelloWorld from './components/HelloWorld';

export default {
  name: 'App',

  components: {
    HelloWorld
  },

  data: () => ({
    mini: false,
    drawer: false,
    selectedItem: 0,
    items: [
      { text: 'My Files', icon: 'mdi-folder' },
      { text: 'Shared with me', icon: 'mdi-account-multiple' },
      { text: 'Starred', icon: 'mdi-star' },
      { text: 'Recent', icon: 'mdi-history' },
      { text: 'Offline', icon: 'mdi-check-circle' },
      { text: 'Uploads', icon: 'mdi-upload' },
      { text: 'Backups', icon: 'mdi-cloud-upload' },
      { text: 'My Files', icon: 'mdi-folder' },
      { text: 'Shared with me', icon: 'mdi-account-multiple' },
      { text: 'Starred', icon: 'mdi-star' },
      { text: 'Recent', icon: 'mdi-history' },
      { text: 'Offline', icon: 'mdi-check-circle' },
      { text: 'Uploads', icon: 'mdi-upload' },
      { text: 'Backups', icon: 'mdi-cloud-upload' },
      { text: 'My Files', icon: 'mdi-folder' },
      { text: 'Shared with me', icon: 'mdi-account-multiple' },
      { text: 'Starred', icon: 'mdi-star' },
      { text: 'Recent', icon: 'mdi-history' },
      { text: 'Offline', icon: 'mdi-check-circle' },
      { text: 'Uploads', icon: 'mdi-upload' },
      { text: 'Starred', icon: 'mdi-star' },
      { text: 'Recent', icon: 'mdi-history' },
      { text: 'Offline', icon: 'mdi-check-circle' },
      { text: 'Uploads', icon: 'mdi-upload' },
      { text: 'Backups', icon: 'mdi-cloud-upload' },
      { text: 'My Files', icon: 'mdi-folder' },
      { text: 'Shared with me', icon: 'mdi-account-multiple' },
      { text: 'Starred', icon: 'mdi-star' },
      { text: 'Recent', icon: 'mdi-history' },
      { text: 'Offline', icon: 'mdi-check-circle' },
      { text: 'Uploads', icon: 'mdi-upload' },
      { text: 'Backups', icon: 'mdi-cloud-upload' },
      { text: 'My Files', icon: 'mdi-folder' },
      { text: 'Shared with me', icon: 'mdi-account-multiple' },
      { text: 'Starred', icon: 'mdi-star' },
      { text: 'Recent', icon: 'mdi-history' },
      { text: 'Offline', icon: 'mdi-check-circle' },
      { text: 'Uploads', icon: 'mdi-upload' },
      { text: 'Backups', icon: 'mdi-cloud-upload' }
    ]
  })
};
</script>

<style >
.main {
  height: calc(100vh - 100px);
  /* display: flex; */
}

#main {
  margin-left: 250px;
  /* margin-bottom: 100px; */
  height: calc(100vh - 100px);
  overflow: auto;
}

.item {
  padding: 10px;
}

.sidebar {
  width: 250px;
  height: calc(100vh - 100px);
  /* height: inherit; */
  /* background-color: rgba(100, 148, 237, 0.521); */
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  /* padding-bottom: 100px; */
  /* overflow: hidden; */
}

.sidebar:hover {
}

.sidebar_playlist {
  overflow-y: hidden;
  /* height: inherit; */
}

.sidebar_playlist:hover {
  overflow-y: auto;
  /* overflow-x: hidden; */
}

.footer {
  width: 100vw;
  height: 100px;
  background-color: rgba(100, 148, 237, 0.521);
  position: fixed;
  bottom: 0;
  left: 0;
}

/* ::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  border-radius: 10px;
  background-color: #f5f5f5;
} */

::-webkit-scrollbar {
  width: 5px;
  background-color: #f5f5f5;
}

::-webkit-scrollbar-thumb {
  border-radius: 10px;
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  background-color: #555;
}
</style>
