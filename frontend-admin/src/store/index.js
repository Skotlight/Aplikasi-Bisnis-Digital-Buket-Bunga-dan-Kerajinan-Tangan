import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    products: [],
    categories: [],
    categoriesString: "",
  },
  mutations: {
    SET_PRODUCTS(state, newProducts) {
      state.products = newProducts;
    },
    SET_CATEGORY(state, newCategories) {
      state.categories = newCategories;
    },
    SET_CATEGORY_STRING(state, newCategories) {
      state.categoriesString = newCategories;
    },
  },
  actions: {
    fetchProducts({ commit }) {
      axios({
        url: "/products",
        method: "GET",
      })
        .then(({ data }) => {
          commit("SET_PRODUCT", data);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    fetchCategories({ commit }) {
      axios({
        url: "http://localhost:3000/category",
        method: "GET",
        headers: {
          access_token: localStorage.access_token,
        },
      })
        .then(({ data }) => {
          commit("SET_CATEGORY", data);
          const asArray = data.map((category) => category.category);
          commit("SET_CATEGORY_STRING", asArray.join(", "));
        })
        .catch((err) => {
          console.log(err);
        });
    },
    login(context, payload) {
      return axios({
        url: "http://localhost:3000/login",
        method: "post",
        data: payload,
      });
    },
    addCategory(context, payload) {
      return axios({
        url: "/categories",
        method: "POST",
        data: payload,
        headers: {
          access_token: localStorage.access_token,
        },
      });
    },
    addProduct(context, payload) {
      return axios({
        url: "/products",
        method: "POST",
        data: payload,
        headers: {
          access_token: localStorage.access_token,
        },
      });
    },
    updateProduct(context, payload) {
      return axios({
        url: `/products/${payload.id}`,
        method: "PUT",
        data: payload.product,
        headers: {
          access_token: localStorage.access_token,
        },
      });
    },
    updateCategory(context, payload) {
      return axios({
        url: `/categories/${payload.id}`,
        method: "PATCH",
        data: payload.category,
        headers: {
          access_token: localStorage.access_token,
        },
      });
    },
    deleteProduct(context, payload) {
      return axios({
        url: `/products/${payload}`,
        method: "DELETE",
        data: payload,
        headers: {
          access_token: localStorage.access_token,
        },
      });
    },
    deleteCategory(context, payload) {
      return axios({
        url: `/categories/${payload}`,
        method: "DELETE",
        data: payload,
        headers: {
          access_token: localStorage.access_token,
        },
      });
    },
    fetchProduct(context, payload) {
      return axios({
        url: `/products/${payload}`,
        method: "GET",
        headers: {
          access_token: localStorage.access_token,
        },
      });
    },
    fetchCategory(context, payload) {
      return axios({
        url: `/categories/${payload}`,
        method: "GET",
        headers: {
          access_token: localStorage.access_token,
        },
      });
    },
  },
  modules: {},
});
