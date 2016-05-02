const path = require('path');
const merge = require('webpack-merge');
const validate = require('webpack-validator');

const parts = require('./lib/parts');
const pkg = require('./package.json');

const TARGET = process.env.npm_lifecycle_event;
const ENABLE_POLLING = process.env.ENABLE_POLLING;
const PATHS = {
  app: path.join(__dirname, 'demos'),
  build: path.join(__dirname, 'build'),
  style: [
    path.join(__dirname, 'node_modules', 'codemirror', 'lib', 'codemirror.css'),
    path.join(__dirname, 'node_modules', 'codemirror', 'theme', 'monokai.css'),
    path.join(__dirname, 'node_modules', 'prismjs-default-theme', 'prism-default.css'),
    path.join(__dirname, 'demos', 'main.css')
  ]
};

process.env.BABEL_ENV = TARGET;

const common = merge(
  {
    entry: {
      style: PATHS.style,
      app: PATHS.app
    },
    output: {
      path: PATHS.build,
      filename: '[name].js'
    },
    resolve: {
      extensions: ['', '.js', '.jsx']
    }
  },
  parts.indexTemplate({
    title: 'React demos',
    appMountId: 'app'
  }),
  parts.loadJSX(PATHS.app),
  parts.lintJSX(PATHS.app)
);

var config;

switch(TARGET) {
  case 'build':
  case 'stats':
    config = merge(
      common,
      {
        devtool: 'source-map',
        output: {
          path: PATHS.build,
          filename: '[name].[chunkhash].js',
          chunkFilename: '[chunkhash].js'
        }
      },
      parts.clean(PATHS.build),
      parts.setFreeVariable(
        'process.env.NODE_ENV',
        'production'
      ),
      parts.extractBundle({
        name: 'vendor',
        entries: Object.keys(pkg.dependencies)
      }),
      parts.minify(),
      parts.extractCSS(PATHS.style)
    );
    break;
  default:
    config = merge(
      common,
      {
        devtool: 'eval-source-map'
      },
      parts.setupCSS(PATHS.style),
      parts.devServer({
        // Customize host/port here if needed
        host: process.env.HOST,
        port: process.env.PORT,
        poll: ENABLE_POLLING
      }),
      parts.enableReactPerformanceTools(),
      parts.npmInstall({
        save: true
      })
    );
}

module.exports = validate(config);
