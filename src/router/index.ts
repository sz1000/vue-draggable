import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes: Array<RouteRecordRaw> = [
  // {
  //   path: '/',
  //   name: 'home',
  //   component: HomeView
  // },
  {
    path: "/",
    name: "/home",
    meta: {
      title: "主页",
      needLogin: true,
      keepAlive: false,
    },
    component: () => import("../views/HomeView.vue"),
  },
  {
    path: '/about',
    name: 'about',
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path: '/draggable',
    name: 'draggable',
    component: () => import(/* webpackChunkName: "about" */ '../views/DraggableView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
