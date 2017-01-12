// environment
const debug = process.env.NODE_ENV !== 'production'

// dependencies
const webpack = require('webpack')
const path = require('path')

// vars
import * as connect from './src/js/secret/connect'


module.exports = {
    context: path.join(__dirname, 'src'),

    devtool: debug ? 'inline-sourcemap' : null,

    devServer: {
        host: connect.host,
        port: connect.port.server,
    },

    entry: ['babel-polyfill', './js/client.js'],

    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel-loader',
                query: {
                    presets: [
                        'react',
                        'es2015',
                        'stage-0'
                    ],
                    plugins: [
                        'react-html-attrs',
                        'transform-decorators-legacy',
                        'transform-class-properties'
                    ]
                }
            }
        ]
    },

    output: {
        path: __dirname + '/src/',
        filename: 'client.min.js'
    },

    plugins: debug ? [] : [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
        }),
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.optimize.UglifyJsPlugin({
            compress: { warnings: false },
            mangle: true,
            sourcemap: false,
            beautify: false,
            dead_code: true
        })
    ]
}