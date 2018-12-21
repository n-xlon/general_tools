/**
 * Created by xm on 2018/12/20.
 */

const path = require('path')
const webpack = require('webpack')

module.exports = {
    entry: {
        index: path.resolve(__dirname, './index.js')
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js'
    },
    // target: 'node',
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
    // node: {
    //     fs: true
    // },

}