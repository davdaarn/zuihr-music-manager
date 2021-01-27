import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import OG from '../components/OG';
import About from '../views/About.vue';
import Library from '../views/Library.vue';
import Profile from '../views/Profile.vue';
import Account from '../views/Account.vue';
import Playlist from '../views/Playlist.vue';
import Artist from '../views/Artist.vue';
import Album from '../views/Album.vue';

Vue.use(VueRouter)

const routes = [{
    path: '/test',
    name: 'Test',
    component: OG
  },
  {
    path: '/',
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
    path: '/artist/:artist',
    name: 'Artist',
    component: Artist
  },
  {
    path: '/album/:album',
    name: 'Album',
    component: Album
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
