const path = require('path');

module.exports = {
  entry: {
    main: './src/js/main.js',
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, '../dist/js'),
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        include: /src\/js/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              ['@babel/preset-env', { useBuiltIns: 'usage' }],
            ],
          },
        },
      },
    ],
  },
};
