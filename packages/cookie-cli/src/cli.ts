import { DEFAULT_CREATE_PATH } from './constants/common'
import { getPackageInfo } from './utils'
import { createAppQuestions, createPluginQuestions } from './questions'
import { create } from './create/init'
const inquirer = require('inquirer')
const minimist = require('minimist')
const chalk = require('chalk')

export default class CookieCli {
  createPath: string // 创建路径
  appName: string // app名称
  constructor(createPath = '', appName = '') {
    this.appName = appName
    this.createPath = createPath || DEFAULT_CREATE_PATH
  }

  run(): void {
    this.parseArgs()
  }

  parseArgs(): void {
    const argvs = minimist(process.argv.slice(2), {
      alias: {
        version: ['v'],
        help: ['h'],
        create: ['c'], // 创建应用
        plugin: ['p'] // 增加插件
      },
      boolean: ['version', 'help']
    })
    const _ = argvs._
    const command = _[0]
    const appName = _[1]
    this.appName = appName

    if (command) {
      switch (command) {
        case 'create': {
          this.getAppOptions()
          break
        }
        case 'plugin': {
          this.getPluginOptions()
          break
        }
      }
    } else {
      if (argvs.help) {
        console.log('Usage: cookie <command> [options]')
        console.log()
        console.log('Options:')
        console.log('  -v, --version       output the version number')
        console.log('  -h, --help          output usage information')
        console.log('  -c, --create        create react or vue app')
        console.log('  -p, --plugin        create plugin like eslint and so on..')
      } else if (argvs.version) {
        const version = getPackageInfo().version
        console.log(chalk.blue('current cookie-cli version is ' + version))
      } else {
        console.log(chalk.yellow('Please input cookie -h for more commands'))
        process.exit(1)
      }
    }
  }

  async getAppOptions(): Promise<void> {
    const { app = '' } = await inquirer.prompt(createAppQuestions)
    await create({
      createPath: this.createPath,
      createType: 'app',
      createName: this.appName,
      app
    })
  }

  async getPluginOptions(): Promise<void> {
    await console.log()
  }

  // async getAnswers(): Promise<void> {
  //   const { createType = '' } = await inquirer.prompt(createTypeQuestion)
  //   const getAnswerfunc = createType === 'app' ? getAppTypeAnswers : getPluginTypeAnswers
  //   const {
  //     appName = '',
  //     appType = '',
  //     appTemplate = '',
  //     pluginType = '',
  //     pluginTemplate = ''
  //   } = await getAnswerfunc()

  //   create({
  //     createType,
  //     appName,
  //     appType,
  //     appTemplate,
  //     createPath: this.createPath,
  //     pluginType,
  //     pluginTemplate
  //   })
  // }
}
