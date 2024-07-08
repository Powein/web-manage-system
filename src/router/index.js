import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import adminGroups from '../views/adminGroups.vue'
import adminPass from '../views/adminPass.vue'
import bookInsert from '../views/bookInsert.vue'
import bookModify from '../views/bookModify.vue'
import bookQuery from '../views/bookQuery.vue'
import borrowBook from '../views/borrowBook.vue'
import borrowReturn from '../views/borrowReturn.vue'
import borrowQuery from '../views/borrowQuery.vue'
import readerGroups from '../views/readerGroups.vue'
import readerModify from '../views/readerModify.vue'
import readerQuery from '../views/readerQuery.vue'
import readerRegister from '../views/readerRegister.vue'
import login from '../views/LoginView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/admin/groups',
    name: 'adminGroups',
    component: adminGroups
  },
  {
    path: '/admin/pass',
    name: 'adminPass',
    component: adminPass
  },
  {
    path: '/book/insert',
    name: 'bookInsert',
    component: bookInsert
  },
  {
    path: '/book/modify',
    name: 'bookModify',
    component: bookModify
  },
  {
    path: '/book/query',//为啥没跳转到这里呢？感觉有点怪啊
    name: 'bookQuery',
    component: bookQuery
  },
  {
    path: '/borrow/book',
    name: 'borrowBook',
    component: borrowBook
  },
  {
    path: '/borrow/return',
    name: 'borrowReturn',
    component: borrowReturn
  },
  {
    path: '/borrow/query',
    name: 'borrowQuery',
    component: borrowQuery
  },
  {
    path: '/reader/groups',
    name: 'readerGroups',
    component: readerGroups
  },
  {
    path: '/reader/modify',
    name: 'readerModify',
    component: readerModify
  },
  {
    path: '/reader/query',
    name: 'readerQuery',
    component: readerQuery
  },
  {
    path: '/reader/register',
    name: 'readerRegister',
    component: readerRegister
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: login
  },
]

const router = new VueRouter({
  routes
})

export default router
