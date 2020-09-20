const { resolve } = require('path');
const cdn = ''
const baseInclude = [resolve('./src/'), resolve('./.temp/')];
const cssInclude = [...baseInclude];
const imageInclude = [...baseInclude];
const jsInclude = [...baseInclude];
const vueInclude = [...baseInclude];

module.exports = {
  cdn,
  baseInclude,
  cssInclude,
  imageInclude,
  jsInclude,
  vueInclude
}