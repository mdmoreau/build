module.exports = {
  plugins: [
    'postcss-import',
    ['postcss-preset-env', {
      features: {
        'custom-selectors': true,
        'nesting-rules': true,
      },
      enableClientSidePolyfills: false,
    }],
  ],
};
