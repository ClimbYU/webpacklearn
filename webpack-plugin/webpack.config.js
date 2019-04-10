var HtmlWebpackPlugin = require('html-webpack-plugin');
var WebpackManifestPlugin = require("webpack-manifest-plugin")
const CleanWebpackPlugin = require('clean-webpack-plugin');
var webpack = require("webpack")
var path = require('path')
var MyPlugin = require('./myPlugin')

module.exports = {
    mode: 'development',
    devtool: 'source-map',
    entry: {
        index: './index.js'
    },
    output: {
        filename: '[name].[hash:5].js',
        path: path.resolve(__dirname, 'dist'),
        publicPath: '',
        devtoolModuleFilenameTemplate: '../[resource-path]'
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
        new WebpackManifestPlugin(),
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin(),
        // new MyPlugin({ options: true })
    ]
}