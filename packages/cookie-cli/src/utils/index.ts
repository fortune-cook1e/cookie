const semver = require('semver')
const chalk = require('chalk')

export const getCurrentNodeVersion = (wanted:string):void => {
  if (!semver.satisfies(process.version, wanted)) {
    console.log(chalk.red(
      'Your current Node version is ' + process.version + ', but the cli need' + wanted + 'version.'
    ))
    process.exit(1)
  }
}

export const getPackageInfo = ():any => {
  return require('../../package.json')
}

export default {
  getCurrentNodeVersion,
  getPackageInfo
}

