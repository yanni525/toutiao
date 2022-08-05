import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login')
  },
  // 如果子路由path 没有/ 那么会把父亲path和儿子path拼接，
  // 如果子路由的path 有/ 不会拼接
  {
    path: '/',
    redirect: '/ ',
    component: () => import('@/views/layout'),
    children: [
      {
        path: '/ ',
        component: () => import('@/views/Home')
      },
      {
        path: 'video',
        component: () => import('@/views/Video')
      },
      {
        path: 'qa',
        component: () => import('@/views/QA')
      },
      {
        path: 'my',
        component: () => import('@/views/My')
      },
    ]
  },
  {
    path: '/search',
    component: () => import('@/views/Search')
  }
]

const router = new VueRouter({
  routes
})

export default router
