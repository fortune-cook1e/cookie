// app类型以及项目名称
export const appTypeQuestions = [
  {
    type: 'input',
    name: 'appName',
    message: 'what\'s your app name?',
  },
  {
    type: 'list',
    name: 'appType',
    message: 'What kind of app do you wanna create?',
    choices: ['react', 'vue']
  }
]

// react 模板
export const reactAppTemplateQuestions = [
  {
    type: 'list',
    name: 'appTemplate',
    message: 'What kind of react template do you want?',
    choices: [
      'react-basic-app',
      'react-integration-app'
    ]
  }
]

// vue 模板
export const vueAppTemplateQuestions = [
  {
    type: 'list',
    name: 'appTemplate',
    message: 'What kind of vue template do you want?',
    choices: [
      'vue3-basic-app',
      'vue-integration-app'
    ]
  }
]