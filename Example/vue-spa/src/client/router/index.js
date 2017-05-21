import Vue from 'vue'
import Router from 'vue-router'
import Meta from 'vue-meta'
Vue.use(Router)
Vue.use(Meta)
const router = new Router({
  mode: 'history',
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  },
  routes: [
    { name: 'index', path: '/', component: require('components/Index') },
    { name: 'course', path: '/course', component: require('components/Course') },
    { name: 'detail', path: '/course/:id', component: require('components/Detail') },
    { name: 'contact', path: '/contact', component: require('components/Contact') },
    { path: '*', redirect: '/' }
  ]
})
export default router

