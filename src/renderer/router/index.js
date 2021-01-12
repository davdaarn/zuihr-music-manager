import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import OG from '../components/OG'

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
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import( /* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
