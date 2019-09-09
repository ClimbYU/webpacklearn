var path = require("path")
var glob = require('glob')
var webpack = require('webpack')
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin')
var MiniCssExtractPlugin = require('mini-css-extract-plugin')
var OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin')
// var HtmlWebpackExternalsPlugin = require('html-webpack-externals-plugin')
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const { DllManifestScript, DllManifestScriptCopy } = require('./plugins/index')


const rules = require('./build/loader/index')
const optimization = require('./build/optimize/index')
const plugins = require('./build/plugin/index')
const entry = require('./build/entry/index')

const setMPA = () => {
    const entries = {}
    const htmlWebpackPlugins = []

    const entriesFiles = glob.sync(path.resolve(__dirname, './src/*/index.js'))

    Object.keys(entriesFiles)
        .map((index) => {
            const entryFile = entriesFiles[index]
            const match = entryFile.match(/src\/(.*)\/index\.js/)
            const pageName = match && match[1];
            entries[pageName] = entryFile
            htmlWebpackPlugins.push(
                new HtmlWebpackPlugin({
                    template: path.join(__dirname, `src/${pageName}/index.html`),
                    filename: `${pageName}.html`,
                    inject: true,
                    minify: {
                        html5: true,
                        collapseWhitespace: true,
                        preserveLineBreaks: false,
                        minifyCSS: true,
                        minifyJS: true,
                        removeComments: false
                    }
                })
            )
        })

    return {
        entries,
        htmlWebpackPlugins
    }
}
const { entries, htmlWebpackPlugins } = setMPA();

module.exports = {
    entry: entry(),
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'static/js/[name]_[hash:8].js',
    },
    mode: 'development',
    devtool: 'source-map',
    optimization: {

    },
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