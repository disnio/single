import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: () => ({
    count: 1
  }),
  mutations: {
    set_count(state, v) {
      state.count += v;
    }
  },
  actions: {
    setCount({ commit, state }, payload) {
      console.log("pa store:", payload, state);
      commit("set_count", payload.count);
    }
  },
  modules: {
  }
})
