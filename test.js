const cwd = process.cwd();
const { readdir } = require('fs')
const path = require('path');
const plugin = [];
const dllDir = path.resolve(__dirname, '.temp/dll');
readdir(dllDir, (error, files) => {
  if (!error) {
    console.log(files)
  }
})