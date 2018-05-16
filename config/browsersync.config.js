module.exports = {
  files: [
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
