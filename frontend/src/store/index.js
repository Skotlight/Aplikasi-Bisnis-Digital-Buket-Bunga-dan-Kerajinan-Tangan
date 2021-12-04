import axios from "axios";
import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    products: [],
    isAuthenticated: false,
  },
  mutations: {
    SET_PRODUCT(state, newProducts) {
      state.products = newProducts;
    },
    SET_CART(state, payload) {
      state.carts = payload;
    },
    SET_AUTH(state, boolean) {
      state.isAuthenticated = boolean;
    },
  },
  actions: {
    fetchProducts({ commit }, category = "products") {
      category = category === "Flower Bouquet" ? "products" : "handcraft";
      axios({
        url: `http://localhost:3000/${category}`,
        method: "GET",
      })
        .then(({ data }) => {
          commit("SET_PRODUCT", data);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    fetchCart({ commit }) {
      axios({
        url: "/carts/1",
        method: "GET",
        headers: {
          access_token: localStorage.access_token,
        },
      })
        .then(({ data }) => {
          commit("SET_CART", data);
          const reducer = (accumulator, currentValue) =>
            accumulator + currentValue.price;
          const totalPrice = data.reduce(reducer, 0);
          commit("SET_TOTPRICE", totalPrice);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    login(context, payload) {
      return axios({
        url: "http://localhost:3000/login",
        method: "POST",
        data: payload,
      });
    },
    register(context, payload) {
      return axios({
        url: "http://localhost:3000/register",
        method: "POST",
        data: payload,
      });
    },
    addCart(context, payload) {
      return axios({
        url: "/carts/1",
        method: "POST",
        data: payload,
        headers: {
          access_token: localStorage.access_token,
        },
      });
    },
    patchCart(context, payload) {
      return axios({
        url: `/carts/${payload.cartId}`,
        method: "PATCH",
        data: payload.quantity,
        headers: {
          access_token: localStorage.access_token,
        },
      });
    },
    authenticate({ commit }, payload) {
      commit("SET_AUTH", payload);
    },
    search({ commit }, data) {
      axios({
        url: "http://localhost:3000/products/search",
        method: "POST",
        data,
      })
        .then(({ data }) => {
          commit("SET_PRODUCT", data);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  modules: {},
});
