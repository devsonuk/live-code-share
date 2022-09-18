import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import ViewUI from "view-design";
import locale from "view-design/dist/locale/en-US";

import "view-design/dist/styles/iview.css";

Vue.config.productionTip = false;

Vue.use(ViewUI, { locale });

new Vue({
  router,
  store,
  vuetify,
  render: function (h) {
    return h(App);
  },
}).$mount("#app");
