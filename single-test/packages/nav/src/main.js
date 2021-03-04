// import './set-public-path'
import Vue from 'vue';
import singleSpaVue from 'single-spa-vue';

import App from './App.vue';
import store from './store';
import router from './router';

const VUE_APP_NAME = process.env.VUE_APP_NAME;

Vue.config.productionTip = false;

if (!window.singleSpaNavigate) {
  new Vue({
    render: (h) => h(App),
    router,
    store,
  }).$mount('#app');
}

const vueLifecycles = singleSpaVue({
  Vue,
  appOptions: {
    render(h) {
      return h(App, {
        props: {
          // single-spa props are available on the "this" object. Forward them to your component as needed.
          // https://single-spa.js.org/docs/building-applications#lifecyle-props
          // if you uncomment these, remember to add matching prop definitions for them in your App.vue file.
          /*
          name: this.name,
          mountParcel: this.mountParcel,
          singleSpa: this.singleSpa,
          */
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
