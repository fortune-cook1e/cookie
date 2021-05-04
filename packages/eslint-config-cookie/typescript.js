const baseConfig = require('./index')

module.exports = {
  ...baseConfig,
  extends: [
    ...baseConfig.extends,
    'eslint-config-alloy/typescript',
    'plugin:@typescript-eslint/recommended',
  ],
  rules: {
    '@typescript-eslint/no-require-imports': 0,
    '@typescript-eslint/no-var-requires': 0,
    '@typescript-eslint/consistent-type-definitions': 0,
    ...baseConfig.rules
  }
}