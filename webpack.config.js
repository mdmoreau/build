const path = require('path');

const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');

const host = 'site.localhost';
const pages = ['index'];

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
      server._watch('src/html/**/*'); // eslint-disable-line
    },
  },
  module: {
    rules: [
      {
        test: /\.html$/,
        use: [
          {
            loader: 'raw-loader',
            options: {
              esModule: false,
            },
          },
          {
            loader: 'twig-html-loader',
            options: {
              namespaces: {
                layouts: path.resolve(__dirname, 'src/html/layouts'),
                components: path.resolve(__dirname, 'src/html/components'),
              },
              extend(Twig) {
                // eslint-disable-next-line
                Twig._function.extend('inline_svg', (img, cls = '') => `
                  <span class="svg svg--${img} ${cls}">
                    ${Twig.functions.source(`./src/img/${img}.svg`)}
                  </span>
                `);
              },
            },
          },
        ],
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
                  'postcss-import',
                  'postcss-mixins',
                  'postcss-root-var',
                  'postcss-nested',
                  ['postcss-preset-env', {
                    features: {
                      'custom-media-queries': true,
                      'custom-selectors': true,
                      // 'nesting-rules': true,
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
    minimizer: ['...', new CssMinimizerPlugin()],
  },
  plugins: [
    ...(pages.map((file) => new HtmlWebpackPlugin({
      filename: `${file}.html`,
      template: `src/html/${file}.html`,
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
    config.plugins.unshift(new CleanWebpackPlugin());
  }
  if (!(env && env.WEBPACK_SERVE)) {
    config.target = ['web', 'es5'];
  }
  return config;
};
