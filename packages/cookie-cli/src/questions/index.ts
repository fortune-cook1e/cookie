import { APP_LIST, PLUGIN_LIST } from '../constants'

import { QuestionItem } from 'src/types'

// 创建应用题时
export const createAppQuestions: QuestionItem[] = [
  {
    type: 'list',
    name: 'app',
    message: 'What kind of app do u want',
    choices: APP_LIST.map(a => a.app)
  }
]

// 创建插件提示
export const createPluginQuestions: QuestionItem[] = [
  {
    type: 'list',
    name: 'plugin',
    message: 'What kind of plugin do u want',
    choices: PLUGIN_LIST.map(p => p.plugin)
  }
]

// 删除提示
export const deleteExistFileQuestion = [
  {
    type: 'confirm',
    name: 'toBeDeleted',
    message: 'The file is existed, do you wanna delete it?',
    default: true
  }
]
