<template>
  <div id="app">
    <div id="nav">
      <top-header></top-header>
    </div>
    <Errors v-if="error" :msg="error"/>
    <router-view></router-view>
    <bottom-header class="footer"></bottom-header>
  </div>
  
</template>

<script>
import { mapGetters } from "vuex";
import Header from "@/components/Header.vue";
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
  position: relative;
  min-height: 100vh;
  padding-bottom: 6rem;
}
.footer{
  /* clear: both; */
  width: 100%;
  position: absolute;
  
  /* height: 2.5rem;  */
  /* margin-top: 5.2rem; */
  /* padding-top: 2rem; */
  bottom: 0;
  /* min-height: 100%; */
  /* bottom:0; */

  /* position:fixed;
 bottom:0; */
  
 /* flex-shrink: 0; */
}


</style>
