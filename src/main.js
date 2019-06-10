import Vue from 'vue'
import Vuex from 'vuex'
import App from './App.vue'
import router from './router'
import VueRouter from 'vue-router'
import Element from 'element-ui'
import VueCookies from 'vue-cookies'
import 'element-ui/lib/theme-chalk/index.css'
// import VueResource from 'vue-resource'
import axios from 'axios'
import qs from 'qs'
Vue.config.productionTip = false
Vue.use(VueRouter)
Vue.use(Vuex)
Vue.use(Element)
Vue.use(VueCookies)

axios.defaults.withCredentials = true
Vue.prototype.$http = axios;

Vue.prototype.$qs = qs;
Vue.prototype.$cookie = VueCookies;

const store = new Vuex.Store({
  state: {
    isLogin: false,
  },
  getters: {
    //获取登录状态
    isLogin: state => state.isLogin,
  },

  // 设置属性状态
  mutations: {
    //保存登录状态
    login(state) {
      state.isLogin = true
      window.localStorage.setItem('login', true);
    },
    logout(state) {
      state.isLogin = false;
      window.localStorage.setItem('login', false);
    }
  }
})




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
