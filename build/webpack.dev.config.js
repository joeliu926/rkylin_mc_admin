/**
 * Created by JoeLiu on 2017-9-15.
 */

var webpack = require('webpack');
var merge = require('webpack-merge');
var baseWebpackConfig = require('./webpack.base.config');
var utils = require('./utils');
var FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');

Object.keys(baseWebpackConfig.entry).forEach(function (name) {
    baseWebpackConfig.entry[name] = [
        `webpack-dev-server/client?http://localhost:${utils.config().dev.port}/`,
        "webpack/hot/dev-server"
    ].concat(baseWebpackConfig.entry[name])
});

module.exports = merge(baseWebpackConfig, {
    output: {
        path: utils.config().dev.outputPath,
        publicPath: utils.config().dev.outputPublicPath
    },
    module: {
        rules: utils.styleLoaders()
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
        new FriendlyErrorsPlugin(),
        new HtmlWebpackPlugin({
            filename:'index.html',
            template: 'src/index.html',
            inject: true,
            favicon:'./src/common/img/favicon.ico'
        }),
    ]
})
