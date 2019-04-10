var webpack = require("webpack")
var config = require('./webpack.config.js')
var webpackDevMiddleware = require('webpack-dev-middleware')
var express = require('express')

let compiler = webpack(config)

const app = express()

app.use(webpackDevMiddleware(compiler, {
    publicPath: ''
}));
