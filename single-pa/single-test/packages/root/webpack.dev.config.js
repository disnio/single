const path = require('path')
const baseWebpackConfig = require('./webpack.config')
const { merge } = require('webpack-merge')


module.exports = merge(baseWebpackConfig, {
  devtool: 'source-map',
  devServer: {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
      "Access-Control-Allow-Headers": "X-Requested-With, content-type, Authorization"
    },
    stats: 'minimal',
    contentBase: path.join(__dirname, 'public'),
    port: 9000,
    proxy: {
      "/app1": {
        target: "http://localhost:8085",
        // pathRewrite: { "^/app1": "" }
      },
      "/app2": {
        target: "http://localhost:8086",
        // pathRewrite: { "^/app2": "" }
      },
      "/navbar": {
        target: "http://localhost:8087",
        // pathRewrite: { "/navbar": "" }
      }
    }
  }
})