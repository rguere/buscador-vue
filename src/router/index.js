import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home'
import PageNotFound from '../views/PageNotFound'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
  },
  {
    path: '*',
    name: 'page-not-found',
    component: PageNotFound,
  }
]

const router = new VueRouter({
  mode: 'hash', //history
  base: process.env.BASE_URL,
  routes
})

export default router
