import { installPackages, removePackages } from '../utils'

const path = require('path')
const fs = require('fs-extra')
const ora = require('ora')
const chalk = require('chalk')
const os = require('os')

const stylelintFileName = '.stylelintrc.js'

export const createStylelint = async(
  { pluginTemplate = '', createPath = '' }:
  { pluginTemplate:string, createPath:string}
):Promise<void> => {
  const packageName = 'stylelint-config-cookie'
  const spinner = ora(`正在创建${chalk.blue.bold('stylelint')}配置文件...`).start()

  try {
    await installPackages({
      dependencies: [packageName],
      isDev: true,
      cwd: createPath,
      stdio: 'ignore',
    })
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

    await removePackages({
      dependencies: [packageName],
      cwd: createPath,
      stdio: 'ignore',
    })
    await installPackages({
      dependencies: [],
      isDev: false,
      cwd: createPath,
      stdio: 'ignore'
    })

    const prefix = 'module.exports = '
    let stringConfig = ''
    stringConfig = JSON.stringify(stylelintTempateConfig, null, 2) + os.EOL
    fs.writeFileSync(stylelintPath, prefix + stringConfig)

    spinner.succeed('.stylelintrc.js 文件创建成功')
    process.exit(1)
  } catch (e) {
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
const checkStylelintFiles = (cwd:string):Promise<string> => {
  return new Promise((resolve, reject) => {
    let createStylelintPath = ''
    const stylelintTypeFiles = [
      '.stylelintrc',
      '.stylelintrc.js',
      '.stylelint.config.js',
    ]
      // 存在的文件
      const existFileArray:any = []

    // 遍历查询是否已存在eslint文件
    for (const file of stylelintTypeFiles) {
      const filePath = path.join(cwd, file)
      const exists = fs.pathExistsSync(filePath)
      if (exists) {
        existFileArray.push({
          fileName: file,
          filePath
        })
        break
      }
    }

    if (existFileArray.length > 0) {
      // 这里默认只取第一个存在文件的情况，一般情况下 一个项目eslint配置文件只会有一个
      const file = existFileArray[0]
      console.log(chalk.yellow(`removing ${file.fileName}...`))
      fs.removeSync(file.filePath)
    }

    createStylelintPath = path.join(cwd, stylelintFileName)
    fs.ensureFileSync(createStylelintPath)
    resolve(createStylelintPath)
  })
}