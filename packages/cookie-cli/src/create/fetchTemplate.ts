import * as fs from 'fs-extra'
import * as path from 'path'
import * as ora from 'ora'
import * as download from 'download-git-repo'
import * as inquirer from 'inquirer'

const chalk = require('chalk')

import { REACT_INTEGRATION_APP_SOURCE } from '../constants'

import { deleteExistFileQuestion } from '../questions/index'

export default async function fetchTemplate(appName:string, appPath:string) {
  const tempPath = path.join(appPath, appName)
  console.log({ tempPath })

  if (fs.existsSync(tempPath))  {
    const answers = await inquirer.prompt(deleteExistFileQuestion)
    if (answers.toBeDeleted) {
      fs.removeSync(tempPath)
    } else {
      process.exit(1)
    }
  }

  fs.mkdirSync(tempPath)
  const spinner = ora('正在拉取仓库模版～').start()
  const name = path.basename(tempPath)
  download(REACT_INTEGRATION_APP_SOURCE, name, (err) => {
    if (err) {
      spinner.color = 'red'
      spinner.fail(chalk.red('拉取远程模板仓库失败！'))
      console.log({ err })
      process.exit(1)
    }
    spinner.color = 'green'
    spinner.succeed(`${chalk.grey('拉取远程模板仓库成功！')}`)
  })
}
