import Vue from 'vue'
import Vuex from 'vuex'
import { store } from './store'

Vue.use(Vuex)

import App from './App'
// todo 共享 store
import remoteStore from '@appBase/store';
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  store: store
}).$mount('#emp-root')
