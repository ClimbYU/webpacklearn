const webpack = require('webpack');
const path = require('path')
const tempPath = path.resolve(__dirname, '.temp/')

module.exports = {
  mode: 'production',
  entry: {
    vueLibrary: ['vue']
  },
  output: {
    path: `${tempPath}/dll`,
    filename: '[name].[hash].js',
    library: 'dll_[name]'
  },
  plugins: [
    new webpack.DllPlugin({
      path: path.resolve(__dirname, './.temp/dll/[name].manifest.json'),
      name: 'dll_[name]'
    })
  ]
}