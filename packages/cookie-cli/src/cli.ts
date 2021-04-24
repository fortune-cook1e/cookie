import { basicQuestions, appTypeQuestions } from './questions'
import { HAS_MORE_QUESTIONS_APP_TYPES } from './constants'
import { getPackageInfo } from './utils'
const inquirer = require('inquirer')
const minimist = require('minimist')
const chalk = require('chalk')

export default class CookieCli {
  appName:string
  appType:string
  appPath:string;
  constructor(appName:string, appType:string, appPath:string) {
    this.appName = appName
    this.appType = appType
    this.appPath = appPath || process.cwd()
  }

  run():void {
    this.parseArgs()
  }

  parseArgs():void {
    const argvs = minimist(process.argv.slice(2), {
      alias: {
        version: ['v'],
        help: ['h']
      },
      boolean: ['version', 'help']
    })
    const _ = argvs._
    const command = _[0]
    if (command) {
      switch (command) {
        case 'init': {
          this.getAnswers()
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
        console.log()
        console.log('Commands:')
        console.log('  init [projectName]  Init a project with default templete')
        console.log('  help [cmd]          display help for [cmd]')
      } else if (argvs.version) {
        const version = getPackageInfo().version
        console.log(chalk.blue(
          'current cookie-cli version is ' + version
        ))
      } else {
        console.log(
          chalk.yellow(
            'Please input cookie -h for more commands'
          )
        )
        process.exit(1)
      }
    }
  }

  async getAnswers():Promise<void> {
    const { appType = 'react-basic-app' } = await inquirer.prompt(basicQuestions)
    this.appType = appType
    // 选择2个app类型才会让其输入项目名
    if (HAS_MORE_QUESTIONS_APP_TYPES.includes(appType)) {
      const appName = await inquirer.prompt(appTypeQuestions)
      this.appName = appName
    }
  }
}