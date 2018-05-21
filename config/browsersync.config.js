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
  server: true,
  open: 'ui',
};
