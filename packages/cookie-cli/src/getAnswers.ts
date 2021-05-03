
import {
  appTypeQuestions,
  reactAppTemplateQuestions,
  vueAppTemplateQuestions,
  pluginTypeQuestions,
  eslintTemplateQuestions,
  stylelintTemplateQuestions,
  tsconfigTemplateQuestions
} from './questions/index'
const inquirer = require('inquirer')
const chalk = require('chalk')

const pluginTemplateMap = {
  'eslint': eslintTemplateQuestions,
  'stylelint': stylelintTemplateQuestions,
  'tsconfig': tsconfigTemplateQuestions
}

const appTemplateMap = {
  'react': reactAppTemplateQuestions,
  'vue': vueAppTemplateQuestions
}

type AnswerResponse = {
  appName:string;
  appType:string;
  appTemplate:string;
  pluginType:string;
  pluginTemplate:string;
}
/**
 * @description 获取app类型的答案
 * @date 2021-04-28 22:08:03
 * @return {AppTypeAnswersResponse}
 */
export const getAppTypeAnswers = async():Promise<AnswerResponse> => {
  const {
    appName = '',
   appType = 'react',
  } = await inquirer.prompt(appTypeQuestions)
  if (!appName) {
    console.log()
    console.log(chalk.red('Please input valid app name'))
    console.log()
    process.exit(1)
  }

  const appTemplateQuestions = appTemplateMap[appType]
  const { appTemplate = '', } = await inquirer.prompt(appTemplateQuestions)
  return {
    appName,
    appType,
    appTemplate,
    pluginType: '',
    pluginTemplate: ''
  }
}

/**
 * @description 获取plugin类型答案
 * @date 2021-05-03 15:05:53
 * @return {AppTypeAnswersResponse}
 */
export const getPluginTypeAnswers = async():Promise<AnswerResponse> => {
  const { pluginType = '' } = await inquirer.prompt(pluginTypeQuestions)
  const pluginQuestions = pluginTemplateMap[pluginType]
  const { pluginTemplate = '' } = await inquirer.prompt(pluginQuestions)
  return {
    appName: '',
    appType: '',
    appTemplate: '',
    pluginType,
    pluginTemplate
  }
}

