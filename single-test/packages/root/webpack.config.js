const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const singleSpaDefaults = require("webpack-config-single-spa");

const { apps } = require('./public/app.config.json')

module.exports = (webpackConfigEnv) => {
  const defaultConfig = singleSpaDefaults({
    orgName: "uni",
    projectName: "root",
    webpackConfigEnv,
  });
  return webpackMerge.merge(defaultConfig, {
    entry: path.resolve(__dirname, './src/index.js'),
    externals: {
      systemjs: 'System'
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
        title: 'wsc app',
        template: path.resolve(__dirname, './public/index.ejs'),
        templateParameters: {
          isLocal: webpackConfigEnv && webpackConfigEnv.isLocal === "true",
        },
        apps,
      })
    ]
  })
}