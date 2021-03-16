import Vue from 'vue'
import router from './router';
import { store } from './store'
import App from './App'

window.rootStore = store;

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router,
  store: window.rootStore,
}).$mount('#emp-root')
