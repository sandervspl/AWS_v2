// dependencies
const webpack = require('webpack');
const path = require('path');
const connect = require('../src/secret/connect');
const nodeExternals = require('webpack-node-externals');

module.exports = {
  name: 'server',
  target: 'node',
  externals: [nodeExternals()],

  entry: path.resolve(__dirname, '../src/server/index'),

  output: {
    path: path.resolve(__dirname, '../static'),
    filename: 'server.js',
    publicPath: path.resolve(__dirname, '../static'),
  },

  resolve: {
    extensions: ['.js', 'json', ''],
  },

  devtool: 'eval',

  devServer: {
    host: connect.host,
    port: connect.port.server,
    inline: true,
  },

  module: {
    loaders: [
      {
        test: /\.js$/,
        include: path.join(__dirname, '../src/server'),
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015', 'stage-0'],
        }
      },
      {
        test: /\.json$/,
        loader: 'json-loader'
      },
    ]
  },

  node: {
    fs: 'empty',
    net: 'empty',
    tls: 'empty'
  },
};