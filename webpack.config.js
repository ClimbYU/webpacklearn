var path = require("path")
var TerserPlugin = require("terser-webpack-plugin")

module.exports = {
    entry: {
        'large-number': path.resolve(__dirname, './src/index.js'),
        'large-number.min': path.resolve(__dirname, './src/index.js')

    },
    output: {
        filename: '[name].js',
        library: 'largeNumber',
        libraryExport: "default",
        libraryTarget: 'umd'
    },
    mode: 'none',
    optimization: {
        minimize: true,
        minimizer: [
            new TerserPlugin({  // 可以压缩es6的语法
                include: /\.min\.js$/,
            })
        ]
    }
}