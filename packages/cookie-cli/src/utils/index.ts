import { AnyOptions } from '../types'
const semver = require('semver')
const chalk = require('chalk')
const spawn = require('cross-spawn')
const execSync = require('child_process').execSync

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

/**
 * @description 安装依赖包
 * @param {dependencies} 依赖
 * @param {isDev} 是否为开发依赖
 * @date 2021-05-03 21:17:48
 */
export const installPackages = async({ dependencies = [], isDev = true }:{dependencies:string[], isDev:boolean}):Promise<void> => {
  if (dependencies.length === 0) return
  const [useYarn, useNpm] = await Promise.all([canUseYarn(), canUseNpm()])
  if (!useYarn && !useNpm) {
    console.log(chalk.red('Please install npm or yarn'))
    process.exit(1)
  }
  return new Promise((resolve, reject) => {
    let command
    let args
    if (useYarn) {
      command = 'yarnpkg'
      args = ['add', '--exact']
      isDev && args.push('--dev')
    } else {
      command = 'npm'
      args = ['install']
      isDev && args.push('--save-dev')
    }
    [].push.apply(args, dependencies)
    const child = spawn(command, args, { stdio: 'inherit' })
    child.on('close', code => {
      if (code !== 0) {
        reject({
          command: `${command} ${args.join(' ')}`,
        })
        return
      }
      resolve()
    })
  })
}

export const canUseYarn = ():Promise<boolean> => {
  return new Promise((resolve, reject) => {
    try {
      execSync('yarnpkg --version', { stdio: 'ignore' })
      resolve(true)
    } catch (e) {
      reject(false)
    }
  })
}

export const canUseNpm = ():Promise<boolean> => {
  return new Promise((resolve, reject) => {
    try {
      execSync('npm --version', { stdio: 'ignore' })
      resolve(true)
    } catch (e) {
      reject(false)
    }
  })
}

export default {
  checkCurrentNodeVersion,
  getPackageInfo,
  installPackages
}

