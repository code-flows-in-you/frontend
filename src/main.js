import Vue from 'vue'
import Vuex from 'vuex'
import App from './App.vue'
import router from './router'
import VueRouter from 'vue-router'
import Element from 'element-ui'
import VueCookies from 'vue-cookies'
import store from './store'
import 'element-ui/lib/theme-chalk/index.css'
import VueCropper from 'vue-cropper'
import VuePaginate from 'vue-paginate'
import HappyScroll from 'vue-happy-scroll'
import 'vue-happy-scroll/docs/happy-scroll.css'
Vue.use(HappyScroll)


// import VueResource from 'vue-resource'
import axios from 'axios'
Vue.config.productionTip = false
Vue.use(VueRouter)
Vue.use(Vuex)
Vue.use(Element)
Vue.use(VueCookies)
Vue.use(VueCropper) //图片裁剪
Vue.use(VuePaginate)


Vue.prototype.$http = axios;
Vue.prototype.$dateFormatter = function (date)
{
    let year = date.getFullYear()
    let month = date.getMonth() + 1
    let day = date.getDate()
    let hour = date.getHours()
    let min = date.getMinutes()
    let second = date.getSeconds()
    return year + "-" + month + "-" + day + " " +
           hour + ":" + min + ":" + second
};

new Vue({
  data: {},
  el: '#app',
  router: router,
  render: h => h(App),
  store,
  watch: {
    "$route": 'checkLogin'
  },
  created() {
    this.checkLogin()
  },
  methods: {
    checkLogin() {}
  }
})
