const path = require("path")
const webpack = require('webpack')
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin')
const { cdn } = require('./env.js')
const isDev = process.env.NODE_ENV === 'development' ? true : false

module.exports = {
    entry: './src/index',
    output: {
        path: path.join(__dirname, 'dist'),
        filename: '[name]_[chunkhash:8].js'
    },
    stats: {
        assets: true,
        modules: false,
    },
    // watch: true,
    // watchOptions: {

    // },
    // mode: 'production',
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
                    {
                        loader: isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
                        options: isDev ? {} : {
                            publicPath: cdn ? cdn : '../'
                        }
                    },// 必须放在上面用于解析字体或less
                    { loader: 'css-loader' },
                    {
                        loader: 'postcss-loader',
                    },
                    {
                        loader: 'less-loader'
                    }, // less-loader需放在postloader后面
                ]
            },
            {
                test: /.(png|jpg|gif|jpeg)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 1024 * 10
                        }
                    },
                    {
                        loader: 'image-webpack-loader',
                        options: {
                            pngquant: {
                                quality: [0.65, 0.90],
                                speed: 4
                            },
                            optipng: {
                                enabled: true
                            },
                            mozjpeg: {
                                progressive: true,
                                quality: [65, 95]
                            },
                            gifsicle: {
                                interlaced: false
                            }
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
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, 'src/index.html'),
            filename: 'index.html',
            // chunks: ['main'], // 可以指定使用哪些chunk
            inject: true,
            minify: {
                html5: true,
                collapseWhitespace: true,
                preserveLineBreaks: false,
                minifyCSS: true,
                minifyJS: true,
                removeComments: false
            }
        }),
        new VueLoaderPlugin(), // vue加载需要此插件
        new CleanWebpackPlugin(), // 删除dist
        new MiniCssExtractPlugin({ // 提取css为单独文件
            filename: '[name]_[contenthash:8].css'
        }),
        new OptimizeCssAssetsWebpackPlugin({ // 压缩css
            assetNameRegExp: /\.css$/g,
            cssProcessor: require('cssnano') // 使用cssnano压缩
        })
    ]
}