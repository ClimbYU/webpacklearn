/**
 * 1-----SyncHook 钩子的使用
 */
const { SyncHook } = require("tapable");

// 创建实例
let syncHook = new SyncHook(["name", "age"]);

// 注册事件
syncHook.tap("1", (name, age) => console.log("1", name, age));
syncHook.tap("2", (name, age) => console.log("2", name, age));
syncHook.tap("3", (name, age) => console.log("3", name, age));

// 触发事件，让监听函数执行
syncHook.call("panda", 18);



/** 
 * 2----- SyncBailHook 钩子的使用
 */
// const { SyncBailHook } = require("tapable");

// // 创建实例
// let syncBailHook = new SyncBailHook(["name", "age"]);

// // 注册事件
// syncBailHook.tap("1", (name, age) => console.log("1", name, age));

// syncBailHook.tap("2", (name, age) => {
//     console.log("2", name, age);
//     return "2";
// });

// syncBailHook.tap("3", (name, age) => console.log("3", name, age));

// // 触发事件，让监听函数执行
// syncBailHook.call("panda", 18);


/**
 * 3----SyncWaterfallHook 钩子的使用
 */
// const { SyncWaterfallHook } = require("tapable");

// // 创建实例
// let syncWaterfallHook = new SyncWaterfallHook(["name", "age"]);

// // 注册事件
// syncWaterfallHook.tap("1", (name, age) => {
//     console.log("1", name, age);
//     return "1";
// });

// syncWaterfallHook.tap("2", data => {
//     console.log("2", data);
//     return "2";
// });

// syncWaterfallHook.tap("3", data => {
//     console.log("3", data);
//     return "3"
// });

// // 触发事件，让监听函数执行
// let ret = syncWaterfallHook.call("panda", 18);
// console.log("call", ret);



/**
 * 4---SyncLoopHook 钩子的使用
 */
// const { SyncLoopHook } = require("tapable");

// // 创建实例
// let syncLoopHook = new SyncLoopHook(["name", "age"]);

// // 定义辅助变量
// let total1 = 0;
// let total2 = 0;

// // 注册事件
// syncLoopHook.tap("1", (name, age) => {
//     console.log("1", name, age, total1);
//     return total1++ < 2 ? true : undefined;
// });

// syncLoopHook.tap("2", (name, age) => {
//     console.log("2", name, age, total2);
//     return total2++ < 2 ? true : undefined;
// });

// syncLoopHook.tap("3", (name, age) => console.log("3", name, age));

// // 触发事件，让监听函数执行
// syncLoopHook.call("panda", 18);



/**
 * 5----AsyncParallelHook
 */

// const { AsyncParallelHook } = require("tapable");

// // 创建实例
// let asyncParallelHook = new AsyncParallelHook(["name", "age"]);

// // 注册事件
// console.time("time");
// asyncParallelHook.tapAsync("1", (name, age, done) => {
//     setTimeout(() => {
//         console.log("1", name, age, new Date());
//         done();
//     }, 1000);
// });

// asyncParallelHook.tapAsync("2", (name, age, done) => {
//     setTimeout(() => {
//         console.log("2", name, age, new Date());
//         done();
//     }, 2000);
// });

// asyncParallelHook.tapAsync("3", (name, age, done) => {
//     setTimeout(() => {
//         console.log("3", name, age, new Date());
//         done();
//         console.timeEnd("time");
//     }, 3000);
// });

// // 触发事件，让监听函数执行
// asyncParallelHook.callAsync("panda", 18, () => {
//     console.log("complete");
// });



/**
 * 6---- AsyncParallelHook 钩子：tapPromise/promise 的使用
 */

// const { AsyncParallelHook } = require("tapable");
// // class AsyncParallelHook {
// //     constructor(args) {
// //         this.args = args;
// //         this.tasks = [];
// //     }
// //     tapPromise(name, task) {
// //         this.tasks.push(task);
// //     }
// //     promise(...args) {
// //         // 传入参数严格对应创建实例传入数组中的规定的参数，执行时多余的参数为 undefined
// //         args = args.slice(0, this.args.length);

// //         // 将所有事件处理函数转换成 Promise 实例，并发执行所有的 Promise
// //         return Promise.all(this.tasks.map(task => task(...args)));
// //     }
// // }

// // 创建实例
// let asyncParallelHook = new AsyncParallelHook(["name", "age"]);

// // 注册事件
// console.time("time");
// asyncParallelHook.tapPromise("1", (name, age) => {
//     return new Promise((resolve, reject) => {
//         setTimeout(() => {
//             console.log("1", name, age, new Date());
//             resolve("1");
//         }, 1000);
//     });
// });

// asyncParallelHook.tapPromise("2", (name, age) => {
//     return new Promise((resolve, reject) => {
//         setTimeout(() => {
//             console.log("2", name, age, new Date());
//             resolve("2");
//         }, 2000);
//     });
// });

// asyncParallelHook.tapPromise("3", (name, age) => {
//     return new Promise((resolve, reject) => {
//         setTimeout(() => {
//             console.log("3", name, age, new Date());
//             resolve("3");
//             console.timeEnd("time");
//         }, 3000);
//     });
// });

// // 触发事件，让监听函数执行
// asyncParallelHook.promise("panda", 18).then(ret => {
//     console.log('ret', ret);
// });



/**
 * 7----AsyncSeriesHook
 */
const { AsyncSeriesHook } = require("tapable");

// 创建实例
let asyncSeriesHook = new AsyncSeriesHook(["name", "age"]);

// 注册事件
console.time("time");
asyncSeriesHook.tapAsync("1", (name, age, next) => {
    setTimeout(() => {
        console.log("1", name, age, new Date());
        next();
    }, 1000);
});

asyncSeriesHook.tapAsync("2", (name, age, next) => {
    setTimeout(() => {
        console.log("2", name, age, new Date());
        next();
    }, 2000);
});

asyncSeriesHook.tapAsync("3", (name, age, next) => {
    setTimeout(() => {
        console.log("3", name, age, new Date());
        next();
        console.timeEnd("time");
    }, 3000);
});

// 触发事件，让监听函数执行
asyncSeriesHook.callAsync("panda", 18, () => {
    console.log("complete");
});


/**
 * 8----AsyncSeriesHook
 */

// const { AsyncSeriesHook } = require("tapable");

// // 创建实例
// let asyncSeriesHook = new AsyncSeriesHook(["name", "age"]);

// // 注册事件
// console.time("time");
// asyncSeriesHook.tapPromise("1", (name, age) => {
//     return new Promise((resolve, reject) => {
//         settimeout(() => {
//             console.log("1", name, age, new Date());
//             resolve("1");
//         }, 1000);
//     });
// });

// asyncSeriesHook.tapPromise("2", (name, age) => {
//     return new Promise((resolve, reject) => {
//         settimeout(() => {
//             console.log("2", name, age, new Date());
//             resolve("2");
//         }, 2000);
//     });
// });

// asyncParallelHook.tapPromise("3", (name, age) => {
//     return new Promise((resolve, reject) => {
//         settimeout(() => {
//             console.log("3", name, age, new Date());
//             resolve("3");
//             console.timeEnd("time");
//         }, 3000);
//     });
// });

// // 触发事件，让监听函数执行
// asyncSeriesHook.promise("panda", 18).then(ret => {
//     console.log(ret);
// });