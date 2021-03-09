const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')
// const singleSpaDefaults = require("webpack-config-single-spa");
// const webpackMerge = require("webpack-merge");

const { apps } = require('./public/app.config.json')

module.exports = {
  mode: "development",
  node: {
    fs: 'empty'
  },
  entry: path.resolve(__dirname, './src/index.js'),
  externals:
  {
    "vue": "Vue",
    "vue-router": "VueRouter",
    "vuex": "Vuex",
    "systemjs": 'System',
  },
  module: {
    rules: [
      { parser: { system: false } },
      {
        test: /\.js?$/,
        exclude: [path.resolve(__dirname, 'node_modules')],
        loader: 'babel-loader',
      },
      {
        test: /\.css$/,
        include: [path.resolve(__dirname, 'node_modules')],
        use: ['style-loader', 'css-loader'],
      },
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      // inject: false,
      title: 'wsc app',
      template: path.resolve(__dirname, './public/index.html'),

      apps,

    })
  ]

}