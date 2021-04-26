
export const basicQuestions = [
  {
    type: 'list',
    name: 'appType',
    message: 'Which project would you like to build',
    choices: [
      'react',
      'plugin'
    ]
  }
]

export const reactTypeQuestions = [
  {
    type: 'input',
    name: 'appName',
    message: 'what is your app name'
  },
  {
    type: 'list',
    name: 'template',
    message: 'Which template do you wanna create',
    choices: [
      'react-basic-app',
      'react-integration-app'
    ]
  }
]

export const pluginTypeQuestions = [
  {
    type: 'list',
    name: 'pluginType',
    message: 'Which kind plugin type do you wanna create',
    choices: [
      'eslint-basic',
      'eslint-react',
      'eslint-typescript',
      'eslint-typescript-react',
      'eslint-vue',
      'stylelint'
    ]
  }
]

export const deleteExistFileQuestion = [
  {
    type: 'confirm',
    name: 'toBeDeleted',
    message: 'The file is existed, do you wanna delete it?',
    default: true
  }
]
