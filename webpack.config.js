var path = require("path")
var webpack = require('webpack')
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin')
var MiniCssExtractPlugin = require("mini-css-extract-plugin")
var OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin')

module.exports = {
    entry: './src/index',
    output: {
        path: path.join(__dirname, 'dist'),
        filename: '[name]_[chunkhash:8].js'
    },
    // watch: true,
    // watchOptions: {

    // },
    mode: 'production',
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