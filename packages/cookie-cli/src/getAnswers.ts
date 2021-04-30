
import {
  appTypeQuestions,
  reactAppTemplateQuestions,
  vueAppTemplateQuestions,
  pluginTypeQuestions,
  eslintTypeQuestions,
  stylelintTypeQuestions,
  tsconfigTypeQuestions
} from './questions/index'
const inquirer = require('inquirer')
const chalk = require('chalk')

const pluginTemplateMap = {
  'eslint': eslintTypeQuestions,
  'stylelint': stylelintTypeQuestions,
  'tsconfig': tsconfigTypeQuestions
}

const appTemplateMap = {
  'react': reactAppTemplateQuestions,
  'vue': vueAppTemplateQuestions
}

type AppTypeAnswersResponse = {
  appName:string;
  appType:string;
  appTemplate:string;
}

type PluginTypeAnswersResponse = {
  pluginType:string;
  pluginTemplate:string;
}

/**
 * @description 获取app类型的答案
 * @param {*}
 * @date 2021-04-28 22:08:03
 * @return {*}
 */
export const getAppTypeAnswers = async():Promise<AppTypeAnswersResponse> => {
  const { appName = '', appType = 'react' } = await inquirer.prompt(appTypeQuestions)
  if (!appName) {
    console.log(chalk.red('Please input valid app name'))
    process.exit(1)
  }

  const appTemplateQuestions = appTemplateMap[appType]
  const { appTemplate = '' } = await inquirer.prompt(appTemplateQuestions)
  return {
    appName,
    appType,
    appTemplate
  }
}

export const getPluginTypeAnswers = async():Promise<PluginTypeAnswersResponse> => {
  const { pluginType = '' } = await inquirer.prompt(pluginTypeQuestions)
  const pluginQuestions = pluginTemplateMap[pluginType]
  const { pluginTemplate = '' } = await inquirer.prompt(pluginQuestions)
  return {
    pluginType,
    pluginTemplate
  }
}

