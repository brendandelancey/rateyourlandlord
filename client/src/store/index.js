import Vue from 'vue'
import Vuex from 'vuex'

import Auth from '../store/modules/Auth';
import RatingsAndIPs from '../store/modules/RatingsAndInitialPosts';
import Search from '../store/modules/Search';

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    Auth,
    RatingsAndIPs,
    Search
  },
  state: {
  },
  mutations: {
  },
  actions: {
  }
})
