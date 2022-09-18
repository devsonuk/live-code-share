import Vue from "vue";
import VueRouter from "vue-router";
import HomeView from "../views/HomeView.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: HomeView,
  },
  {
    path: "/editor/:roomId",
    name: "Editor",
    component: function () {
      return import(/* webpackChunkName: "editor" */ "../views/EditorView.vue");
    },
  },
  {
    path: "/login",
    name: "Login",
    component: function () {
      return import(
        /* webpackChunkName: "GuestLoginView" */ "../views/GuestLoginView.vue"
      );
    },
  },
  {
    path: "/authentication",
    name: "Authentication",
    component: function () {
      return import(
        /* webpackChunkName: "Authentication" */ "../views/AuthenticationView.vue"
      );
    },
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

// const openRoutes = ["Login"];

// router.beforeEach(async (to, from, next) => {
//   var isAuthenticated = (await localStorage.getItem("isLoggedIn")) != null;
//   console.log("isAuthenticated", isAuthenticated, openRoutes.includes(to.name));
//   if (!openRoutes.includes(to.name) && !isAuthenticated) {
//     next({ name: "Login", query: { roomId: to.params.roomId } });
//   } else {
//     next();
//   }
// });

export default router;
