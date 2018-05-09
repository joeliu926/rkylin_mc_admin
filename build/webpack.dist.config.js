/**
 * Created by JoeLiu on 2017-9-15.
 */
process.env.NODE_ENV = 'production';
var webpack = require('webpack');
var merge = require('webpack-merge');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var path = require('path');
var baseWebpackConfig = require('./webpack.base.config');
var utils = require('./utils');
var HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = merge(baseWebpackConfig, {
    output: {
        path: utils.config().prod.outputPath,
        publicPath: utils.config().prod.outputPublicPath,
        filename: 'js/[name].js?[chunkhash]'
    },
    module: {
        rules: utils.styleLoaders()
    },
    plugins: [
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            },
            output: {
                comments: false
            }
        }),
        new webpack.ProgressPlugin(),
        new webpack.optimize.ModuleConcatenationPlugin(),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': '"production"'
        }),
        new ExtractTextPlugin({
            allChunks: true,
            filename: "[name].css?[contenthash:8]"
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor'
        }),
        new HtmlWebpackPlugin({
            filename:'index.html',
            template: 'src/index.html',
            inject: true,
            favicon:'./src/common/img/favicon.ico'
        }),
        new CleanWebpackPlugin(
            ['js/*.js','images','css','fonts'],
            {
                root:__dirname+'/../dist',
                verbose:true,
                dry:false
            }
        )
    ]
})
