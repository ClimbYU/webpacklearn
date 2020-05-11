const { readdir } = require('fs')
const { resolve } = require('path');
const { cdn } = require('../env.js')
const dllDir = resolve(__dirname, '../.temp/dll');

function getJsFile() {
  return new Promise((resolve) => {
    readdir(dllDir, (error, files) => {
      console.log(error);
      if (!error) {
        resolve(files)
      } else {
        resolve([])
      }
    })
  })
}

class DllScriptPlugin {
  apply(compiler) {
    compiler.hooks.emit.tapAsync('dllinsert', async (compilation, callback) => {
      const files = await getJsFile();
      const { assets } = compilation;
      files.map(file => {
        if (/\.js$/.test(file)) {

          for (const [key, value] of Object.entries(assets)) {
            if (/\.html$/.test(key)) {
              const assetValue = value.source();
              value.source = () => {
                return assetValue.replace(/<!--{{dll}}-->/g, `<script src="${cdn}/js/${file}"></script>`)
              }
            }
          }
        }
      })

      callback()
    })
  }
}

module.exports = DllScriptPlugin