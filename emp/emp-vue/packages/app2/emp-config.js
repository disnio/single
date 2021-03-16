const withVue2 = require('@efox/emp-vue2')
module.exports = withVue2(({ config }) => {
  const projectName = 'app2'
  const port = 3002
  config.output.publicPath(`http://localhost:${port}/`)
  config.devServer.port(port)
  config.plugin('mf').tap(args => {
    args[0] = {
      ...args[0],
      ...{
        name: projectName,
        filename: 'emp.js',

        exposes: {
          './Content': './src/components/Content',
          './Button': './src/components/Button',
        },
        remotes: {
          '@base': 'appBase',
          '@app1': 'app1',
        },
        remotes: {
          '@base': 'appBase@http://localhost:3000/emp.js',
          '@app1': 'app1@http://localhost:3001/emp.js',
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
        title: 'app2 Project',
      },
    }
    return args
  })

  config.plugins.delete("eslint");
  config.optimization.minimizers.delete('TerserPlugin')


})
