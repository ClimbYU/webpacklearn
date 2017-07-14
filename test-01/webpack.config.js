/**
 * Created by Administrator on 2017/5/10 0010.
 */
var htmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
    entry:{
        main:'./src/script/main.js',
        a:'./src/script/a.js',
        //b:'./src/script/b.js',
        //c:'./src/script/c.js'
    },
    output:{
        path:__dirname+'/dist',
        //publicPath:'http://www.cdn/',//公共路径
        filename:'js/[name]_[chunkhash].js'
    },
    plugins:[
        new htmlWebpackPlugin({
            //filename:'index_[chunkhash].html',
            inject:'body',//引入放在body标签内
            template:'index.html',
            minify:{//压缩
                removeComments: true,//删除注释
                collapseWhiteSpace:true//删除空格
            }
        }),
        //new htmlWebpackPlugin({  //生产多页面
        //    //filename:'a.html',
        //    //inject:'body',//引入放在body标签内
        //    template:'index.html',
        //    //minify:{//压缩
        //    //    removeComments: true,//删除注释
        //    //    collapseWhiteSpace:true//删除空格
        //    //}
        //    chunks:['main','a'],
        //excludechunks:['main','c']
        //}),
        //new htmlWebpackPlugin({  //生产多页面
        //    filename:'b.html',
        //    //inject:'body',//引入放在body标签内
        //    template:'index.html',
        //    //minify:{//压缩
        //    //    removeComments: true,//删除注释
        //    //    collapseWhiteSpace:true//删除空格
        //    //}
        //    chunks:['main','a','c']
        //}),
        //new htmlWebpackPlugin({  //生产多页面
        //    filename:'c.html',
        //    //inject:'body',//引入放在body标签内
        //    template:'index.html',
        //    //minify:{//压缩
        //    //    removeComments: true,//删除注释
        //    //    collapseWhiteSpace:true//删除空格
        //    //}
        //    chunks:['main','a','b']
        //})
    ]

}