var path = require('path')
var webpack = require('webpack')
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = function(env) {
    return {
        entry: {
            main: './index.js'
        },
        output: {
            path: path.resolve(__dirname, './dist'),
            filename: '[name].[hash].js',
            // publicPath: './',
            chunkFilename:'[name].js'
        },
        plugins: [
            /**   1.
             * 最简单的方式生成：dist/index.html
             */
            // new HtmlWebpackPlugin()


            /**
             * 2.Configuration
             */
            // new HtmlWebpackPlugin({
            //     title: 'My App',
            //     filename: 'assets/admin.html'
            // })


            /**
             * 3.Generating Multiple HTML Files（生成多个html文件）
             */
            // new HtmlWebpackPlugin(),
            // new HtmlWebpackPlugin({
            //     title: 'My App',
            //     filename: 'test.html',
            //     template: 'src/test.html'
            // })
        ]
    }
}