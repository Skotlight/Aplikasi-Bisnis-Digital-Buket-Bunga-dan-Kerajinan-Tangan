import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'admin-lte/dist/css/adminlte.min.css'
import 'admin-lte/plugins/fontawesome-free/css/all.min.css'
import 'admin-lte/dist/js/adminlte.min.js'
import ZingGrid from "zinggrid";


Vue.config.productionTip = false

new Vue({
  router,
  store,
  ZingGrid,
  render: h => h(App)
}).$mount('#app')
