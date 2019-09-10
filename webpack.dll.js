const path = require('path')
const webpack = require('webpack')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const { DllManifestList } = require('./plugins/index')

module.exports = {
    mode: 'production',
    entry: {
        library: [
            'vue', 'vue-router'
        ],
        elementUI: ['element-ui']
    },
    output: {
        filename: '[name].dll.[hash:8].js',
        path: path.resolve(__dirname, 'dll/library'),
        library: '[name]_dll'
    },
    plugins: [
        new CleanWebpackPlugin(),
        new webpack.DllPlugin({
            name: '[name]_dll', // 生成的.json文件的模块名称
            path: path.resolve(__dirname, 'dll/library/[name].json')
        }),
        new DllManifestList() // 生成dll文件对应的json文件用于插入html使用
    ]
}
