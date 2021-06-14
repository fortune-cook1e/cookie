import { AnyOptions } from '../types'
const semver = require('semver')
const chalk = require('chalk')
const spawn = require('cross-spawn')
const path = require('path')
const fs = require('fs-extra')
const execSync = require('child_process').execSync

export const checkCurrentNodeVersion = (wanted: string): void => {
  if (!semver.satisfies(process.version, wanted)) {
    console.log(
      chalk.red(
        'Your current Node version is ' +
          process.version +
          ', but the cli need' +
          wanted +
          'version.'
      )
    )
    process.exit(1)
  }
}

export const getPackageInfo = (): AnyOptions => {
  return require('../../package.json')
}

/**
 * @description 安装依赖包
 * @param {dependencies} 依赖
 * @param {isDev} 是否为开发依赖
 * @param {cwd} 安装路径
 * @date 2021-05-03 21:17:48
 */
export const installPackages = async ({
  dependencies = [],
  isDev = true,
  cwd = '',
  stdio = 'inherit'
}: {
  dependencies: string[]
  isDev: boolean
  cwd: string
  stdio?: 'inherit' | 'ignore'
}): Promise<void> => {
  if (dependencies.length === 0) return
  const [useYarn, useNpm] = await Promise.all([canUseYarn(), canUseNpm()])
  if (!useYarn && !useNpm) {
    console.log(chalk.red('Please install npm or yarn'))
    process.exit(1)
  }

  // 检测是否存在package.json 文件
  const packagePath = path.join(cwd, 'package.json')
  if (!fs.existsSync(packagePath)) {
    console.log(chalk.yellow('creating package.json file..'))
    await packageInit(cwd)
  }

  try {
    let command
    let args
    if (useYarn) {
      command = 'yarnpkg'
      // 这里区分两种情况，1. 无依赖 只需要执行 yarn install 2.有依赖区分是开发还是生产
      args = 'install'
      dependencies.length > 0 && (args = ['add', '--exact'])
      isDev && args.push('--dev')
    } else {
      command = 'npm'
      args = ['install']
      isDev && args.push('--save-dev')
    }

    dependencies.length > 0 && [].push.apply(args, dependencies)
    const child = spawn.sync(command, args, { stdio, cwd })
    if (child.status !== 0) {
      console.log(chalk.red(`\`${command} ${args.join(' ')}\` failed`))
    }
  } catch (e) {
    console.log(chalk.yellow(e.message || '安装依赖失败'))
    process.exit(1)
  }
}

/**
 * @description 删除包
 * @date 2021-05-04 11:07:36
 */
export const removePackages = async ({
  dependencies = [],
  cwd = '',
  stdio = 'inherit'
}: {
  dependencies: string[]
  cwd: string
  stdio?: 'inherit' | 'ignore'
}): Promise<void> => {
  if (dependencies.length === 0) return
  const [useYarn, useNpm] = await Promise.all([canUseYarn(), canUseNpm()])
  if (!useYarn && !useNpm) {
    console.log(chalk.red('Please install npm or yarn'))
    process.exit(1)
  }

  try {
    let command
    let args
    if (useYarn) {
      command = 'yarnpkg'
      args = ['remove']
    } else {
      command = 'npm'
      args = ['uninstall']
    }
    ;[].push.apply(args, dependencies)
    const child = spawn.sync(command, args, { stdio, cwd })
    if (child.status !== 0) {
      console.error(`\`${command} ${args.join(' ')}\` failed`)
    }
  } catch (e) {
    console.log()
  }
}

export const canUseYarn = (): Promise<boolean> => {
  return new Promise((resolve, reject) => {
    try {
      execSync('yarnpkg --version', { stdio: 'ignore' })
      resolve(true)
    } catch (e) {
      reject(false)
    }
  })
}

export const canUseNpm = (): Promise<boolean> => {
  return new Promise((resolve, reject) => {
    try {
      execSync('npm --version', { stdio: 'ignore' })
      resolve(true)
    } catch (e) {
      reject(false)
    }
  })
}

/**
 * @description 检查是否能用yarn or npm
 * @param {*} async
 * @date 2021-05-04 11:18:52
 * @see
 * @return {*}
 */
export const checkNpmAndyarn = async (): Promise<{ useYarn: boolean; useNpm: boolean }> => {
  const [useYarn, useNpm] = await Promise.all([canUseYarn(), canUseNpm()])
  return {
    useYarn,
    useNpm
  }
}

/**
 * @description 包初始化 执行命令为 npm init -y or yarn init -y
 * @param {cwd} 执行路径
 * @date 2021-05-04 22:10:27
 */
export const packageInit = async (cwd = ''): Promise<boolean> => {
  try {
    const { useYarn = false, useNpm = false } = await checkNpmAndyarn()
    let command
    const args = ['init', '--yes']
    if (!useYarn && !useNpm) {
      console.log(chalk.red('Please install yarn or npm!'))
      process.exit(1)
    } else if (useYarn) {
      command = 'yarnpkg'
    } else {
      command = 'npm'
    }
    const child = spawn.sync(command, args, { stdio: 'ignore', cwd })
    if (child.status !== 0) {
      console.error(`\`${command} ${args.join(' ')}\` failed`)
      return true
    }
    return false
  } catch (e) {
    return false
  }
}

/**
 * @description 检查文件是否存在
 * @param {string} files
 * @param {string} cwd
 * @date 2021-06-14 16:47:04
 */
export const checkFileIfExists = (files: string[], cwd: string): boolean => {
  if (!files.length) return false
  return files.some((file: string) => {
    const filePath = path.resolve(cwd, file)
    return fs.pathExistsSync(filePath)
  })
}
