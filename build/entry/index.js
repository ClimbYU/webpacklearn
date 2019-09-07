var path = require('path')
const glob = require('glob')

const entry = () => {
  const entries = {}

  const entriesFiles = glob.sync(path.resolve(__dirname, '../../src/*/index.js'))

  Object.keys(entriesFiles)
    .map((index) => {
      const entryFile = entriesFiles[index]
      const match = entryFile.match(/src\/(.*)\/index\.js/)
      const pageName = match && match[1]
      entries[pageName] = entryFile
    })

  return entries
}
module.exports = entry