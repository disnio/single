const path = require('path')
// const argv = require('minimist')(process.argv.slice(2))
const StatsPlugin = require('stats-webpack-plugin')
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin');


module.exports = function (process, dirname) {
  const isProduction = process.env.NODE_ENV === 'production'
  const appName = process.env.VUE_APP_NAME
  const port = process.env.port
  // const basePath = argv['base-path'] || '/'

  const baseUrl = process.env.VUE_APP_BASE_URL

  console.log("app:", appName, port);


  return {
    publicPath: isProduction ? `${baseUrl}${appName}/` : `http://localhost:${port}/`,

    // css在所有环境下，都不单独打包为文件。这样是为了保证最小引入（只引入js）
    css: {
      extract: false
    },

    productionSourceMap: false,

    outputDir: path.resolve(dirname, `../../dist/${appName}`),

    configureWebpack: config => {
      config.devServer = {
        port,
        headers: {
          'Access-Control-Allow-Origin': '*',
        },
      }

      config.plugins.push(
        new StatsPlugin('manifest.json', {
          chunkModules: false,
          entrypoints: true,
          env: true,
          source: false,
          chunks: false,
          modules: false,
          assets: false,
          children: false,
          exclude: [/node_modules/]
        }),
      )
    },

    chainWebpack: config => {

      config.output.library(appName).libraryTarget('umd')

      // config.externals(['vue', 'vue-router', 'vuex'])
      // 一定要引否则说没有注册
      config.plugin('script-ext-html')
        .use(ScriptExtHtmlWebpackPlugin, [{
          custom: {
            test: /app.*\.js$/,
            attribute: 'entry',
            value: true
          }
        }]);
      if (isProduction) {
        // 打包目标文件加上 hash 字符串，禁止浏览器缓存
        config.output.filename('js/index.[hash:8].js')
      }
    },
  }
}