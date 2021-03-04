import { registerApp } from './utils';
import 'systemjs';

async function bootstrap() {
  const [singleSpa, Vue, VueRouter, Vuex] = await Promise.all([
    System.import('single-spa'),
    System.import('vue'),
    System.import('vue-router'),
    System.import('vuex'),
  ])

  Vue.config.devtools = process.env.NODE_ENV === 'development'
  Vue.use(VueRouter)
  Vue.use(Vuex)

  Vue.prototype.$eventBus = new Vue();

  window.rootStore = new Vuex.store();

  try {
    const config = await System.import('/app.config.json')
    const { apps } = config.default;

    apps && apps.forEach((app) => {
      const { commonChunks } = app;
      
    })
  }
}