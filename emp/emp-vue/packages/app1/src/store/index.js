import Vue from 'vue'
import Vuex from 'vuex'
import { baseModule } from "@appBase/store";

Vue.use(Vuex)

export const store = new Vuex.Store({
  modules: {
    base: baseModule
  }
})