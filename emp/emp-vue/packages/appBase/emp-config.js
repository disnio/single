const withVue2 = require('@efox/emp-vue2')
const path = require("path");
const fs = require("fs");
const NodePolyfillPlugin = require("node-polyfill-webpack-plugin")


module.exports = withVue2(({ config }) => {
  const projectName = 'appBase'
  const port = 3000
  config.output.publicPath(`http://localhost:${port}/`)
  config.devServer.port(port)
  config.plugin('mf').tap(args => {
    args[0] = {
      ...args[0],
      ...{
        name: projectName,
        filename: 'emp.js',
        exposes: {
          './store': "./src/store/index",
          "./common": "./src/components"
        },
        remotes: {
          '@app2': 'app2',
          '@app1': 'app1',
        },

        remotes: {
          '@app2': 'app2@http://localhost:3002/emp.js',
          '@app1': 'app1@http://localhost:3001/emp.js',
        },
        shared: ['vue/dist/vue.esm.js', 'vue-router', 'vuex'],
      },
    }
    return args
  })

  config.plugin('html').tap(args => {
    args[0] = {
      ...args[0],
      ...{
        title: 'app Base',
      },
    }
    return args
  })

  config
    .plugin('node')
    .use(NodePolyfillPlugin);

  config.plugins.delete("eslint");
  config.optimization.minimizers.delete('TerserPlugin')

  // config.resolve.alias = {
  //   ...config.resolve.alias,
  //   "@common": "./src/components"
  // }

  config.resolve.fallback = {
    ...config.resolve.fallback,
    fs: fs
  }

  config.resolve.alias.set("@common", path.resolve(__dirname, "./src/components"))

  console.log(config)



})
