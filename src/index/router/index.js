import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../home.vue'


Vue.use(VueRouter)
const routes = [
  {
    path: '/',
    component: Home
  },
  {
    path: "/hello",
    component: () => import(/* webpackChunkName:'hello'*/ '../helloWorld.vue')
  }
]

const router = new VueRouter({
  mode: 'hash',
  routes
});



export default router