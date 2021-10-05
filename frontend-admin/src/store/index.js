import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
    login(context, payload){
      return axios({
        url:'http://localhost:3000/login',
        method:'post',
        data:payload
      })
    }
  },
  modules: {
  }
})
