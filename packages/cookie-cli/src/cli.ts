
import { getPackageInfo } from './utils'
import { create } from './create/init'
import { createTypeQuestion } from './questions'
import { getAppTypeAnswers, getPluginTypeAnswers } from './getAnswers'
const inquirer = require('inquirer')
const minimist = require('minimist')
const chalk = require('chalk')

export default class CookieCli {
  createType:string;      // 创建类型
  appName:string;         // app名称
  appType:string;         // app类型
  createPath:string;      // 创建路径
  appTemplate:string;     //  app模板
  pluginType:string;      // 插件类型
  pluginTemplate:string;  // 插件模板

  constructor(createType = '', appName = '', appType = '', createPath = '', appTemplate = '', pluginType = '', pluginTemplate = '') {
    this.createType = createType
    this.appName = appName
    this.appType = appType
    this.createPath = createPath || process.cwd()
    this.appTemplate = appTemplate
    this.pluginType = pluginType
    this.pluginTemplate = pluginTemplate
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
        }
      }
    } else {
      if (argvs.help) {
        console.log('Usage: cookie <command> [options]')
        console.log()
        console.log('Options:')
        console.log('  -v, --version       output the version number')
        console.log('  -h, --help          output usage information')
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
    const { createType = '' } = await inquirer.prompt(createTypeQuestion)
    const getAnswerfunc = createType === 'app' ? getAppTypeAnswers : getPluginTypeAnswers
    const {
      appName = '',
      appType = '',
      appTemplate = '',
      pluginType = '',
      pluginTemplate = ''
     }  = await getAnswerfunc()

     create({
       createType,
       appName,
       appType,
       appTemplate,
       createPath: this.createPath,
       pluginType,
       pluginTemplate,
     })
  }
}