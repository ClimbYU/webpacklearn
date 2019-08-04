var path = require("path")
var glob = require('glob')
var webpack = require('webpack')
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin')
var MiniCssExtractPlugin = require('mini-css-extract-plugin')
var OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin')
// var HtmlWebpackExternalsPlugin = require('html-webpack-externals-plugin')

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
    entry: entries,
    output: {
        path: path.join(__dirname, 'dist'),
        filename: '[name][hash:8].js'
    },
    mode: 'development',
    devtool: 'source-map',
    optimization: {

    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: 'babel-loader'
            },
            {
                test: /\.vue$/,
                use: 'vue-loader',
            },
            {
                test: /\.(css|less|scss)$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    // 'style-loader',
                    'css-loader',
                    'less-loader'
                    // 'postcss-loader'
                ]
            },
            {
                test: /.(png|jpg|gif|jpeg)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 10240
                        }
                    }
                ]
            },
            {
                test: /.(woff|woff2|eot|ttf|otf)$/,
                use: 'file-loader'
            }
        ]
    },
    plugins: [
        new VueLoaderPlugin(), // vue加载需要此插件
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename: '[name]_[contenthash:8].css'
        }),
        new OptimizeCssAssetsWebpackPlugin({ // 压缩css
            assetNameRegExp: /\.css$/g,
            cssProcessor: require('cssnano') // 使用cssnano压缩
        }),
        new webpack.HotModuleReplacementPlugin(),
        // new HtmlWebpackExternalsPlugin({
        //     externals: [
        //         {
        //             module: 'vue',
        //             entry: 'https://cdnjs.cloudflare.com/ajax/libs/vue/2.6.10/vue.min.js',
        //             global: 'Vue',
        //         },
        //     ],
        // })
    ].concat(htmlWebpackPlugins),
    devServer: {
        contentBase: './dist',
        hot: true
    }
}