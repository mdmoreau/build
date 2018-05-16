const atImport = require('postcss-import');
const mixins = require('postcss-mixins');
const presetEnv = require('postcss-preset-env');
const inlineSvg = require('postcss-inline-svg');
const csso = require('postcss-csso');

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
    csso(),
  ],
};
