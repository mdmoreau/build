const atImport = require('postcss-import');
const mixins = require('postcss-mixins');
const presetEnv = require('postcss-preset-env');
const inlineSvg = require('postcss-inline-svg');
const clean = require('postcss-clean');

module.exports = {
  plugins: [
    atImport(),
    mixins(),
    presetEnv({
      stage: 0,
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
