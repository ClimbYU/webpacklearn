const VueLoaderPlugin = require('vue-loader/lib/plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
var MiniCssExtractPlugin = require('mini-css-extract-plugin')
var OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin')
var HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin // 包体积图
// const HappyPack = require('happypack') // 开启多线程打包
// const HardSourceWebpackPlugin = require('hard-source-webpack-plugin') // 开启缓存提升打包速度
// const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin')

var webpack = require('webpack')
const glob = require('glob')
var path = require('path')
const { DllManifestScript, DllManifestScriptCopy } = require('../../plugins/index')

function getHtmlPlugin() {
    const htmlWebpackPlugins = []

    const entriesFiles = glob.sync(path.resolve(__dirname, '../../src/*/index.js'))
    Object.keys(entriesFiles)
        .map((index) => {
            const entryFile = entriesFiles[index]
            const match = entryFile.match(/src\/(.*)\/index\.js/)
            const pageName = match && match[1]

            htmlWebpackPlugins.push(
                new HtmlWebpackPlugin({
                    template: path.join(__dirname, `../../src/${pageName}/index.html`),
                    filename: `${pageName}.html`,
                    chunks: ['common', pageName, 'vendors'], // 设置插入入口js以及第三方包和公共业务代码
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

    return htmlWebpackPlugins
}

const htmlWebpackPlugins = getHtmlPlugin()
var plugins = [
    new VueLoaderPlugin(), // vue加载需要此插件
    new CleanWebpackPlugin(), // 删除dist
    new MiniCssExtractPlugin({ // 提取css为单独文件
        filename: 'static/css/[name]_[contenthash:8].css',
    }),
    new OptimizeCssAssetsWebpackPlugin({ // 压缩css
        assetNameRegExp: /\.css$/g,
        cssProcessor: require('cssnano') // 使用cssnano压缩
    }),
    // new FriendlyErrorsWebpackPlugin(),
    // new HardSourceWebpackPlugin()
    // new BundleAnalyzerPlugin(),
    // new HappyPack({
    //     // 3) re-add the loaders you replaced above in #1:
    //     loaders: ['babel-loader']
    // })
    new webpack.DllReferencePlugin({
        manifest: require('../../dll/library/library.json')
    }),
    new CopyPlugin([{
        from: path.resolve(__dirname, '../../dll/library'),
        to: path.resolve(__dirname, '../../dist/static/js'),
        ignore: ['*.json']
    }])
].concat(htmlWebpackPlugins).concat([
    new DllManifestScript()
    // new DllManifestScriptCopy()
] // 此插件需要放在htmlPlugin之后
)

module.exports = plugins
