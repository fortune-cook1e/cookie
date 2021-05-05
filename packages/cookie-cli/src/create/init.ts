
import fetchAppTemplate from './fetchTemplate'
import { REACT_TEMPLATE_MAP, VUE3_TEMPLATE_MAP, APP_TEMPLATES } from '../constants/index'
import { createEslint } from './eslint'

const chalk  = require('chalk')

const PLUGIN_CREATE_MAP = {
  'eslint': createEslint
}

type CreateParams = {
  createType:string;
  appName:string;
  appType:string;
  appTemplate:string;
  createPath:string;
  pluginType:string;
  pluginTemplate:string;
}

export async function create({
  createType = '',
  appName = '',
  appType = '',
  appTemplate = '',
  createPath = '',
  pluginType = '',
  pluginTemplate = ''
}:CreateParams):Promise<void> {
  console.log(chalk.blue('create params'))
  console.log({ createType, appName, appType, createPath, appTemplate, pluginType, pluginTemplate })
  try {
    const isApp = createType === 'app'
    if (isApp) {
      await createApp({
        appName,
        appType,
        createPath,
        appTemplate
      })
    } else {
      createPlugin({
        pluginType,
        pluginTemplate,
        createPath
      })
    }
  } catch (e) {
    console.log(e)
  }
}

/**
 * @description 创建app
 * @date 2021-05-03 16:06:01
 */
const createApp = async({ appName = '', appType = '', createPath = '', appTemplate = '' }) => {
  const templateMap = appType === 'react' ? REACT_TEMPLATE_MAP : VUE3_TEMPLATE_MAP
  const isValidTemplate = APP_TEMPLATES.includes(appTemplate)
  if (isValidTemplate) {
    await fetchAppTemplate(appName, createPath, templateMap[appTemplate])
  } else {
    console.log(chalk.red(`The template ${templateMap[appTemplate]} is invalid!`))
    process.exit(1)
  }
}

/**
 * @description 创建插件入口函数
 * @date 2021-05-03
 */
const createPlugin = ({ pluginType = '', pluginTemplate = '', createPath }) => {
  const createFunc = PLUGIN_CREATE_MAP[pluginType]
  createFunc({
    pluginTemplate,
    createPath
  })
}