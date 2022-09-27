module.exports = {
  env: {
    browser: true,
  },
  parserOptions: {
    ecmaVersion: 'latest',
  },
  extends: [
    'airbnb',
    'airbnb/hooks',
  ],
  ignorePatterns: [
    'dist/**/*',
  ],
};
