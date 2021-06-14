const baseConfig = require('./index')

module.exports = {
  ...baseConfig,
  extends: [...baseConfig.extends, 'plugin:react/recommended'],
  plugins: ['react', 'react-hooks', ...baseConfig.plugins],
  settings: {
    ...baseConfig.settings,
    react: {
      pragma: 'React',
      version: 'detect'
    }
  },
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module'
  },
  rules: {
    'react/self-closing-comp': 2, // 自闭合
    // 'react/jsx-indent': [2, 2],
    'react/jsx-indent-props': [2, 2],
    'react/jsx-max-props-per-line': [2, { maximum: 3 }],
    'react/jsx-boolean-value': [2, 'never'],
    'react/jsx-closing-bracket-location': 2,
    'react/jsx-closing-tag-location': 2,
    'react/jsx-curly-newline': 2,
    'react/jsx-equals-spacing': [2, 'never'],
    'react/jsx-no-duplicate-props': 2,
    'react/jsx-one-expression-per-line': 0,
    'react/jsx-pascal-case': 1,
    'react/jsx-props-no-multi-spaces': 2,
    'react/prop-types': 0,
    'react/display-name': 0,
    'react-hooks/rules-of-hooks': 2, // 检查 Hook 的规则
    'react-hooks/exhaustive-deps': 1, // 检查 effect 的依赖

    ...baseConfig.rules
  }
}
