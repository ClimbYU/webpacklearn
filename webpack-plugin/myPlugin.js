var path = require('path');

class MyPlugin {
    constructor(options) {
        this.opts = Object.assign({
            fileName: 'manifest.json',
            transformExtensions: /^(gz|map)$/i,
        },options)
    }
    apply(compiler) {
        const SyncWaterfallHook = require('tapable').SyncWaterfallHook;
        compiler.hooks.webpackManifestPluginAfterEmit = new SyncWaterfallHook(['manifest']);

        // 需要在输出阶段获取文件名并输出到对应路径
        compiler.hooks.emit.tap('ManifestPlugin',(compilation) => {
            //1.获取需要输出的文件名
            let stats = compilation.getStats().toJson();
            let files = []
            // 提取完整文件名---带有hash值
            files = stats.assets.reduce((file, asset) => {
                file.push(asset.name)
                return file
            },files)
            console.log('files',files)
            // 获取文件名
            let manifest = {}
            manifest = files.reduce((filePath, asset) => {
                let path = this.getFileType(asset)
                filePath[path] = asset
                return filePath
            },manifest)
            console.log('Manifest',manifest)
            //2.将需要输出的文件名解析为json
            let manifestJson = JSON.stringify(manifest, null, 2)
            console.log('manifestJson',manifestJson)
            //3.获取输出路径
            let outputFolder = compiler.options.output.path;
            let outputFile = path.resolve(outputFolder, this.opts.fileName);
            let outputName = path.relative(outputFolder, outputFile);
            //4.更新compilation.assets[outputName]并输出
            compilation.assets[outputName] = {
                source: function() {
                  return manifestJson;
                },
                size: function() {
                  return manifestJson.length;
                }
            };
          // 用于外部获取
            compiler.hooks.webpackManifestPluginAfterEmit.call(manifest);
        }



        );
    }
}

MyPlugin.prototype.getFileType = function(str) {
    str = str.replace(/\?.*/, '');
    let split = str.split('.');
    let ext = split.pop();
    if (this.opts.transformExtensions.test(ext)) {
      ext = split.pop() + '.' + ext;
    }
    return split[0] + '.' + ext;
  };
module.exports = MyPlugin