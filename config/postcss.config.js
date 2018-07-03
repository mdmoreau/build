const atImport = require('postcss-import');
const presetEnv = require('postcss-preset-env');
const inlineSvg = require('postcss-inline-svg');
const clean = require('postcss-clean');

module.exports = {
  plugins: [
    atImport(),
    presetEnv({
      features: {
        'custom-media-queries': true,
        'nesting-rules': true,
      },
    }),
    inlineSvg({
      path: 'img',
    }),
    clean({
      level: {
        1: {
          specialComments: 0,
        },
      },
    }),
  ],
};
