// dependencies
const webpack = require('webpack');
const path = require('path');
const nodeExternals = require('webpack-node-externals');
const connect = require('../src/secret/connect');

module.exports = [
  {
    name: 'client',
    target: 'web',

    entry: path.resolve(__dirname, '../src/client/index'),

    output: {
      path: path.resolve(__dirname, '../static'),
      filename: 'client.js',
    },

    resolve: {
      extensions: ['.js', '.jsx'],
      alias: {
        assets: path.resolve(__dirname, '../static/assets'),
        components: path.resolve(__dirname, '../src/client/components'),
        ducks: path.resolve(__dirname, '../src/client/ducks'),
      },
    },

    devtool: 'source-map',

    module: {
      loaders: [
        {
          test: /\.js?$/,
          include: path.join(__dirname, '../src/client'),
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
          loader: 'style-loader!css-loader?importLoaders=1!postcss',
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
    ],
  },

  /*******************************
   * S E R V E R
   *******************************/
  {
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
      extensions: ['.js', 'json'],
    },

    devtool: 'source-map',

    module: {
      loaders: [
        {
          test: /\.js$/,
          include: path.join(__dirname, '../src/server'),
          loader: 'babel-loader',
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

    node: {
      fs: 'empty',
      net: 'empty',
      tls: 'empty',
    },
  },
];
