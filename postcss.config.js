module.exports = {
  plugins: [
    'postcss-import',
    'postcss-mixins',
    'postcss-root-var',
    ['postcss-preset-env', {
      features: {
        'custom-selectors': true,
        'nesting-rules': true,
      },
    }],
    ['postcss-inline-svg', {
      paths: ['src/img'],
    }],
  ],
};
