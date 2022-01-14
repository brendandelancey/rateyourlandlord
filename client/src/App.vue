<template>
  <div id="app">
    <v-app>
      <div id="nav">
        <top-header></top-header>
      </div>
      <!-- <Errors v-if="error" :msg="error"/> -->
      <router-view></router-view>
      <bottom-header class="footer"></bottom-header>
    </v-app>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";
// import Errors from "@/components/Errors.vue";
export default {
  components: {
    "top-header": Header,
    "bottom-header": Footer,
    // Errors,
  },
  computed: {
    ...mapGetters(["error"]),
  },
  //! Make sure this corresponds to expired tokens
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  /* color: #2c3e50; */
  position: relative;
  min-height: 100vh;
  /* padding-bottom: 6rem; */
  padding-bottom: 3rem;
}
.footer {
  /* clear: both; */
  width: 100%;
  position: absolute;

  /* padding: 10px 10px 0px 10px; */

  /* height: 2.5rem;  */
  /* margin-top: 5.2rem; */
  /* padding-top: 2rem; */
  bottom: -3rem;
  /* min-height: 100%; */
  /* bottom:0; */

  /* position:fixed;
 bottom:0; */

  /* flex-shrink: 0; */
}
</style>
