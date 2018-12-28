const compression = require('compression');

module.exports = {
  files: [
    'index.html',
    'dist/**/*',
  ],
  watchEvents: [
    'add',
    'change',
    'unlink',
    'addDir',
    'unlinkDir',
  ],
  server: {
    baseDir: '.',
    middleware: compression(),
  },
  open: 'ui',
};
