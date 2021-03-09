import { registerApp } from './utils';
// import { addErrorHandler, getAppStatus, registerApplication, start, getMountedApps } from "single-spa";
// import Vue from 'vue';
// import Router from 'vue-router'
// import Vuex from 'vuex'
import 'systemjs'

async function bootstrap() {
  const [singleSpa, Vue, VueRouter, Vuex] = await Promise.all([
    System.import('single-spa'),

    System.import('vue'),
    System.import('vue-router'),
    System.import('vuex'),
  ]).catch(e => {
    console.log("Promise:xx", e);
  })

  // Vue.config = {
  //   ...Vue.config
  // }

  Vue.config.devtools = process.env.NODE_ENV === 'development'
  Vue.use(Router)
  Vue.use(Vuex)

  Vue.prototype.$eventBus = new Vue();

  window.rootStore = new Vuex.Store();

  try {
    const config = await System.import('/app.config.json')
    const { apps } = config.default;

    apps && apps.forEach((app) => {
      const { commonChunks: chunks } = app;
      console.log("chunks:", chunks);
      if (chunks && chunks.length) {
        Promise.all(chunks.map(chunk => {
          console.log("chunk:", app.name, chunk)
          return System.import(`/${app.name}/js/${chunk}.js`)
        })).then(() => {
          registerApp(singleSpa, app);
        })
      } else {
        registerApp(singleSpa, app);
      }
    })

    window.addEventListener('single-spa:app-change', () => {
      const app = singleSpa.getMountedApps().pop();
      const isApp = /^app-\w+$/.test(app);
      if (isApp) {
        document.body.className = app;
      }
    })
    // todo ??{urlRerouteOnly: true,}
    singleSpa.start()
  } catch (e) {
    throw new Error("config load fail")
  }
}



bootstrap()
//   .then(() => {
//   console.log("system runing");
// })