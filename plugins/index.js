const fs = require('fs')
const cwd = process.cwd()
const manifestList = require(`${cwd}/build/manifest.list.json`)
console.log(manifestList)
class DllManifestList {
    apply (compiler) {
        compiler.plugin('emit', function (compilation, next) {
            const assets = Object.keys(compilation.assets)
            const assetsList = {}
            assets.forEach(item => {
                assetsList[item.replace(/\..*$/g, '')] = item
            })
            fs.writeFile('./build/manifest.list.json', JSON.stringify(assetsList), (error) => {
                if (error) {
                    console.log(error)
                }
            })
            next()
        })
    }
}
class DllManifestScript {
    apply (compiler) {
        compiler.plugin('emit', function (compilation, next) {
            for (const [key, value] of Object.entries(compilation.assets)) {
                if (/\.html/.test(key)) {
                    const data = value.source()
                    value.source = () => {
                        return data.replace(/(<script\s+src=".*?)\{\{(.*?)\}\}(")/g, (a, b, c, d) => {
                            return `${b}${manifestList[c]}${d}`
                        })
                    }
                }
            }
            next()
        })
    }
}
class DllManifestScriptCopy {
    apply (compiler) {
        compiler.plugin('done', function (compilation) {
            const { outputPath } = compiler
            for (const [key, file] of Object.entries(manifestList)) {
                fs.copyFile(`${cwd}/build/library/${file}`, `${outputPath}/${file}`, error => {
                    if (error) {
                        console.log(key, error)
                    }
                })
            }
        })
    }
}
module.exports = {
    DllManifestList,
    DllManifestScript,
    DllManifestScriptCopy
}
