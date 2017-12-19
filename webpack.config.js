const path = require('path');
const CleanPlugin = require('clean-webpack-plugin');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
const NotifierPlugin = require('webpack-notifier');
const postcssImport = require('postcss-import');
const postcssMixins = require('postcss-mixins');
const postcssCssnext = require('postcss-cssnext');

module.exports = {
  entry: {
    main: './src/main',
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
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
              name: '[name].css',
            },
          },
          {
            loader: 'extract-loader',
          },
          {
            loader: 'css-loader',
            options: {
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
                postcssCssnext(),
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
  ],
  watch: true,
};
