module.exports = {
  extends: 'stylelint-config-standard',
  rules: {
    'selector-class-pattern': null,
  },
  ignoreFiles: [
    'dist/**/*',
    'node_modules/**/*',
  ],
};
