const { resolve } = require('path')
const tempPath = resolve(__dirname, '.temp')
const crypto = require('crypto');
const plugins = {}

plugins['postcss-sprites'] = {
  spritePath: `${tempPath}/sprites`,
  groupBy: function (image) {
    const imagePath = image.path.replace(__dirname, '').replace(/\\/g, '/')
    //同一文件夹下的分为同一组
    const path = imagePath.match(/.*(sprites\/.*\/).*\.(png|jpe?g|svg|gif)$/);
    const groupName = crypto.createHash('sha1').update(path && path[1] ? path[1] : 'none').digest('hex');
    return Promise.resolve(groupName);
  },
  filterBy: function (image) {
    if (!/sprites?\//.test(image.url)) {
      return Promise.reject(new Error(''));
    }
    return Promise.resolve();
  },
  // hooks: {
  //   onUpdateRule: function (rule, token, image) {
  //     console.log(1111, rule)
  //     console.log(222, token)
  //     console.log(3333, image)
  //   }
  // }
}



module.exports = {
  plugins: {
    'postcss-preset-env': {
      autoprefixer: true
    },
    cssnano: {},
    ...plugins
  }
}