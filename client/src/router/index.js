import Vue from "vue";
import VueRouter from "vue-router";
// import Home from "../views/Home.vue";
import store from "../store/index.js";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: () => import("../views/Home.vue"),
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("../views/Login.vue"),
  },
  {
    path: "/profile",
    name: "Profile",
    component: () => import("../views/Profile.vue"),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/register",
    name: "Register",
    component: () => import("../views/Register.vue"),
  },
  {
    path: "/searchresults",
    name: "SearchResults",
    component: () => import("../views/SearchResults.vue"),
  },
  {
    path: "/viewratingsandreviews/:id",
    name: "ViewRatingsAndReviews",
    component: () => import("../views/ViewRatingsAndReviews.vue"),
    props: true,
  },
  {
    path: "/createpost",
    name: "CreatePost",
    component: () => import("../views/CreatePost.vue"),
  },
  {
    path: "/createrating",
    name: "CreateRating",
    component: () => import("../views/CreateRating.vue"),
  },
  {
    path: "/advancedsearch",
    name: "AdvancedSearch",
    component: () => import("../views/AdvancedSearch.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (!store.getters.isLoggedIn) {
      // Redirect to the Login Page
      next("/login");
    } else {
      next();
    }
  }
  // else if (to.matched.some(record => record.meta.requiresGuest)) {
  //   if (store.getters.isLoggedIn) {

  //     next('/profile');
  //   } else {
  //     next();
  //   }
  // }
  else {
    next();
  }
});

export default router;
