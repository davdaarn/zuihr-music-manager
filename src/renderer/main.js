import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import '@mdi/font/css/materialdesignicons.css';
import './assets/main.scss';
import VueWorker from 'vue-worker';
import {
  ipcRenderer
} from 'electron';
import DataStore from 'nedb';

Vue.use(VueWorker);

Vue.config.productionTip = false
// sometimes use ```Object.defineProperty(Vue.prototype, '$db', { value: DataStore });``` instead
ipcRenderer
  .invoke('getPathToAppData')
  .then(appdata => {
    console.log(appdata);
    Vue.prototype.$db = {
      // playlists
      playlists: new DataStore({
        filename: `${appdata}\\playlister\\db\\playlists.db`,
        autoload: true
      }),
      // songs
      songs: new DataStore({
        filename: `${appdata}\\playlister\\db\\songs.db`,
        autoload: true
      }),
      // settings
    };
  })
  .catch(console.log)
  .finally(x => {

  });



new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
