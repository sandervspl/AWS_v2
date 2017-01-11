// environment
const debug = process.env.NODE_ENV !== 'production'

// dependencies
const webpack = require('webpack')
const path = require('path')

// vars
const host = 'localhost'
// const host = '145.24.213.240'    // school
// const host = '192.168.1.115'        // janet
const port = 8080

module.exports = {
    context: path.join(__dirname, 'src'),

    devtool: debug ? 'inline-sourcemap' : null,

    devServer: {
        host: host,
        port: port,
    },

    entry: './js/client.js',

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