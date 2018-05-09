/**
 * Created by JoeLiu on 2017-9-15.
 */

var webpack = require("webpack");
var prodWebpackConfig = require('./webpack.dist.config');

webpack(prodWebpackConfig, function(err, stats) {
    process.stdout.write(stats.toString());
});