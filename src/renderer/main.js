import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import '@mdi/font/css/materialdesignicons.css';
import './assets/main.scss';
import VueWorker from 'vue-worker';
import VueVirtualScroller from 'vue-virtual-scroller';

Vue.use(VueVirtualScroller);

Vue.use(VueWorker);

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
