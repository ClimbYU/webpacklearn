const fs = require('fs')
const cwd = process.cwd()
const path = require('path')

const jsFile = []
const jsonFile = []

function getFile() {
  return new Promise((resolve, reject) => {
    fs.readdir(path.resolve(__dirname, './dll/library'), function (err, file) {
      if (!err) {
        resolve(file)
      }
      reject()
    })
  })
}
async function getFileMap() {
  const file = await getFile()
  console.log(file)
  file.map(item => {
    console.log(item)
    if (/.js$/.test(item)) {
      jsFile.push(item)
    } else {
      jsonFile.push(item)
    }
  })
  console.log(jsonFile, jsFile)
}

getFileMap()