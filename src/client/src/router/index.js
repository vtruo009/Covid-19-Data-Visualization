import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import USPage from '../views/USPage.vue'
import WorldPage from '../views/WorldPage'
import GenderPage from '../views/GenderPage'
import AgePage from '../views/AgePage'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/US',
    name: 'USPage',
    component: USPage
  },
  {
    path: '/World',
    name: 'WorldPage',
    component: WorldPage
  },
  {
    path: '/Gender',
    name: 'GenderPage',
    component: GenderPage
  },
  {
    path: '/Age',
    name: 'AgePage',
    component: AgePage
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
