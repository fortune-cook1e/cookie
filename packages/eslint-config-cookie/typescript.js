const baseConfig = require('./index')

module.exports = {
  ...baseConfig,
  extends: [...baseConfig.extends, 'plugin:@typescript-eslint/recommended'],
  rules: {
    '@typescript-eslint/no-require-imports': 0,
    '@typescript-eslint/no-var-requires': 0,
    ...baseConfig.rules
  }
}
