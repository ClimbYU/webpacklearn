var path = require('path')
var webpack = require('webpack')

module.exports = function(env) {
    return {
        entry: {
            main: './entry.js'
        },
        output: {
            /**
             * 通过执行这个项目的 webpack 构建，我们发现 webpack 创建了2个新的文件束，
             * bundle.js 和 0.bundle.js。
             * entry.js 和 a.js 被打包进 bundle.js.
             * b.js 被打包进 0.bundle.js.
             */
            filename: 'bundle.js',
            path: path.resolve(__dirname, 'dist')
        }
    }
}