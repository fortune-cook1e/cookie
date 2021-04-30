export * from './app'
export * from './plugin'

// 创建类型
export const createTypeQuestion = [
  {
    type: 'list',
    name: 'createType',
    message: 'What kind of project do you wanna create?',
    choices: [
      'app',
      'plugin'
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
