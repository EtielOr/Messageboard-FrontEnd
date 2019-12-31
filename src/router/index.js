import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/newPost',
    name: 'newPost',
    component: () => import('../views/newPost.vue')
  },
  {
    path: '/post/:id',
    name: "viewPost",
    component: () => import('../views/viewPost.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
