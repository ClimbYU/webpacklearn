// /**
//  * 通过执行这个项目的 webpack 构建，我们发现 webpack 创建了2个新的文件束，
//  * bundle.js 和 0.bundle.js。
//  * entry.js 和 a.js 被打包进 bundle.js.
//  * b.js 被打包进 0.bundle.js.
//  */

// require('./a');
// require.ensure([], function(require) {
//     require('./b'); //代码保证了拆分点被创建，而且 b.js 被 webpack 分开打包。
// });


// /**
//  * 下面代码， a.js 和 b.js 都被打包到一起，而且从主文件束中拆分出来。
//  * 但只有 b.js 的内容被执行。a.js 的内容仅仅是可被使用，但并没有被输出。
//  * 想去执行 a.js，我们需要异步地引用它，如 require('./a.js')，让它的 JavaScritp 被执行。
//  * 
//  */
// require.ensure(['./a'], function(require) {
//     require('./b'); //代码保证了拆分点被创建，而且 b.js 被 webpack 分开打包。
// });


alert('Hello world')