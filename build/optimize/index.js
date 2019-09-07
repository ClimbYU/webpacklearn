const TerserPlugin = require('terser-webpack-plugin') // 提升打包速度

var optimization = {
  splitChunks: {
    chunks: 'all', //  async
    cacheGroups: {
      vendors: {
        // test: /vue/,
        // name: 'vendors',
        // chunks: 'all'
        // test: /node_modules/,
        minSize: 1024 * 10,
        chunks: 'all',
        name: 'common',
        priority: -10,
        minChunks: 2// 至少引用两次
      },
      // default: { // 提取业务公公代码
      //     chunks: 'initial',
      //     minChunks: 2,
      //     priority: -20,
      //     minSize: 30,
      //     name: 'common'
      // }
    }
  },
  minimizer: [
    new TerserPlugin({
      parallel: 4,
      cache: true // 开启缓存提升打包速度
    })
  ]
}

module.exports = optimization