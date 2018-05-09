/**
 * Created by JoeLiu on 2017-9-15.
 */
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var isProd = process.env.NODE_ENV === "production";
var path = require('path');
var cssLang = [{
    name: 'css',
    reg: /\.css$/,
    loader: 'css-loader'
}, {
    name: 'stylus',
    reg: /\.styl$/,
    loader: "stylus-loader"
}, {
    name: 'less',
    reg: /\.less$/,
    loader: "less-loader"
}, {
    name: 'sass',
    reg: /\.scss$/,
    loader: "sass-loader"
}];

function genLoaders(lang) {
    var loaders = ['css-loader'];
    if (lang.name !== 'css') {
        loaders.push(lang.loader);
    }
    if (isProd) {
        // 生产环境需要提取CSS
        loaders = ExtractTextPlugin.extract({
            use: loaders
        });
    } else {
        // 开发环境需要vue-style-loader将CSS提取到页面头部
        loaders.unshift('vue-style-loader');
    }
    return loaders;
}
// 各种CSS的loader
exports.styleLoaders = function () {
    var output = [];
    cssLang.forEach(lang => {
        output.push({
            test: lang.reg,
            use: genLoaders(lang)
        })
    })
    return output;
};
exports.vueLoaderOptions = function () {
    var options = {
        loaders: {}
    };
    cssLang.forEach(lang => {
        options.loaders[lang.name] = genLoaders(lang);
    });
    return options;
}

exports.config = function () {
    return {
        dev: {
            outputPath: path.resolve(__dirname, '../dev'),
            outputPublicPath: '',
            port: 8068
        },
        prod: {
            outputPath: path.resolve(__dirname, '../dist'),
            outputPublicPath: ''
        }
    }

}
