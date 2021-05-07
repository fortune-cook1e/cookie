import { deleteExistFileQuestion } from '../questions'
import { installPackages, removePackages } from '../utils'

const path = require('path')
const fs = require('fs-extra')
const ora = require('ora')
const chalk = require('chalk')
const inquirer = require('inquirer')
const os = require('os')

const stylelintFileName = '.stylelintrc.js'

export const createStylelint = async(
  { pluginTemplate = '', createPath = '' }:
  { pluginTemplate:string, createPath:string}
):Promise<void> => {
  const packageName = 'stylelint-config-cookie'
  const spinner = ora('开始安装stylelint-config-cookie包...').start()
  try {
    await installPackages({
      dependencies: [packageName],
      isDev: true,
      cwd: createPath,
      stdio: 'ignore'
    })
    spinner.text = '开始创建stylelint配置文件'
    const template = pluginTemplate.split('stylelint-')[1]

    const packagePath = path.dirname(
      require.resolve(packageName, { paths: [createPath] })
    )

    const appPackage = require(path.join(createPath, 'package.json'))
    const templateJsonPath = path.join(packagePath, 'template.json')

    const stylelintConfigFile = (template === 'basic' ? 'index' : template) + '.js'
    const stylelintTempateConfig = require(path.join(packagePath, stylelintConfigFile))
    const devDependencies = require(templateJsonPath).devDependencies

    const stylelintPath = await checkStylelintFiles(createPath)
    if (!stylelintPath) return
    appPackage.devDependencies = {
      ...appPackage.devDependencies,
      ...devDependencies['basic']
    }

    fs.writeFileSync(
      path.join(createPath, 'package.json'),
      JSON.stringify(appPackage, null, 2) + os.EOL
    )

    spinner.text = '正在卸载 cookie-config-stylelint 包'
    await removePackages({
      dependencies: [packageName],
      cwd: createPath,
      stdio: 'ignore'
    })
    spinner.text = '正在安装所需依赖'
    await installPackages({
      dependencies: [],
      isDev: false,
      cwd: createPath,
      stdio: 'ignore'
    })

    spinner.text = '正在创建.stylelintrc.js文件'
    const prefix = 'module.exports = '
    let stringConfig = ''
    try {
      stringConfig = JSON.stringify(stylelintTempateConfig, null, 2) + os.EOL
    } catch (e) {
      spinner.fail('创建文件失败')
      process.exit(1)
    }

    fs.writeFileSync(stylelintPath, prefix + stringConfig)

    spinner.succeed('.stylelintrc.js 文件创建成功')
  } catch (e) {
    console.log(e)
    spinner.fail(e.message || '创建文件失败')
    process.exit(1)
  }
}

/**
 * @description 检查是否存在stylelint文件
 * @param {cwd} 创建stylelint文件的目录路径
 * @date 2021-05-07 15:06:14
 * @return {string}
 */
const checkStylelintFiles = async(cwd:string):Promise<string> => {
  let createStylelintPath = ''
  const stylelintTypeFiles = [
    '.stylelintrc',
    '.stylelint.config.js',
  ]
    // 存在的文件
    const existFileArray:any = []
    const inquirerPromise:any = []

  // 遍历查询是否已存在eslint文件
  for (const file of stylelintTypeFiles) {
    const filePath = path.join(cwd, file)
    const exists = fs.pathExistsSync(filePath)
    if (exists) {
      existFileArray.push({
        fileName: file,
        filePath
      })
      inquirerPromise.push((inquirer.prompt(deleteExistFileQuestion)))
      break
    }
  }

  if (existFileArray.length > 0) {
    // 这里默认只取第一个存在文件的情况，一般情况下 一个项目eslint配置文件只会有一个
    const [answer] = await Promise.all(inquirerPromise)
    const file = existFileArray[0]
    if ((answer as any).toBeDeleted) {
      fs.removeSync(file.filePath)
    } else {
      console.log(chalk.red('Failed to create file'))
      process.exit(1)
    }
  }

  createStylelintPath = path.join(cwd, stylelintFileName)
  fs.ensureFileSync(createStylelintPath)

  return createStylelintPath
}