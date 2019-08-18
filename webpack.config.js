var path = require("path")
const glob = require('glob')
var webpack = require('webpack')
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin')
var MiniCssExtractPlugin = require("mini-css-extract-plugin")
var OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin')
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
// var HtmlWebpackExternalsPlugin = require("html-webpack-externals-plugin")
// const ModuleConcatenationPlugin = require('webpack/lib/optimize/ModuleConcatenationPlugin');
const SpeedMeasureWebpackPlugin = require('speed-measure-webpack-plugin')// 速度分析
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin // 包体积图
const HappyPack = require('happypack') // 开启多线程打包
const TerserPlugin = require('terser-webpack-plugin') // 提升打包速度
const HardSourceWebpackPlugin = require('hard-source-webpack-plugin') // 开启缓存提升打包速度

const swmp = new SpeedMeasureWebpackPlugin()

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
                    chunks: ['commons', pageName],
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

module.exports = swmp.wrap({
    entry: entries,
    output: {
        path: path.join(__dirname, 'dist'),
        filename: '[name]_[chunkhash:8].js'
    },
    mode: 'production',
    optimization: {
        splitChunks: {
            cacheGroups: {
                commons: {
                    // test: /vue/,
                    // name: 'vendors',
                    // chunks: 'all'
                    minSize: 1024 * 100,
                    chunks: 'all',
                    name: 'commons',
                    minChunks: 2//至少引用两次
                }
            }
        },
        minimizer: [
            new TerserPlugin({
                parallel: 4,
                cache: true // 开启缓存提升打包速度
            })
        ]
    },
    resolve: {
        alias: {
            'vue': path.resolve(__dirname, './node_modules/vue/dist/vue.min.js')
        },
        extensions: ['.js'],
        mainFields: ['main']

    },
    // stats: 'errors-only',// 减少控制台日志输出
    module: {
        rules: [
            {
                test: /\.js$/,
                include: path.resolve('src'),
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'thread-loader',
                        options: {
                            workers: 3
                        }
                    },
                    'babel-loader?cacheDirectory=true', // 开启缓存
                    // 'eslint-loader'
                    // 'happypack/loader'
                ]
            },
            {
                test: /\.vue$/,
                use: 'vue-loader',
            },
            {
                test: /\.(css|less|scss)$/,
                use: [
                    MiniCssExtractPlugin.loader,// 必须放在上面用于解析字体或less
                    'css-loader',
                    {
                        loader: 'px2rem-loader', // 此loader不能放在最后
                        options: {
                            remUnit: 75,// 1rem = 75px;
                            remPrecision: 8// px 转换为rem后小数点的位数
                        }
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            plugins: () => [
                                require('autoprefixer')({
                                    browsers: ['last 2 version', '>1%', 'ios 7']
                                })
                            ]
                        }
                    },
                    'less-loader', // less-loader需放在postloader后面
                ]
            },
            {
                test: /.(png|jpg|gif|jpeg)$/,
                use: [
                    {
                        // loader: 'url-loader',
                        // options: {
                        //     limit: 10240
                        // }
                        loader: 'file-loader',
                        options: {
                            name: '[name]_[hash:8].[ext]'
                        }
                    }
                ]
            },
            {
                test: /.(woff|woff2|eot|ttf|otf)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name]_[hash:8].[ext]'
                        }
                    }
                ],
            }
        ]
    },
    plugins: [
        new VueLoaderPlugin(), // vue加载需要此插件
        new CleanWebpackPlugin(), // 删除dist
        new MiniCssExtractPlugin({ // 提取css为单独文件
            filename: '[name]_[contenthash:8].css'
        }),
        new OptimizeCssAssetsWebpackPlugin({ // 压缩css
            assetNameRegExp: /\.css$/g,
            cssProcessor: require('cssnano') // 使用cssnano压缩
        }),
        new FriendlyErrorsWebpackPlugin(),
        new HardSourceWebpackPlugin()
        // new BundleAnalyzerPlugin(),
        // new HappyPack({
        //     // 3) re-add the loaders you replaced above in #1:
        //     loaders: ['babel-loader']
        // })
        // new webpack.DllReferencePlugin({
        //     manifest: require('./build/library/library.json')
        // })
    ].concat(htmlWebpackPlugins)
})