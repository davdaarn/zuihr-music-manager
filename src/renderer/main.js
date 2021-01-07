import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import './assets/tailwind.css'

import {
  ipcRenderer
} from 'electron';
import DataStore from 'nedb';

Vue.config.productionTip = false

ipcRenderer
  .invoke('getPathToAppData')
  .then(res => {
    Vue.prototype.$db = {
      playlists: new DataStore({
        filename: `${res}/playlister/db/playlists.db`,
        autoload: true
      }),
      songs: new DataStore({
        filename: `${res}/playlister/db/songs.db`,
        autoload: true
      }),
    };
  })
  .catch(console.log)
  .finally(x => {

  });



new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
