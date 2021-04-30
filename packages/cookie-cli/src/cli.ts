
import { getPackageInfo } from './utils'
import { ResolveQuestions } from './types/cli'
import { create } from './create/init'
import { createTypeQuestion } from './questions'
import { getAppTypeAnswers, getPluginTypeAnswers } from './getAnswers'
const inquirer = require('inquirer')
const minimist = require('minimist')
const chalk = require('chalk')

export default class CookieCli {
  appName:string | undefined;
  appType:string | undefined;
  appPath:string | undefined;
  template:string | undefined;
  pluginType:string | undefined;

  constructor(appName?:string, appType?:string, appPath?:string, template?:string, pluginType?:string) {
    this.appName = appName
    this.appType = appType
    this.appPath = appPath || process.cwd()
    this.template = template
    this.pluginType = pluginType
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
    const appPath = process.cwd()

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
       appName,
       appType,
       appTemplate,
       appPath,
       pluginType,
       pluginTemplate,
     })
  }
}