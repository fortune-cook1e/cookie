import { checkFileIfExists } from '../utils'
import * as path from 'path'
import * as fs from 'fs-extra'

const PRETTIER_CONFIG = {
  printWidth: 80,
  tabWidth: 2,
  semi: false,
  singleQuote: true,
  bracketSpacing: true,
  jsxBracketSameLine: false,
  jsxSingleQuote: true,
  arrowParens: 'avoid',
  trailingComma: 'none'
}

const PRETTIER_FILES = [
  '.prettierrc',
  '.prettierrc.json',
  '.prettierrc.json5',
  '.prettierrc.js',
  'prettier.config.js'
]

/**
 * @description 创建prettier
 * @param {*} cwd
 * @date 2021-06-14 16:57:21
 */
export const createPrettier = (cwd: string): Promise<void> => {
  return new Promise(resolve => {
    const prettierExists = checkFileIfExists(PRETTIER_FILES, cwd)
    if (prettierExists) resolve()
    const createPrettierPath = path.resolve(cwd, '.prettierrc')
    fs.writeFileSync(
      createPrettierPath,
      JSON.stringify(PRETTIER_CONFIG, null, 2),
      'utf-8'
    )
    resolve()
  })
}
