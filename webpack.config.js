var webpack = require("webpack");
var path = require("path");
var HtmlPlugin = require("html-webpack-plugin");
var ExtractCssPlugin = require("extract-text-webpack-plugin");

module.exports = {
    entry: {
        index: "./src/index.js",
    },
    output: {
        path: path.resolve(__dirname, 'dist/admin'),
        filename: "static/js/index.js"
        // chunkFilename: "news/static/js/[name].js"
    },
    module: {
        rules: [{
            test: /\.vue$/i,
            exclude: /node_modules/,
            use: "vue-loader"
        }, {
            test: /\.scss$/i,
            exclude: /node_modules/,
            use: ExtractCssPlugin.extract({
                fallback: "style-loader",
                use: "style-loader!css-loader"
            })
        },{
            test:/\.css$/i,
            use:["style-loader","css-loader"]
        }, {
            test: /\.(jpeg|jpg|png|gif|woff|woff2|ttf|eot)$/i,
            use: "url-loader?limit=1024*10&outputPath=static/css/"
        }, {
            test: /\.js$/i,
            exclude: /node_modules/,
            use: ['babel-loader?presets[]=es2015']
        }]
    },
    plugins: [
        new HtmlPlugin({
            title: "分手吧",
            inject: "body",
            xhtml: true,
            hash: true,
            filename: "index.html",
            template: "./src/template/layout.html",
            // excludeChunks:['common'],
            chunks: ['index']
        }),
        // new ExtractCssPlugin("admin/static/css/main.css"),
        // new webpack.optimize.CommonsChunkPlugin({
        //     name: "common"
        // }),  
        // new webpack.optimize.UglifyJsPlugin({
        //     test: /\.js($|\?)/i,
        //     exclude: /node_modules/,
        //     parallel: true,
        //     sourceMap: true,
        //     uglifyOptions: {
        //         warnings: true,
        //         compress: true,
        //     }
        // })

    ],
    resolve: {
        alias: {
            'vue': 'vue/dist/vue.common.js'
        }
    },
    // optimization:{
    //     runtimeChunk:{
    //         name:"mainfest"
    //     },
    //     splitChunks:{
    //         cacheGroups:{
    //             commons:{
    //                 test: /[\\/]node_modules[\\/]/,
    //                 name: "vendor",
    //                 chunks: "all"
    //             }
    //         }
    //     }
    // }
}