
export const basicQuestions = [
  {
    type: 'list',
    name: 'appType',
    message: 'Which project would you like to build',
    choices: [
      'react-basic-app',
      'react-integration-app',
      'eslint-config-cookie',
      'eslint-config-typescript',
      'eslint-config-react'
    ]
  }
]

export const appTypeQuestions = [
  {
    type: 'input',
    name: 'appName',
    message: 'what is your app name'
  }
]
