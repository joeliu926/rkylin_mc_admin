/**
 * Created by JoeLiu on 2017-9-15.
 */

var webpack = require('webpack');
var path = require('path');
var fs = require('fs');
var utils = require('./utils');
function resolve(relPath) {
    return path.resolve(__dirname, relPath);
}

/////////////////////////modify CONSTANT file///////////////////////////
var sBaseUrl=process.argv[2]||"http://localhost:8023";
var sWsUrl=process.argv[3]||"ws://localhost:8053/";
var sUploadUrl=process.argv[4]||"https://nihaomc.com/uploadimg_test/";
var sBaseUrl_one=process.argv[5]||"https://nihaomc.com/uploadimg_test/";
var constantFile="../src/common/utils/constants.js";
var constantPath=path.join(__dirname,constantFile);
var constantData = fs.readFileSync(constantPath,'utf-8');
constantData = constantData + "";
constantData = constantData.replace(/host:\s*\S+?,/,function (word){
    return 'host:"'+sBaseUrl+'",';
});

constantData = constantData.replace(/wsReqUrl:\s*\S+?,/,function (word){
    return 'wsReqUrl:"'+sWsUrl+'",';
});

constantData = constantData.replace(/fileUpload:\s*\S+?,/,function (word){
    return 'fileUpload:"'+sUploadUrl+'",';
});

constantData = constantData.replace(/host_one:\s*\S+?,/,function (word){
    return 'host_one:"'+sBaseUrl_one+'",';
});


console.log('constantData',constantData);
fs.writeFileSync(constantPath, constantData, function(err) {
	if(err) {
		console.log("error! " + file);
		console.log(err);
	} else {
		console.log("CONSTANT.js success! ");
	}
});
//////////////////////////////////////////////////////////////


module.exports = {
    entry: {
        index: ['babel-polyfill','./src/bootstrap.js'],
        vendor: ['jquery','jsutils']
    },
    output: {
        filename: 'js/[name].js',
        chunkFilename: "js/[name].[chunkhash].js"
    },
    resolve: {
        extensions: ['.js', '.vue', '.json'],
        alias: {
        /*    '@': resolve('../src'),
            '~': resolve('../src/assets'),*/
            "jquery":resolve('../src/jslibrary/jquery/jquery.min.js'),
            'jsutils': resolve('../src/common/utils/jsutils.js')
        }
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: "babel-loader",
                include: [resolve('../src')]
            },

            {
                test: /\.vue$/,
                use: {
                    loader: "vue-loader",
                    options: utils.vueLoaderOptions()
                }
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                use: {
                    loader: "url-loader",
                    options: {
                        limit: 1000,
                        name: 'images/[name].[hash:7].[ext]'
                    }
                }
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                use: [{
                    loader: "url-loader",
                    options: {
                        limit: 1000,
                        name: 'fonts/[name].[hash:7].[ext]'
                    }
                }]
            }
        ]
    },
    plugins: [
        new webpack.ProvidePlugin({
            $:"jquery",
            jQuery:"jquery",
            "_":"jsutils"
        })
    ]
}
