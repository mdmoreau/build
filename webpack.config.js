const path = require('path');

const postcssImport = require('postcss-import');
const postcssMixins = require('postcss-mixins');
const postcssPresetEnv = require('postcss-preset-env');

const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const FixStyleOnlyEntriesPlugin = require('webpack-fix-style-only-entries');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
// const CopyWebpackPlugin = require('copy-webpack-plugin');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');

const config = {
  entry: {
    styles: './src/css/styles.css',
    scripts: './src/js/scripts.js',
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'js/[name].js',
  },
  module: {
    rules: [
      {
        test: /\.hbs$/,
        use: {
          loader: 'handlebars-loader',
          options: {
            helperDirs: path.resolve(__dirname, 'src/hbs/util'),
            partialDirs: [
              path.resolve(__dirname, 'src/hbs/components'),
              path.resolve(__dirname, 'src/hbs/layouts'),
            ],
            precompileOptions: {
              explicitPartialContext: true,
            },
          },
        },
      },
      {
        test: /\.css$/,
        use: [
          { loader: MiniCssExtractPlugin.loader },
          {
            loader: 'css-loader',
            options: {
              url: false,
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
                postcssPresetEnv({
                  features: {
                    'custom-media-queries': true,
                    'nesting-rules': true,
                  },
                }),
              ],
            },
          },
        ],
      },
      {
        test: /\.js$/,
        include: /src\/js/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              ['@babel/preset-env', {
                useBuiltIns: 'usage',
                corejs: 3,
              }],
            ],
          },
        },
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin({
      cleanStaleWebpackAssets: false,
    }),
    new HtmlWebpackPlugin({
      template: 'src/hbs/index.hbs',
      filename: 'index.html',
    }),
    new FixStyleOnlyEntriesPlugin(),
    new MiniCssExtractPlugin({
      filename: 'css/[name].css',
    }),
    // new CopyWebpackPlugin(),
    new BrowserSyncPlugin({
      server: 'dist',
      open: 'ui',
    }, {
      injectCss: true,
    }),
  ],
};

module.exports = (env, argv) => {
  if (argv.mode === 'production' || !argv.mode) {
    config.plugins.push(new OptimizeCssAssetsPlugin());
  }
  return config;
};
