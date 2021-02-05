import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import '@mdi/font/css/materialdesignicons.css';
import './assets/main.scss';
import VueWorker from 'vue-worker';
import VueVirtualScroller from 'vue-virtual-scroller';

Vue.use(VueVirtualScroller);

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

    /**  
     * ! todo: 
     * ! create a guard if db files are deleted while app is running
     * ! db will update wrong file 
     */
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
      // // stats
      // stats: new DataStore({
      //   filename: `${appdata}\\playlister\\db\\stats.db`,
      //   autoload: true
      // }),
      // // settings
      // settings: new DataStore({
      //   filename: `${appdata}\\playlister\\db\\settings.db`,
      //   autoload: true
      // }),
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
