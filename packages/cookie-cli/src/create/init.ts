
import fetchAppTemplate from './fetchTemplate'
import { REACT_TEMPLATE_MAP, VUE3_TEMPLATE_MAP, APP_TEMPLATES } from '../constants/index'
import { installPackages } from '../utils'

const chalk  = require('chalk')
const path = require('path')
const fs = require('fs-extra')

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

/**
 * @description 创建eslint
 * @date 2021-05-03 16:40:29
 */
const createEslint = async({ pluginTemplate = '', createPath = '' }) => {
  const eslintPackageName = 'eslint-config-cookie'
  await installPackages({
    dependencies: [eslintPackageName],
    isDev: true,
    cwd: createPath
  })

  const template = pluginTemplate.split('eslint-')[1]
  // 这里一定要加入paths 否则require.resolve 是在当前js执行的目录查找
  const packagePath = path.dirname(
    require.resolve(eslintPackageName, { paths: [createPath] })
  )

  const appPackage = require(path.join(createPath, 'package.json'))
  const templateJsonPath = path.join(packagePath, 'template.json')

  const eslintFileName = (template === 'basic' ? 'index' : template) + '.js'
  const eslintTemplateConfig = require(path.join(packagePath, eslintFileName))
  const devDependencies = require(templateJsonPath).devDependencies
  // 合并依赖
  appPackage.devDependencies = {
    ...appPackage.devDependencies,
    ...devDependencies[template]
  }
  // const eslintTypeFiles = [
  //   '.eslintrc.js',
  //   '.eslintrc'
  // ]
  const createEslintPath = createPath + '/.eslintrc.js'
  // fs.ensureFileSync(createEslintPath)
  fs.writeFileSync('./data.json', JSON.stringify(eslintTemplateConfig, null, 2), 'utf-8')
  // TODO: 如何创建一个js并且写入对象
}

const PLUGIN_CREATE_MAP = {
  'eslint': createEslint
}

