const HtmlWebPackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const path = require("path");
const argv = require('yargs-parser')(process.argv.slice(2));
const _mode = argv.mode || 'development';
const _mergeConfig = require(`./src/config/webpack.${_mode}`);
const merge = require('webpack-merge');
const CopyWebpackPlugin = require('copy-webpack-plugin');

let webpackConfig = {
    entry: {
        "index":'./index.js'
    },
    output: {
        path: path.resolve(__dirname, './dist/'),//输出结果
        filename: 'scripts/[name][hash:8].bundle.js',
        chunkFilename: 'scripts/[name].bundle.js',
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/env']
                    }
                },
                exclude: /node_modules/
            },

            {
                test: /\.(woff|woff2|svg|eot|ttf)\??.*$/,
                loader: 'url-loader', options: { name: 'fonts/[name].[hash:8].[ext]' }//项目设置打包到dist下的fonts文件夹下
            },
            {
                test: /\.html$/,
                use: [{
                    loader:"html-loader",
                    options:{
                        root:path.resolve(__dirname, 'images')
                    }
                }],
            }
        ]
    },
    resolve: {
        extensions: ['.js', '.css', '.html'],
        alias: {
            "@core":path.resolve(__dirname,"./src/core"),
            "@util":path.resolve(__dirname,"./src/util")
        }
    },
    performance: {
        hints: false
    },
    plugins:[
        new webpack.ProvidePlugin({
            $: "jquery"
        }),
        new webpack.ProvidePlugin({
            q: "q"
        }),
        new HtmlWebPackPlugin({
            filename: './index.html',   
            template: './index.html',
            chunks: ['index']
        })
    ],
}

module.exports = merge(webpackConfig, _mergeConfig);