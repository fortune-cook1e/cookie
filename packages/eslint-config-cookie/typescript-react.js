const reactConfig = require('./react')
const tsConfig = require('./typescript')

module.exports = {
  ...reactConfig,
  extends: [
    ...new Set([...tsConfig.extends, ...reactConfig.extends])
  ],
  settings: {
    ...reactConfig.settings
  },
  plugins: [
    ...reactConfig.plugins,
  ],
  parserOptions: {
    ...reactConfig.parserOptions
  },
  rules: {
    ...reactConfig.rules,
    ...tsConfig.rules
  }
}