const path = require('path')
const webpack = require('webpack')

module.exports = {
  entry: {
    library: [
      'vue'
    ]
  },
  output: {
    filename: '[name].dll.js',
    path: path.resolve(__dirname, 'build/library'),
    library: '[name]'
  },
  plugins: [
    new webpack.DllPlugin({
      name: '[name]_[hash]',
      path: path.resolve(__dirname, 'build/library/[name].json'),
    })
  ]
}


// console.log(path.resolve(__dirname, 'dist'))
// console.log(path.join(__dirname, 'dist'))