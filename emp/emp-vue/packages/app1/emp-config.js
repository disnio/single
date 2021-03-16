const withVue2 = require('@efox/emp-vue2')
const NodePolyfillPlugin = require("node-polyfill-webpack-plugin")


module.exports = withVue2(({ config }) => {
  const projectName = 'app1'
  const port = 3001
  config.output.publicPath(`http://localhost:${port}/`)
  config.devServer.port(port)
  config.plugin('mf').tap(args => {
    args[0] = {
      ...args[0],
      ...{
        name: projectName,
        filename: 'emp.js',
        exposes: {
          './Counter': './src/components/Counter',
        },
        // 框架
        remotes: {
          '@appBase': 'appBase',
        },
        remotes: {
          '@appBase': 'appBase@http://localhost:3000/emp.js',
        },
        // shared: ['vue/dist/vue.esm.js', 'vue-router', 'vuex'],
      },
    }
    return args
  })

  config.plugin('html').tap(args => {
    args[0] = {
      ...args[0],
      ...{
        title: 'app1',
      },
    }
    return args
  })

  config
    .plugin('node')
    .use(NodePolyfillPlugin);

  config.plugins.delete("eslint");
  config.optimization.minimizers.delete('TerserPlugin')

})
