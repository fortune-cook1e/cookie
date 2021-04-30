
export const pluginTypeQuestions = [
  {
    type: 'list',
    name: 'pluginType',
    message: 'What kind of plugin do you wanna create?',
    choices: ['eslint', 'stylelint', 'tsconfig']
  }
]

export const eslintTypeQuestions = [
  {
    type: 'list',
    name: 'pluginTemplate',
    message: 'What kind of eslint template do you wanna create?',
    choices: [
      'eslint-basic',
      'eslint-typescript',
      'eslint-react',
      'eslint-typescript-react',
      'eslint-vue'
    ]
  }
]

export const stylelintTypeQuestions = [
  {
    type: 'list',
    name: 'pluginTemplate',
    message: 'What kind of stylelint template do you wanna create?',
    choices: [
      'stylelint-basic',
    ]
  }
]

export const tsconfigTypeQuestions = [
  {
    type: 'list',
    name: 'pluginTemplate',
    message: 'What kind of tsconfig.json template do you wanna create?',
    choices: [
      'tsconfig-basic',
    ]
  }
]