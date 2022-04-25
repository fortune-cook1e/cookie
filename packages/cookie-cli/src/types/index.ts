export * from './create'

export interface AnyOptions {
  [propname: string]: any
}

export interface AppItem {
  title: string
  appPath: string
  app: string
  appType: 'react' | 'vue'
  source: 'repo' | 'packages' // app来源是repo还是当前lerna项目其他目录
}

export interface PluginItem {
  title: string
  plugin: string
  pluginType: 'eslint' | 'stylelint' | 'tsconfig'
  package: 'eslint-config-cookie' | 'stylelint-config-cookie'
  source: 'npm' | 'packages' // 下载来源是npm或是其他
}

export interface QuestionItem {
  type: 'input' | 'list'
  name: string
  message: string
  choices: string[] | { name: string; value: string }[]
}
