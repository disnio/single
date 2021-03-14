const path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack')
module.exports =  {
    entry:{
        app:'./src/index.js'
    },
    devServer: {
        port: 5000,
        headers: {
            'Access-Control-Allow-Origin': '*'
        },
        disableHostCheck: true
    },
    plugins:[
        new HtmlWebpackPlugin({
            title:'single-spa 微前端项目',
            template:'./index.html'
        }),
        new webpack.DefinePlugin({
            'process.env':{mode:'"dev"'}
        })
    ]
}
