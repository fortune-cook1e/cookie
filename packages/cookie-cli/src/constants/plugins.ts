import { PluginItem } from 'src/types'

// eslint template
export const ESLINT_BASIC = 'eslint-basic'
export const ESLINT_TYPESCRIPT = 'eslint-typescript'
export const ESLINT_REACT = 'eslint-react'
export const ESLINT_TS_REACT = 'eslint-typescript-react'
export const ESLINT_VUE = 'eslint-vue'

// stylelint template
export const STYLELINT_BASIC = 'stylelint-basic'

// ts template
export const TSCONFIG_BASIC = 'tsconfig-basic'

export const PLUGIN_LIST: PluginItem[] = [
  {
    title: 'eslint 基础配置',
    plugin: ESLINT_BASIC,
    pluginType: 'eslint',
    package: 'eslint-config-cookie',
    source: 'npm'
  },
  {
    title: 'eslint-typescript 配置',
    plugin: ESLINT_TYPESCRIPT,
    pluginType: 'eslint',
    package: 'eslint-config-cookie',
    source: 'npm'
  },
  {
    title: 'eslint-react 配置',
    plugin: ESLINT_REACT,
    pluginType: 'eslint',
    package: 'eslint-config-cookie',
    source: 'npm'
  },
  {
    title: 'eslint-react-typescript 配置',
    plugin: ESLINT_TS_REACT,
    pluginType: 'eslint',
    package: 'eslint-config-cookie',
    source: 'npm'
  },
  {
    title: 'stylelint 基础配置',
    plugin: STYLELINT_BASIC,
    pluginType: 'stylelint',
    package: 'stylelint-config-cookie',
    source: 'npm'
  },
  {
    title: 'tsconfig 基础配置',
    plugin: TSCONFIG_BASIC,
    pluginType: 'tsconfig',
    package: 'eslint-config-cookie',
    source: 'npm'
  }
]
