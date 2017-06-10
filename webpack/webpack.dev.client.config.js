// dependencies
const webpack = require('webpack');
const path = require('path');
const connect = require('../src/secret/connect');

module.exports = {
  name: 'client',
  target: 'web',

  entry: path.resolve(__dirname, '../src/client/index'),

  output: {
    path: path.resolve(__dirname, '../static'),
    filename: 'client.js',
  },

  resolve: {
    extensions: ['.js', 'json'],
  },

  devtool: 'eval',

  devServer: {
    host: connect.host,
    port: connect.port.web,
    contentBase: path.resolve(__dirname, '../static'),
    publicPath: '',
    inline: true,
  },

  module: {
    loaders: [
      {
        test: /\.js?$/,
        include: [
            path.join(__dirname, '../src/client'),
            path.join(__dirname, '../src/secret')
        ],
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['react', 'es2015', 'stage-0'],
          plugins: [
            'react-html-attrs',
            'transform-decorators-legacy',
            'transform-class-properties',
          ],
        },
      },
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader?importLoaders=1!postcss'
      },
      {
        test: /\.json$/,
        loader: 'json-loader',
      },
      {
        test: /\.(gif|png|jpe?g|ttf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
        loader: 'file-loader',
      },
    ],
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
  ]
};