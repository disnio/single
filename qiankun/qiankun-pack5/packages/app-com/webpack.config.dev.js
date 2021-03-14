const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const webpackBaseConfig = require('./webpack.config.base.js');
// const glob = require("glob");
// const { truncate } = require('fs');


// const getEntries = (globPath, flag) => {
//   const files = glob.sync(globPath);

//   let entries = {},
//     entry, dirname, basename, pathname, extname;

//   files.forEach(item => {
//     entry = item;
//     dirname = path.dirname(entry);//当前目录
//     extname = path.extname(entry);//后缀
//     basename = path.basename(entry, extname);//文件名
//     pathname = path.join(dirname, basename);//文件路径
//     if (extname === '.html') {
//       entries[pathname] = './' + entry;
//     } else if (extname === '.js') {
//       entries[basename] = entry;
//     }
//   });

//   return entries;
// }

// const entries = getEntries('./src/*.js');


module.exports = merge(webpackBaseConfig, {
  mode: "development",
  devServer: {
    historyApiFallback: true,
    hot: true,

    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
      "Access-Control-Allow-Headers":
        "X-Requested-With, content-type, Authorization",
    },
    port: 3002,
  },
});