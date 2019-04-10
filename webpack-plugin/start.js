var webpack = require("webpack")
var config = require('./webpack.config.js')
var webpackDevMiddleware = require('webpack-dev-middleware')
var express = require('express')

let compiler = webpack(config)

compiler.hooks.webpackManifestPluginAfterEmit.tap("webpackManifestPluginAfterEmit",(manifest) => {

    console.log('manifest',manifest)
})

const app = express()

app.use(webpackDevMiddleware(compiler, {
    publicPath: ''
}));
