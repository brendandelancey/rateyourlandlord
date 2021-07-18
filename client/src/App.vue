<template>
  <div id="app">
    <div id="nav">
      <top-header></top-header>
      <!-- <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link> -->
    </div>
    <Errors v-if="error" :msg="error"/>
    <router-view/>
    <bottom-header></bottom-header>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import Header from "@/components/Header2.vue";
import Footer from "@/components/Footer.vue";
import Errors from "@/components/Errors.vue"
export default {
  components: {
    "top-header": Header,
    "bottom-header": Footer,
    Errors
  },
  computed: {
    ...mapGetters(["error"])
  },
  //! Make sure this corresponds to expired tokens
  // created: function () {
  //   this.$http.interceptors.response.use(undefined, function (err) {
  //     return new Promise(function (resolve, reject) {
  //       if (err.status === 401 && err.config && !err.config.__isRetryRequest) {
  //         this.$store.dispatch(logout)
  //       }
  //       throw err;
  //     });
  //   });
  // }

};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}


</style>
