var path = require('path')
var webpack = require('webpack')

module.exports = function(env) {
    return {
        entry: {
            main: './index.js',
            vendor: 'moment'
        },
        output: {
            filename: '[name].[chunkhash].js',
            path: path.resolve(__dirname, 'dist')
        },
        plugins: [
            new webpack.optimize.CommonsChunkPlugin({
                /**
                 *  指定公共 bundle 的名字。
                 */
                // name: 'vendor' 


                /**
                 *  每次改变应用代码，vendor.js也会跟着相应变化
                 * 未解决此问题加一个mainfest，这样每次变得应用代码vendor不再变化
                 * 变化的只是main.[***].js与mainfest.[***].js
                 */
                names: ['vendor', 'manifest'],
                // 随着 入口chunk 越来越多，这个配置保证没其它的模块会打包进 公共chunk
                minChunks: Infinity,


            })
        ]
    }
}