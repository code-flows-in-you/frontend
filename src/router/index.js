import Vue from 'vue'
import Router from 'vue-router'
import signin from '../components/Signin.vue'
import signup from '../components/Signup.vue'
import topbar from '../components/Topbar.vue'
import quroa from '../components/Quroa.vue'
import quroaDetail from '../components/QuroaDetail.vue'
Vue.use(Router)

export default new Router({
  mode: 'history',
  base: './',
  routes: [
    { path: '/', component: signin },
    { path: '/signin', component: signin },
    { path: '/signup', component: signup },
    { path: '/quroa', components: { default: quroa, topbar: topbar } },
    { path: '/quroaDetail/:id', components: { default: quroaDetail, topbar: topbar } },
    { path: '*', redirect: '/' }
  ]
})
