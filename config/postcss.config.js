const atImport = require('postcss-import');
const atApply = require('postcss-apply');
const presetEnv = require('postcss-preset-env');
const inlineSvg = require('postcss-inline-svg');
const clean = require('postcss-clean');

module.exports = {
  plugins: [
    atImport(),
    atApply(),
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
