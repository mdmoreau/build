const { extendDefaultPlugins } = require('svgo');

module.exports = {
  multipass: true,
  js2svg: {
    indent: 2,
    pretty: true,
  },
  plugins: extendDefaultPlugins([
    {
      name: 'cleanupIDs',
      active: false,
    },
    {
      name: 'removeViewBox',
      active: false,
    },
    {
      name: 'removeDimensions',
    },
  ]),
};
