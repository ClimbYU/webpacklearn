class MyPlugin {
    constructor() {

    }
    apply(compiler) {
        // compilation钩子---同步
        compiler.hooks.compilation.tap('HelloCompilationPlugin', (compilation) => {
            compilation.hooks.optimize.tap('HelloCompilationPlugin', () => {
                console.log('compilation钩子---同步');
            });
        });
        //done钩子---同步
        compiler.hooks.done.tap('Hello World Plugin', (
            stats /* stats is passed as argument when done hook is tapped.  */
        ) => {
            console.log('done钩子---同步');
        });
        //emit钩子---异步
        compiler.hooks.emit.tapAsync(
            'MyExampleWebpackPlugin',
            (compilation, callback) => {
                console.log('emit钩子---异步');
                callback();
            }
        );
        //run钩子---异步
        compiler.hooks.run.tapAsync(
            'RunPlugin',
            (compilation, callback) => {
                console.log('run钩子---异步');
                callback();
            }
        );
        //make钩子---异步
        compiler.hooks.run.tapAsync(
            'MakePlugin',
            (compilation, callback) => {
                console.log('make钩子---异步');
                callback();
            }
        );
    }
}

module.exports = MyPlugin