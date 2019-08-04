var path = require("path")
const glob = require('glob')
var webpack = require('webpack')
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin')
var MiniCssExtractPlugin = require("mini-css-extract-plugin")
var OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin')
// var HtmlWebpackExternalsPlugin = require("html-webpack-externals-plugin")
// const ModuleConcatenationPlugin = require('webpack/lib/optimize/ModuleConcatenationPlugin');


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

module.exports = {
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
        }
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: ['babel-loader',
                    'eslint-loader'
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
        // new ModuleConcatenationPlugin(),
        // new HtmlWebpackExternalsPlugin({
        //     externals: [
        //         {
        //             module: 'vue',
        //             entry: 'https://cdnjs.cloudflare.com/ajax/libs/vue/2.6.10/vue.min.js',
        //             global: 'Vue',
        //         },
        //     ],
        // })
    ].concat(htmlWebpackPlugins)
}