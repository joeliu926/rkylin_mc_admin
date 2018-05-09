/**
 * Created by JoeLiu on 2017-9-15.
 */
var webpack = require('webpack');
var webpackDevServer = require('webpack-dev-server');
var devConfig = require("./webpack.dev.config");
var utils = require('./utils');
var compiler = webpack(devConfig);
var url = `http://localhost:${utils.config().dev.port}/`;
var opn = require('opn');
var server = new webpackDevServer(compiler, {
    historyApiFallback:true,//不跳转
    hot: true,
    quiet: true,
/*    proxy: {
        '/dist': {
            target: 'http://localhost:8022/',
            secure: false
        }
    },*/
    publicPath: utils.config().dev.outputPublicPath,
    stats: { colors: true },
    contentBase: './dev'
});
server.listen(utils.config().dev.port, "0.0.0.0");

/*
server.middleware.waitUntilValid(function() {
    console.log(`> Listening at ${url}`);
    opn(`${url}`);
})*/
