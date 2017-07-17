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
            filename: '[name].[hash].js'
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
            }]
        },
        plugins: [
            new HtmlWebpackPlugin({
                title: 'My App',
                filename: 'index.html',
                template: 'index.html'
            })
        ]
    }
}