import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import OG from '../components/OG';
import About from '../views/About.vue';
import Library from '../views/Library.vue';
import Profile from '../views/Profile.vue';
import Account from '../views/Account.vue';
import Playlist from '../views/Playlist.vue';

Vue.use(VueRouter)

const routes = [{
    path: '/',
    name: 'Display',
    component: OG
  },
  {
    path: '/home',
    name: 'Home',
    component: Home
  },
  {
    path: '/library',
    name: 'Library',
    component: Library
  },
  {
    path: '/playlist/:id',
    name: 'Playlist',
    component: Playlist
  },
  {
    path: '/about',
    name: 'About',
    component: About,
  }
]

const router = new VueRouter({
  routes
})

export default router
