var path = require('path')
var webpack = require('webpack')
var HtmlWebpackPlugin = require('html-webpack-plugin');
var OpenBrowserPlugin = require('open-browser-webpack-plugin');

// 解析目录地址
var DEV = path.resolve(__dirname, 'dev'); // dev目录
var OUTPUT = path.resolve(__dirname, 'output'); // output目录

var config = {
    entry: {
        app: './index.js'
    },
    output: {
        path: OUTPUT,
        filename: '[name].[hash].js',
        publicPath: './'
    },
    module: {
        rules: [{
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['env']
                    }
                }
            },
            // {
            //     test: /\.(png|jpg|gif)$/,
            //     exclude: /(node_modules|bower_components)/,
            //     use: {
            //         loader: 'url-loader',
            //         options: {
            //             limit: 8192,
            //             name: path.resolve(__dirname, 'img/[name].[ext]')
            //         }
            //     }
            // }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'My App',
            filename: 'index.html',
            template: 'index.html'
        }),
        // 自动打开浏览器
        new OpenBrowserPlugin({ url: 'http://localhost:8080' })
    ]
}

module.exports = config