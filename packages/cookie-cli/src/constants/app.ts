import * as path from 'path'
import { AppItem } from '../types'

// app
export const REACT_BASIC_APP = 'react-basic-app' // react 基础应用
export const REACT_INTEGRATION_APP = 'react-integration-app' // react 集合多种功能应用
export const REACT_QK_CHILD_APP = 'react-qk-child-app' // react qiankun 子应用模板
export const REACT_QK_BASE_APP = 'react-qk-base-app' // react qiankun 基座应用

export const VUE3_BASIC_APP = 'vue3-basic_app'
export const VUE3_INTEGRATION_APP = 'vue3-integration-app'

export const APP_LIST: AppItem[] = [
  {
    title: 'react基础应用',
    appPath: 'github:fortune-cook1e/react-webpack-template#basic',
    app: REACT_BASIC_APP,
    appType: 'react',
    source: 'repo'
  },
  {
    title: 'react集成多功能应用',
    appPath: 'github:fortune-cook1e/react-webpack-template',
    app: REACT_INTEGRATION_APP,
    appType: 'react',
    source: 'repo'
  },
  {
    title: 'react qiankun 子应用模版',
    appPath: path.resolve(__dirname, '../../../react-micro-child-template'),
    app: REACT_QK_CHILD_APP,
    appType: 'react',
    source: 'packages'
  },
  {
    title: 'react qiankun 基座应用模板',
    appPath: path.resolve(__dirname, '../../../react-micro-base-template'),
    app: REACT_QK_BASE_APP,
    appType: 'react',
    source: 'packages'
  },
  {
    title: 'vue3 基础应用',
    appPath: '',
    app: VUE3_BASIC_APP,
    appType: 'vue',
    source: 'packages'
  },
  {
    title: 'vue3集成多功能应用',
    appPath: '',
    app: VUE3_INTEGRATION_APP,
    appType: 'vue',
    source: 'packages'
  }
]
