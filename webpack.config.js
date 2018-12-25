/**
 * Created by xm on 2018/12/20.
 */

const path = require('path')
const webpack = require('webpack')
const fs = require('fs')

// console.log(fs)

module.exports = {
    entry: {
        index: path.resolve(__dirname, './index.js'),
        fsys: path.resolve(__dirname, './src/fsys.js')
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js',
        libraryTarget: "umd"
    },
    // target: 'node',
    // externals: {
    //     fs: 'commonjs fs'
    // },
    resolve: {
        extensions: [".js"]
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: ['babel-loader'],
                exclude: /node_modules/
            },
            {
                test: require.resolve('jquery'),
                use: [{
                        loader: "expose-loader",
                        options: "jQuery"
                    },
                    {
                        loader: "expose-loader",
                        options: "$"
                    }
                ]
            }
        ]
    },
    plugins: [
    ],
    // node: {
    //     fs: true
    // },
    devServer: {
        port: 3000,
        open: true
    }
}