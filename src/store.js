import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state:
  {
    status: '',
    user : {}
  },
  mutations: {
    signin_request(state)
    {
      state.status = 'loading'
    },
    signin_success(state, user)
    {
      state.status = 'success'
      state.user = user
    },
    signin_error(state)
    {
      state.status = 'error'
    },
    signout(state)
    {
      state.status = ''
      state.user = {}
    },
  },
  actions:
  {
    signin({commit, dispatch}, user)
    {
      return new Promise((resolve, reject) =>
      {
        commit('signin_request')
        axios({url: '/api/account/session', data: user, method: 'POST' })
        .then(resp =>
        {
          // get user's info
          dispatch('getUserInfo')
          .then(resp =>
          {
          // get user's info
            resolve(resp)
          })
          .catch(err =>
          {
            commit('signin_error')
            reject(err)
          })

        })
        .catch(err =>
        {
          commit('signin_error')
          reject(err)
        })
      })
    },
    signup({commit}, user)
    {
      return new Promise((resolve, reject) =>
      {
        axios({url: '/api/account/', data: user, method: 'POST' })
        .then(resp =>
        {
          resolve(resp)
        })
        .catch(err =>
        {
          reject(err)
        })
      })
    },
    signout({commit})
    {
      return new Promise((resolve, reject) =>
      {
        axios({url: '/api/account/session', method: 'DELETE' })
        .then(resp =>
        {
          commit('signout')
          resolve(resp)
        })
        .catch(err =>
        {
          reject(err)
        })
      })
    },
    getUserInfo({commit})
    {
      return new Promise((resolve, reject) =>
      {
        axios({url: '/api/account/self', method: 'GET' })
        .then(resp =>
        {
          commit('signin_success', resp.data.data)
          resolve(resp.data.data)
        })
        .catch(err =>
        {
          reject(err)
        })
      })
    }
  },
  getters :
  {
    isSignedIn: state => state.status == 'success',
  }
})