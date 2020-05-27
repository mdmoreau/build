const path = require('path');

const postcssImport = require('postcss-import');
const postcssMixins = require('postcss-mixins');
const postcssPresetEnv = require('postcss-preset-env');

const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ImageminPlugin = require('imagemin-webpack-plugin').default;
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

const svgo = {
  multipass: true,
  plugins: [
    {
      cleanupIDs: {
        minify: false,
      },
    },
    { removeViewBox: false },
    { removeDimensions: true },
  ],
};

const config = {
  mode: 'development',
  entry: {
    main: ['./src/css/main.css', './src/js/main.js'],
  },
  output: {
    filename: 'js/[name].js',
  },
  devServer: {
    hot: true,
    open: true,
    before: (app, server) => {
      server._watch('src/hbs/**/*'); // eslint-disable-line
    },
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
        test: /\.svg$/,
        use: [
          {
            loader: 'raw-loader',
            options: {
              esModule: false,
            },
          },
          {
            loader: 'svgo-loader',
            options: svgo,
          },
        ],
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              hmr: true,
            },
          },
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
                    'custom-selectors': true,
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
    ...(['index'].map((file) => new HtmlWebpackPlugin({
      template: `src/hbs/${file}.hbs`,
      filename: `${file}.html`,
    }))),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: 'src/img',
          to: 'img',
          noErrorOnMissing: true,
        },
      ],
    }),
    new ImageminPlugin({
      test: /\.(jpe?g|png|gif|svg)$/,
      svgo,
    }),
    new MiniCssExtractPlugin({
      filename: 'css/[name].css',
    }),
  ],
};

module.exports = (env, argv) => {
  if (argv.mode === 'production') {
    config.plugins.push(new OptimizeCssAssetsPlugin({ cssProcessorPluginOptions: { preset: ['default', { mergeRules: false }] } }));
  }
  return config;
};
