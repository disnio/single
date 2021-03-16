import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const baseModule = {
  state: () => ({
    count: 1
  }),
  mutations: {
    set_count(state, v) {
      console.log("base count store:", v, state);
      state.count = v;
    }
  },
  actions: {
    setCount({ commit, state }, payload) {

      commit("set_count", payload);
    }
  },
  getters: {
    count: state => state.count
  },
}

export const store = new Vuex.Store({
  modules: {
    base: baseModule
  }
})