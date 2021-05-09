import { installPackages, removePackages } from '../utils'
import { deleteExistFileQuestion } from '../questions'

const path = require('path')
const fs = require('fs-extra')
const ora = require('ora')
const chalk = require('chalk')
const inquirer = require('inquirer')
const os = require('os')

export const createEslint = async(
  { pluginTemplate = '', createPath = '' }:
  {pluginTemplate:string, createPath:string}
  ):Promise<void> => {
  const eslintPackageName = 'eslint-config-cookie'
  const spinner = ora(`创建${chalk.blue.bold('eslint')}配置文件中...`).start()
  spinner.discardStdin = false

  try {
    await installPackages({
      dependencies: [eslintPackageName],
      isDev: true,
      cwd: createPath,
      stdio: 'ignore'
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
    // TODO: 需要进行依赖去重
    appPackage.devDependencies = {
      ...appPackage.devDependencies,
      ...devDependencies[template],
      ...devDependencies['basic']
    }
    fs.writeFileSync(
      path.join(createPath, 'package.json'),
      JSON.stringify(appPackage, null, 2) + os.EOL
    )

    const eslintFilePath = await checkConfigFileExist(createPath)

    if (!eslintFilePath) return
    // 将eslint配置写入文件中
    fs.writeFileSync(eslintFilePath, 'module.exports = ' + JSON.stringify(eslintTemplateConfig, null, 2), 'utf-8')

    await removePackages({
      dependencies: [eslintPackageName],
      cwd: createPath,
      stdio: 'ignore'
    })

    await installPackages({
      dependencies: [],
      isDev: false,
      cwd: createPath,
      stdio: 'ignore'
    })
    spinner.succeed(`创建文件${chalk.blue.bold('.eslintrc.js')}文件成功!`)
    process.exit(1)
  } catch (e) {
    spinner.fail(e.message || '创建文件失败')
    process.exit(1)
  }

 //  spinner.succeed('File created successfully')
}

/**
 * @description 检查eslint文件是否存在；并且创建eslint配置文件
 * @param {string} cwd
 * @date 2021-05-05 11:00:30
 * @return {string} 创建的eslint文件路径
 */
const checkConfigFileExist = async(cwd:string):Promise<string> => {
  let eslintFilePath = ''

  const eslintTypeFiles = [
    '.eslintrc.js',
    '.eslintrc.yaml',
    '.eslintrc.yml',
    '.eslintrc.json',
    '.eslintrc'
  ]

  // 存在的文件
  const existFileArray:any = []
  const inquirerPromise:any = []

  // 遍历查询是否已存在eslint文件
  for (const file of eslintTypeFiles) {
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

  // console.log({ existFileArray })
  // 处理存在文件的情况
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
  eslintFilePath = path.join(cwd, '.eslintrc.js')
  fs.ensureFileSync(eslintFilePath)

  return eslintFilePath
}