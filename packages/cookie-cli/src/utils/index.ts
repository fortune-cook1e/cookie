import { AnyOptions } from '../types'
const semver = require('semver')
const chalk = require('chalk')

export const checkCurrentNodeVersion = (wanted:string):void => {
  if (!semver.satisfies(process.version, wanted)) {
    console.log(chalk.red(
      'Your current Node version is ' + process.version + ', but the cli need' + wanted + 'version.'
    ))
    process.exit(1)
  }
}

export const getPackageInfo = ():AnyOptions => {
  return require('../../package.json')
}

export default {
  checkCurrentNodeVersion,
  getPackageInfo
}

