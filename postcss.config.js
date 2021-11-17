module.exports = {
  plugins: [
    'postcss-import',
    'postcss-mixins',
    'postcss-root-var',
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
};
