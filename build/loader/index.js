var MiniCssExtractPlugin = require('mini-css-extract-plugin')
var path = require('path')
var rules = [
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
      'babel-loader?cacheDirectory=true' // 开启缓存
      // 'eslint-loader'
      // 'happypack/loader'
    ]
  },
  {
    test: /\.vue$/,
    use: 'vue-loader'
  },
  {
    test: /\.(css|less|scss)$/,
    use: [
      MiniCssExtractPlugin.loader, // 必须放在上面用于解析字体或less
      {
        loader: 'css-loader'
      },
      {
        loader: 'px2rem-loader', // 此loader不能放在最后
        options: {
          remUnit: 75, // 1rem = 75px;
          remPrecision: 8// px 转换为rem后小数点的位数
        }
      },
      {
        loader: 'postcss-loader',
        options: {
          plugins: () => [
            require('autoprefixer')()
          ]
        }
      },
      'less-loader' // less-loader需放在postloader后面
    ]
  },
  {
    test: /.(png|jpg|gif|jpeg)$/,
    use: [
      {
        loader: 'file-loader',
        options: {
          name: 'static/assets/img/[name]_[hash:8].[ext]',
          publicPath: "/" // 解决background:url()路径错误问题
        }
      },
      {
        loader: 'image-webpack-loader',
        options: {
          mozjpeg: {
            progressive: true,
            quality: 65
          },
          // optipng.enabled: false will disable optipng
          optipng: {
            enabled: false
          },
          pngquant: {
            quality: '65-90',
            speed: 4
          },
          gifsicle: {
            interlaced: false
          },
          // the webp option will enable WEBP
          webp: {
            quality: 75
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
          name: 'static/assets/fonts/[name]_[hash:8].[ext]'
        }
      }
    ]
  }
]

module.exports = rules