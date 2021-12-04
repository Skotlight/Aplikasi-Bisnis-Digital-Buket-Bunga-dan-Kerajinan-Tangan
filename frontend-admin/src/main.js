import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "admin-lte/dist/css/adminlte.min.css";
import "admin-lte/plugins/fontawesome-free/css/all.min.css";
import "admin-lte/dist/js/adminlte.min.js";
import ZingGrid from "zinggrid";
import CoreuiVue from "@coreui/vue";
import { iconsSet as icons } from "./assets/icons/icons.js";

Vue.config.productionTip = false;
Vue.use(CoreuiVue);

new Vue({
  router,
  store,
  ZingGrid,
  icons,

  render: (h) => h(App),
}).$mount("#app");
