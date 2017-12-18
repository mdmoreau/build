const path = require('path');
const CleanPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
const NotifierPlugin = require('webpack-notifier');
const postcssImport = require('postcss-import');
const postcssCssnext = require('postcss-cssnext');

module.exports = {
  entry: './src/index',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        include: path.resolve(__dirname, 'src/css'),
        exclude: /node_modules/,
        use: ExtractTextPlugin.extract({
          use: [
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
                  postcssCssnext(),
                ],
              },
            },
          ],
        }),
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
    new ExtractTextPlugin({
      filename: 'bundle.css',
      allChunks: true,
    }),
    new BrowserSyncPlugin({
      files: [
        'dist/bundle.css',
        'dist/bundle.js',
      ],
      open: 'ui',
    }, {
      reload: false,
    }),
    new NotifierPlugin(),
  ],
  watch: true,
};
