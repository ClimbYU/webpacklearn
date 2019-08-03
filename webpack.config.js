var path = require("path")
var webpack = require('webpack')
const VueLoaderPlugin = require('vue-loader/lib/plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    entry:'./src/index',
    output:{
        path:path.join(__dirname,'dist'),
        filename:'[name].js'
    },
    mode:'development',
    module:{
        rules:[
            {
                test:/\.js$/,
                use:'babel-loader'
            },
            {
                test:/\.vue$/,
                use:'vue-loader',
            },
            {
                test:/\.(css|less|scss)$/,
                use:[
                    'style-loader',
                    'css-loader'
                ]
            }
        ]
    },
    plugins:[
        new HtmlWebpackPlugin({
            template:path.resolve(__dirname,'src/index.html'),
            filename:'index.html',
            inject:true
        }),
        new VueLoaderPlugin()
    ]
}