var webpackDevServer = require('webpack-dev-server')
var webpack = require('webpack')

var config = require("./webpack.config.js");
// config.entry.app.unshift("webpack-dev-server/client?http://localhost:8080/", "webpack/hot/dev-server");
// 编译
var compiler = webpack(config);

// 初始化一个webpack-dev-server
new webpackDevServer(compiler, {
    // publicPath: config.output.publicPath,
    historyApiFallback: false,
    stats: {
        colors: true
    }
}).listen(8080, 'localhost', function(error) {
    if (error) {
        console.error(error);
    }
});