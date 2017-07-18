const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const OpenBrowserPlugin = require('open-browser-webpack-plugin');

// 解析目录地址
const DEV = path.resolve(__dirname, '../dev'); // dev目录
const OUTPUT = path.resolve(__dirname, '../output'); // output目录
// const pathDeal = (configPath) => path.resolve(__dirname,configPath);

const config = {
    entry: {
        /**
         * 常规配置
         */
        // app: './src/index.js'

        /**
         * 热重载配置
         */
        app: [
            'webpack-hot-middleware/client',
            './src/index.js'
        ]
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

        // new webpack.optimize.OccurenceOrderPlugin(),  //适用于webpack1.0
        /**
         * 热更新
         */
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin(),
        /**
         * 自动生成html
         */
        new HtmlWebpackPlugin({
            title: 'My App',
            filename: 'index.html',
            template: './src/index.html'
        }),
        // 自动打开浏览器
        new OpenBrowserPlugin({ url: 'http://localhost:3000' }),
    ]
}

module.exports = config