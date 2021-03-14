import vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store/base';
import singleSpaVue from 'single-spa-vue';
import elementUI from 'element-ui'
vue.use(elementUI)
vue.config.productionTip = false;
const appOptions = {
  el:'#main',
  render: (h) => h(App),
  router,
  store
};

if(process.env.VUE_APP_SINGLERUN ==='true') {
  import('element-ui/lib/theme-chalk/index.css');
  new vue(appOptions)
}
const vueLifecycles = singleSpaVue({
  Vue:vue,
  appOptions: appOptions,
});

export const bootstrap = vueLifecycles.bootstrap;
export const mount = vueLifecycles.mount;
export const unmount = vueLifecycles.unmount;
