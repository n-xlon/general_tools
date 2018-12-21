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
    module: {
        rules: [
            {
                test: /\.js$/,
                use: ['babel-loader'],
                exclude: /node_modules/
            }
        ]
    }
}