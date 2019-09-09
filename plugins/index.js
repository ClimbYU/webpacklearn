const fs = require('fs')
const cwd = process.cwd()

class DllManifestList {
    apply(compiler) {
        compiler.plugin('emit', function (compilation, next) {
            const assets = Object.keys(compilation.assets)
            const assetsList = {}
            assets.forEach(item => {
                assetsList[item.replace(/\..*$/g, '')] = item
            })
            fs.writeFile('./dll/manifest.list.json', JSON.stringify(assetsList), (error) => {
                if (error) {
                    console.log(error)
                }
            })
            next()
        })
    }
}
class DllManifestScript {
    apply(compiler) {
        compiler.plugin('emit', function (compilation, next) {
            const manifestList = require(`${cwd}/dll/manifest.list.json`)
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
    apply(compiler) {
        compiler.plugin('done', function (compilation) {
            const { outputPath } = compiler
            const manifestList = require(`${cwd}/dll/manifest.list.json`)
            for (const [key, file] of Object.entries(manifestList)) {
                console.log(cwd, outputPath)
                fs.copyFile(`${cwd}/dll/library/${file}`, `${outputPath}/static/js/${file}`, error => {
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
