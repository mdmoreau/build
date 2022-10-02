const path = require('path');

const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
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
  module: {
    rules: [
      {
        test: /\.html$/,
        type: 'asset/source',
        use: [
          {
            loader: 'twig-html-loader',
            options: {
              namespaces: {
                layouts: path.resolve(__dirname, 'src/html/layouts'),
                components: path.resolve(__dirname, 'src/html/components'),
              },
              extend(Twig) {
                Twig.exports.extendFunction('inline_svg', (name) => Twig.functions.source(`./src/static/img/${name}.svg`));
              },
            },
          },
        ],
      },
      {
        test: /\.svg$/,
        type: 'asset/source',
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
          },
        ],
      },
      {
        test: /\.(js|jsx)$/,
        include: /src\/js/,
        use: {
          loader: 'babel-loader',
        },
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  devServer: {
    open: true,
    host,
    watchFiles: ['src/html/**/*'],
  },
  plugins: [
    new CopyWebpackPlugin({
      patterns: [
        {
          from: 'src/static',
          noErrorOnMissing: true,
        },
      ],
    }),
    ...(pages.map((name) => new HtmlWebpackPlugin({
      filename: `${name}.html`,
      template: `src/html/${name}.html`,
    }))),
    new MiniCssExtractPlugin({
      filename: 'css/[name].css',
    }),
  ],
  optimization: {
    minimizer: ['...', new CssMinimizerPlugin()],
  },
};

module.exports = (env, argv) => {
  if (argv.mode === 'production') {
    config.plugins.unshift(new CleanWebpackPlugin());
  }
  return config;
};
