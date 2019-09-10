var path = require('path')

const rules = require('./build/loader/index')
const plugins = require('./build/plugin/index')
const entry = require('./build/entry/index')

module.exports = {
    entry: entry(),
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'static/js/[name]_[hash:8].js'
    },
    mode: 'development',
    devtool: 'source-map',
    stats: 'errors-only', // 减少控制台日志输出
    module: {
        rules: rules
    },
    plugins: plugins,
    devServer: {
        contentBase: './dist',
        hot: true
    }
}
