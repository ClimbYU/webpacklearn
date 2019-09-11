const fs = require('fs')
const cwd = process.cwd()
const path = require('path')

function getFile () {
    return new Promise((resolve, reject) => {
        fs.readdir(path.resolve(__dirname, '../dll/library'), function (err, file) {
            if (!err) {
                const jsFile = []
                const jsonFile = []
                file.map(item => {
                    if (/.js$/.test(item)) {
                        jsFile.push(item)
                    } else {
                        jsonFile.push(item)
                    }
                })

                resolve({ jsFile, jsonFile })
            }
            reject()
        })
    })
}
async function getFileMap () {
    const jsFile = []
    const jsonFile = []
    const file = await getFile()
    file.map(item => {
        if (/.js$/.test(item)) {
            jsFile.push(item)
        } else {
            jsonFile.push(item)
        }
    })
    return { jsFile, jsonFile }
}

class DllManifestList {
    apply (compiler) {
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
    apply (compiler) {
        compiler.hooks.emit.tapAsync('DllManifestScript', function (compilation, next) {
            getFile().then((res) => {
                const { jsFile } = res
                for (const [key, value] of Object.entries(compilation.assets)) {
                    if (/\.html/.test(key)) {
                        const data = value.source()

                        let scriptList = jsFile.map(item => `<script src='static/js/${item}'></script>\n`)
                        scriptList = scriptList.join('')
                        value.source = () => {
                            return data.replace(/(<script\s+src=(")static\/js\/\{\{library\}\}("))>.*?<\/script>/g, scriptList)
                        }
                    }
                }
                next()
            })
        })
    }
}
class DllManifestScriptCopy {
    apply (compiler) {
        compiler.plugin('done', function (compilation) {
            const { outputPath } = compiler
            const manifestList = require(`${cwd}/dll/manifest.list.json`)
            for (const [key, file] of Object.entries(manifestList)) {
                // console.log(cwd, outputPath)
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
