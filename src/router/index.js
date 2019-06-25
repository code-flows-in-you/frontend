import Vue from 'vue'
import Router from 'vue-router'
import signin from '../components/Signin.vue'
import signup from '../components/Signup.vue'
import profile from '../components/Profile.vue'
import topbar from '../components/Topbar.vue'
import quroa from '../components/Quroa.vue'
import quroaDetail from '../components/QuroaDetail.vue'

import survey from '../components/Survey.vue'
import questionnaireDetail from '../components/QuestionnaireDetail.vue'
import questionnaireAnalyze from '../components/QuestionnaireAnalyze.vue'
import questionnaireCreate from '../components/QuestionnaireCreate.vue'

import all from '../components/all.vue'
//profile 的 子组件

import allProfile from '../components/children/allProfile.vue'
import surveyProfile from '../components/children/surveyProfile.vue'
import questionProfile from '../components/children/questionProfile.vue'
import answerProfile from '../components/children/answerProfile.vue'
import balanceProfile from '../components/children/balanceProfile.vue'


Vue.use(Router)

export default new Router({
  mode: 'history',
  base: './',
  routes: [
    { path: '/', redirect:  '/all' },
    { path: '/signin', component: signin },
    { path: '/signup', component: signup },
    //嵌套路由
    { path: '/profile', components: { default: profile, topbar: topbar },
      children:[
        {
          path:'all',
          component:allProfile
        },
        {
          path:'survey',
          component:surveyProfile
        },
        {
          path:'question',
          component:questionProfile
        },
        {
          path:'answer',
          component:answerProfile
        },
        {
          path:'balance',
          component:balanceProfile
        }
      ]

  },
    { path: '/quroa/:type?', components: { default: quroa, topbar: topbar } },
    { path: '/quroaDetail/:id', components: { default: quroaDetail, topbar: topbar } },
    { path: '/survey/:type?', components: { default: survey, topbar: topbar } },
    { path: '/questionnaireDetail/:id', components: { default: questionnaireDetail, topbar: topbar } },
    { path: '/questionnaireAnalyze/:id', components: { default: questionnaireAnalyze, topbar: topbar } },
    { path: '/questionnaireCreate', components: { default: questionnaireCreate, topbar: topbar } },
    { path: '/all', components: { default: all, topbar: topbar } },
    { path: '*', redirect: '/' }
  ]
})
