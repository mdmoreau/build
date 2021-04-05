module.exports = {
  extends: 'stylelint-config-standard',
  rules: {
    'at-rule-no-unknown': [
      true,
      {
        ignoreAtRules: [
          'define-mixin',
          'mixin',
        ],
      },
    ],
  },
  ignoreFiles: [
    'dist/**/*',
    'node_modules/**/*',
  ],
};
