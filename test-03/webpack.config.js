var path = require('path')

module.exports = function(env) {
    return {
        /**
         * 单入口
         */
        // entry: './index.js',
        // output: {
        //     // filename:'[chunkhash].[name].js', //732e589404d3bf435878.main.js
        //     filename: '[chunkhash].[name].js', //baed78fde0ffbeb05a16.main.js
        //     path: path.resolve(__dirname, 'dist')
        // }



        /**
         * 多入口,生成的main.[chunkhash].js与vendor.[chunkname].中
         * 公共代码在两个bundle中都存在
         */
        entry: {
            main: './index.js',
            vendor: 'moment'
        },
        output: {
            filename: '[name].[chunkhash].js',
            path: path.resolve(__dirname, 'dist')
        }

    }
}