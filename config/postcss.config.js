const atImport = require('postcss-import');
const mixins = require('postcss-mixins');
const presetEnv = require('postcss-preset-env');
const inlineSvg = require('postcss-inline-svg');
const assets = require('postcss-assets');
const stripUnits = require('postcss-strip-units');
const clean = require('postcss-clean');

module.exports = {
  plugins: [
    atImport(),
    mixins(),
    presetEnv({
      features: {
        'custom-media-queries': true,
        'nesting-rules': true,
      },
    }),
    inlineSvg({
      path: 'img',
    }),
    assets({
      loadPaths: ['img'],
    }),
    stripUnits(),
    clean(),
  ],
};
