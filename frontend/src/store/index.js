import axios from 'axios'
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    products: [],
  },
  mutations: {
    SET_PRODUCT(state, newProducts) {
      state.products = newProducts;
    },
  },
  actions: {
    fetchProducts({ commit }) {
      axios({
        url: "http://localhost:3000/products",
        method: "GET",
      })
        .then(({ data }) => {
          commit("SET_PRODUCT", data);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    login(context, payload){
      return axios({
        url:'http://localhost:3000/login',
        method:'POST',
        data:payload
      })
    },
    register(context, payload){
      return axios({
        url:'http://localhost:3000/register',
        method:'POST',
        data:payload
      })
    }
  },
  modules: {
  }
})
