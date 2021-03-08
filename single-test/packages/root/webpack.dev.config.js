const path = require('path')
const baseWebpackConfig = require('./webpack.config')
const { merge } = require('webpack-merge')

console.log(merge)

module.exports = merge(baseWebpackConfig, {
  devtool: 'source-map',
  devServer: {
    stats: 'minimal',
    contentBase: path.join(__dirname, 'public'),
    port: 9000
  }
})