var HtmlWebpackPlugin = require('html-webpack-plugin');
var webpack = require("webpack")
var path = require('path')
var MyPlugin = require('./myPlugin')

module.exports = {
    mode: 'development',
    entry: {
        index: './index.js'
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist'),
        publicPath: ''
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                use: 'babel-loader'
            }
        ]
    },
    plugins: [
        new webpack.SourceMapDevToolPlugin(),
        new HtmlWebpackPlugin(),
        new MyPlugin({ options: true })
    ]
}