const baseConfig = require('./index')

module.exports =  {
  ...baseConfig,
  extends: [
    ...baseConfig.extends,
    'eslint-config-alloy/react',
    'plugin:react/recommended',
  ],
  plugins: ['react', 'react-hooks'],
  settings: {
    'react': {
      'createClass': 'createReactClass', // Regex for Component Factory to use,
      'pragma': 'React',  // Pragma to use, default to "React"
      'version': 'detect', // React version. "detect" automatically picks the version you have installed.
    },
    ...baseConfig.settings
  },
  parserOptions: {
    ecmaVersion: '2017',
    ecmaFeatures: {
      experimentalObjectRestSpread: true,
      jsx: true,
    },
    sourceType: 'module',
  },
  rules: {
    'react/self-closing-comp': 1, // 自闭合
    'react/jsx-indent': [2, 2],
    'react/jsx-indent-props': [2, 2],
    'react/jsx-max-props-per-line': [2, { 'maximum': 3 }],
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
    'react-hooks/exhaustive-deps': 1,  // 检查 effect 的依赖
    ...baseConfig.rules
  }
}