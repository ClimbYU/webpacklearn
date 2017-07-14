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
        //publicPath:'http://www.cdn/',//����·��
        filename:'js/[name]_[chunkhash].js'
    },
    plugins:[
        new htmlWebpackPlugin({
            //filename:'index_[chunkhash].html',
            inject:'body',//�������body��ǩ��
            template:'index.html',
            minify:{//ѹ��
                removeComments: true,//ɾ��ע��
                collapseWhiteSpace:true//ɾ���ո�
            }
        }),
        //new htmlWebpackPlugin({  //������ҳ��
        //    //filename:'a.html',
        //    //inject:'body',//�������body��ǩ��
        //    template:'index.html',
        //    //minify:{//ѹ��
        //    //    removeComments: true,//ɾ��ע��
        //    //    collapseWhiteSpace:true//ɾ���ո�
        //    //}
        //    chunks:['main','a'],
        //excludechunks:['main','c']
        //}),
        //new htmlWebpackPlugin({  //������ҳ��
        //    filename:'b.html',
        //    //inject:'body',//�������body��ǩ��
        //    template:'index.html',
        //    //minify:{//ѹ��
        //    //    removeComments: true,//ɾ��ע��
        //    //    collapseWhiteSpace:true//ɾ���ո�
        //    //}
        //    chunks:['main','a','c']
        //}),
        //new htmlWebpackPlugin({  //������ҳ��
        //    filename:'c.html',
        //    //inject:'body',//�������body��ǩ��
        //    template:'index.html',
        //    //minify:{//ѹ��
        //    //    removeComments: true,//ɾ��ע��
        //    //    collapseWhiteSpace:true//ɾ���ո�
        //    //}
        //    chunks:['main','a','b']
        //})
    ]

}