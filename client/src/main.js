import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import { BootstrapVue, IconsPlugin } from "bootstrap-vue";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import axios from "axios";
import vuetify from "./plugins/vuetify";

Vue.config.productionTip = false;
Vue.use(BootstrapVue);
Vue.use(IconsPlugin);

// Setting up default vue's http modules for api calls
// Vue.prototype.$http = axios;
// // Load the token from the localStorage
// const token = localStorage.getItem("token");
// // Is there is any token then we will simply append default axios authorization headers
// if (token) {
//   Vue.prototype.$http.defaults.headers.common["Authorization"] = token;
// }

// ! If button router push doesnt work
axios.interceptors.request.use(
  (config) => {
    let token = localStorage.getItem('token');

    if (token) {
      config.headers['Authorization'] = `${ token }`;
    }

    return config;
  }, 

  (error) => {
    return Promise.reject(error);
  }
);


new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
