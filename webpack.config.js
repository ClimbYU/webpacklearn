var path = require('path')
const SpeedMeasureWebpackPlugin = require('speed-measure-webpack-plugin')// 速度分析

const rules = require('./build/loader/index')
const optimization = require('./build/optimize/index')
const plugins = require('./build/plugin/index')
const entry = require('./build/entry/index')

const swmp = new SpeedMeasureWebpackPlugin()

module.exports = {
    entry: entry(),
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'static/js/[name]_[chunkhash:8].js',
        publicPath: ''
    },
    mode: 'production',
    optimization: optimization,
    resolve: {
        alias: {
            vue: path.resolve(__dirname, './node_modules/vue/dist/vue.min.js')
        },
        extensions: ['.js'],
        mainFields: ['main']

    },
    stats: 'errors-only', // 减少控制台日志输出
    module: {
        rules: rules
    },
    plugins: plugins
}
