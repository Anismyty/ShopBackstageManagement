/* eslint-disable */
import Vue from 'vue'
import Vuex from 'vuex'
import { setToken, getToken } from '@/utils/auth'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: getToken(),
    userInfo: {}
  },
  getters: {},
  mutations: {
    setUserInfo(state, userinfo) {
      state.userInfo = userinfo
      state.token = userinfo.token
      setToken(userinfo.token)
    }
  },
  actions: {},
  modules: {}
})
