const path = require('path');

const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ImageminPlugin = require('imagemin-webpack-plugin').default;
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');

const host = 'site.localhost';

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
  entry: {
    main: ['./src/css/main.css', './src/js/main.js'],
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'js/[name].js',
  },
  devServer: {
    hot: true,
    open: true,
    host,
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
              postcssOptions: {
                plugins: [
                  'postcss-advanced-variables',
                  ['postcss-preset-env', {
                    features: {
                      'custom-media-queries': true,
                      'custom-selectors': true,
                      'nesting-rules': true,
                    },
                  }],
                  ['postcss-inline-svg', {
                    paths: ['src/img'],
                  }],
                ],
              },
            },
          },
        ],
      },
      {
        test: /\.(js|jsx)$/,
        include: /src\/js/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              ['@babel/preset-env', {
                useBuiltIns: 'usage',
                corejs: 3,
              }],
              ['@babel/preset-react'],
            ],
          },
        },
      },
    ],
  },
  optimization: {
    minimizer: ['...', new CssMinimizerPlugin({ minimizerOptions: { preset: ['default', { mergeRules: false }] } })],
  },
  plugins: [
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
  resolve: {
    extensions: ['.js', '.jsx'],
  },
};

module.exports = (env, argv) => {
  if (argv.mode === 'production') {
    config.plugins.push(new CleanWebpackPlugin());
  }
  if (!(env && env.WEBPACK_SERVE)) {
    config.target = ['web', 'es5'];
  }
  return config;
};
