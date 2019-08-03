const {
    SyncHook,
    AsyncSeriesHook
} = require('tapable');

class Compiler {
    constructor(options) {
        this.hooks = {
            run: new SyncHook(["newSpeed"]),
            emit: new AsyncSeriesHook(["compilation"])
        };
        let plugins = options.plugins;
        if (plugins && plugins.length > 0) {
            plugins.forEach(plugin => plugin.apply(this));
        }
    }
    run(param) {
        this.hooks.run.call(param);
    }
    emit() {
        const args = Array.from(arguments)
        console.log('args', args)
        this.hooks.emit.callAsync(...args, err => {
            if (err) console.log(err)
        });
    }
}



class MyPlugin {
    constructor() {

    }
    apply(compiler) {//接受 compiler参数
        compiler.hooks.run.tap("run", () => console.log('run'));
        compiler.hooks.emit.tapAsync("emit tapAsync", (callback) => {
            setTimeout(() => {
                console.timeEnd('cost');
                console.log('emit tapAsync')
                callback();
            }, 1000)
        });
    }
}


//这里类似于webpack.config.js的plugins配置
//向 plugins 属性传入 new 实例

const myPlugin = new MyPlugin();

const options = {
    plugins: [myPlugin]
}
let compiler = new Compiler(options)
compiler.run()
console.time('cost');
compiler.emit()

