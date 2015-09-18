var path = require('path');
var HtmlwebpackPlugin = require('html-webpack-plugin');
var webpack = require('webpack');
var merge = require('webpack-merge');

var pkg = require('./package.json');

var APP_TITLE = 'React Demos';
var TARGET = process.env.npm_lifecycle_event;
var ROOT_PATH = path.resolve(__dirname);
var DEMO_PATH = path.resolve(ROOT_PATH, 'demos');

process.env.BABEL_ENV = TARGET;

var common = {
  entry: DEMO_PATH,
  output: {
    path: path.resolve(ROOT_PATH, 'build'),
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.css$/,
        loaders: ['style', 'css'],
        include: DEMO_PATH
      },
      {
        test: /\.jsx?$/,
        loaders: ['babel'],
        include: DEMO_PATH
      }
    ]
  },
  plugins: [
    new HtmlwebpackPlugin({
      title: APP_TITLE
    })
  ]
};

if(TARGET === 'start') {
  module.exports = merge(common, {
    devtool: 'eval',
    module: {
      preLoaders: [
        {
          test: /\.jsx?$/,
          loaders: ['eslint'],
          include: DEMO_PATH
        }
      ]
    },
    devServer: {
      historyApiFallback: true,
      hot: true,
      inline: true,
      progress: true
    },
    plugins: [
      new webpack.HotModuleReplacementPlugin()
    ]
  });
}

if(TARGET === 'build') {
  module.exports = merge(common, {
    entry: {
      app: DEMO_PATH,
      vendor: Object.keys(pkg.dependencies)
    },
    output: {
      path: path.resolve(ROOT_PATH, 'build'),
      filename: '[name].[chunkhash].js'
    },
    devtool: 'source-map',
    module: {
      loaders: [
        {
          test: /\.css$/,
          loader: ExtractTextPlugin.extract('style', 'css'),
          include: DEMO_PATH
        }
      ]
    },
    plugins: [
      new ExtractTextPlugin('styles.[chunkhash].css'),
      new Clean(['build']),
      new webpack.optimize.CommonsChunkPlugin(
        'vendor',
        '[name].[chunkhash].js'
      ),
      new webpack.DefinePlugin({
        'process.env': {
          // This affects react lib size
          'NODE_ENV': JSON.stringify('production')
        }
      }),
      new webpack.optimize.UglifyJsPlugin({
        compress: {
          warnings: false
        }
      }),
      new HtmlwebpackPlugin({
        title: APP_TITLE
      })
    ]
  });
}
