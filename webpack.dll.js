const path = require('path')
const webpack = require('webpack')
const { DllManifestList } = require('./plugins/index')

module.exports = {
    mode: 'development',
    entry: {
        library: [
            'vue'
        ]
    },
    output: {
        filename: '[name].dll.[hash:8].js',
        path: path.resolve(__dirname, 'build/library'),
        library: '[name]_dll'
    },
    plugins: [
        new webpack.DllPlugin({
            name: '[name]_dll', // 生成的.json文件的模块名称
            path: path.resolve(__dirname, 'build/library/[name].json')
        }),
        new DllManifestList()
    ]
}

// console.log(path.resolve(__dirname, 'dist'))
// console.log(path.join(__dirname, 'dist'))
