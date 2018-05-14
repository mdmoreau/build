const path = require('path');
const CleanPlugin = require('clean-webpack-plugin');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
const NotifierPlugin = require('webpack-notifier');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const postcssImport = require('postcss-import');
const postcssMixins = require('postcss-mixins');
const postcssFocusWithin = require('postcss-focus-within');
const postcssPresetEnv = require('postcss-preset-env');
const postcssInlineSvg = require('postcss-inline-svg');

module.exports = {
  entry: {
    main: './src/main',
  },
  output: {
    filename: '[name].min.js',
    path: path.resolve(__dirname, 'dist/js'),
  },
  module: {
    rules: [
      {
        test: /\.html$/,
        include: path.resolve(__dirname, 'src/html'),
        exclude: /node_modules/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].html',
              outputPath: '../',
            },
          },
          {
            loader: 'extract-loader',
          },
          {
            loader: 'html-loader',
            options: {
              minimize: true,
              conservativeCollapse: false,
              removeAttributeQuotes: false,
            },
          },
          {
            loader: 'nunjucks-html-loader',
            options: {
              searchPaths: [
                path.resolve(__dirname, 'src/html'),
                path.resolve(__dirname, 'img'),
              ],
            },
          },
        ],
      },
      {
        test: /\.css$/,
        include: path.resolve(__dirname, 'src/css'),
        exclude: /node_modules/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].min.css',
              outputPath: '../css/',
            },
          },
          {
            loader: 'extract-loader',
          },
          {
            loader: 'css-loader',
            options: {
              url: false,
              minimize: true,
              importLoaders: 1,
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              ident: 'postcss',
              plugins: () => [
                postcssImport(),
                postcssMixins(),
                postcssFocusWithin(),
                postcssPresetEnv({
                  stage: 0,
                }),
                postcssInlineSvg({
                  path: path.resolve(__dirname, 'img'),
                }),
              ],
            },
          },
        ],
      },
      {
        test: /\.js$/,
        include: path.resolve(__dirname, 'src/js'),
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              ['@babel/preset-env', {
                useBuiltIns: 'usage',
              }],
            ],
          },
        },
      },
    ],
  },
  plugins: [
    new CleanPlugin(['dist']),
    new BrowserSyncPlugin({
      files: [
        'dist/**/*',
      ],
      server: 'dist',
      open: 'ui',
    }, {
      reload: false,
    }),
    new NotifierPlugin(),
    new UglifyJsPlugin({
      cache: true,
      parallel: true,
    }),
  ],
  mode: 'production',
  cache: true,
  optimization: {
    minimize: false,
  },
  watch: true,
};
