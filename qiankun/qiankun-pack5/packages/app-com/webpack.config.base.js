const HtmlWebpackPlugin = require("html-webpack-plugin");
const { ModuleFederationPlugin } = require("webpack").container;
const path = require("path");
const webpack = require('webpack');
const pkg = require('./package.json');
const deps = require("./package.json").dependencies;

const VueLoaderPlugin = require('vue-loader/lib/plugin');

function resolve(dir) {
  return path.join(__dirname, '..', dir);
}

module.exports = {
  entry: "./src/main",
  target: "web",
  optimization: {
    minimize: false,
  },
  devtool: 'source-map',

  output: {
    // publicPath: 'http://localhost:3002/',
    publicPath: 'auto',
    library: `${pkg.name}`, library: `${pkg.name}-[name]`,
    libraryTarget: 'umd',// 把子应用打包成 umd 库格式

  },
  module: {
    rules: [
      // {
      //   test: /bootstrap\.js$/,
      //   loader: "bundle-loader",
      //   options: {
      //     lazy: true,
      //   },
      // },
      {   // 添加解析 .vue文件loader
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {        // 添加解析 .css文件loader
        test: /\.css(\?.*)?$/,
        use: [  // loader 顺序不能乱
          'vue-style-loader',
          'style-loader',
          'css-loader'
        ]
      },

      { // 配置sass语法支持，并且使用的是缩进格式
        test: /\.s[ac]ss$/,
        use: [
          'css-loader',
          {
            loader: 'sass-loader',
            options: {
              sassOptions: {
                indentedSyntax: true // 如需使用花括号嵌套模式则设置为false
              }
            }
          }
        ]
      },
      { // 配置Babel将ES6+ 转换为ES5
        test: /\.js(\?.*)?$/,
        exclude: file => ( // 排除node_modules文件夹
          /node_modules/.test(file)
        ),
        use: {
          loader: 'babel-loader',

        }
      },
      { // 配置图片文件加载
        test: /\.(png|jpe?g|gif|tif?f|bmp|webp|svg)(\?.*)?$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 10000,
            esModule: false
          }
        }
      },
      { // 配置字体文件加载
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        use: {
          loader: 'file-loader',
          options: {
            esModule: false,
            limit: 10000
          }
        }
      },
    ],
  },
  resolve: {
    extensions: ['.jsx', '.js', '.vue', '.json', '.css', '.scss', '.sass'],

    alias: {
      // 'vue': 'vue/dist/vue.esm.js',
      '@': path.resolve(__dirname, './src')
    }
  },

  //http://localhost:3002/remoteEntry.js
  plugins: [

    new ModuleFederationPlugin({
      name: "appcom",
      // library: { type: 'var', name: 'appcom' },

      filename: "remoteEntry.js",

      remotes: {
        "apphash": getRemoteEntryUrl("apphash", 3001),
      },
      shared: {
        ...deps,

        "vue": {
          singleton: true,
        },
        "vue-router": {
          singleton: true,
        },
        "vuex": {
          singleton: true,
        },
        'element-ui': {
          singleton: true,

        }

      },

      exposes: {
        './ButtonCounter': "./src/components/ButtonCounter.vue"
      }
    }),
    new HtmlWebpackPlugin({
      template: "./public/index.html",
      // filename: "index.html",
      // inject: true
    }),
    new VueLoaderPlugin(),

  ],
};

function getRemoteEntryUrl(name, port) {
  return `${name}@http://localhost:${port}/remoteEntry.js`;

}

