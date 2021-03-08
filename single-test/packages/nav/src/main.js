// import './set-public-path'
import Vue from 'vue';
import singleSpaVue from 'single-spa-vue';

import App from './App.vue';
import store from './store';
import router from './router';

const VUE_APP_NAME = process.env.VUE_APP_NAME;

Vue.config.productionTip = false;

const vueLifecycles = singleSpaVue({
  Vue,
  appOptions: {
    render(h) {
      return h(App, {
        props: {

        },
      });
    },
    router,
  },
});

export const bootstrap = [
  () => {
    return new Promise((resolve, reject) => {
      // 注册当前应用的store
      console.log(window.rootStore);
      try {
        window.rootStore.registerModule(VUE_APP_NAME, store);
        resolve();
      } catch (e) {
        reject(e)
      }

    });
  },
  vueLifecycles.bootstrap,
];
export const mount = vueLifecycles.mount;
export const unmount = vueLifecycles.unmount;
