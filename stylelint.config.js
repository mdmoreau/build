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
    'function-no-unknown': [
      true,
      {
        ignoreFunctions: [
          'svg-load',
        ],
      },
    ],
    'selector-class-pattern': null,
  },
  ignoreFiles: [
    'dist/**/*',
    'node_modules/**/*',
  ],
};
