import * as path from 'path'
import { AppItem } from '../types'

// app
export const REACT_BASIC_APP = 'react-basic-app' // react 基础应用
export const REACT_INTEGRATION_APP = 'react-integration-app' // react 集合多种功能应用
export const REACT_QK_SUB_APP = 'react-qk-sub-app' // react qiankun 子应用模板 (react-router-dom 采用v6)
export const REACT_QK_MAIN_APP = 'react-qk-main-app' // react qiankun 基座应用
export const REACT_QK_SUB_APP_V2 = 'react-qiankun-sub-app-v2' // react qiankun 子应用模板 v2 (react-router-dom 采用v5)

export const VUE3_BASIC_APP = 'vue3-basic_app'
export const VUE3_INTEGRATION_APP = 'vue3-integration-app'

export const APP_LIST: AppItem[] = [
  {
    title: 'react + ts + template 模板应用',
    appPath: 'github:fortune-cook1e/react-webpack-template',
    app: REACT_INTEGRATION_APP,
    appType: 'react',
    source: 'repo'
  },
  {
    title: 'react qiankun 基座应用模板',
    appPath: path.resolve(__dirname, '../../../react-qiankun-main-app'),
    app: REACT_QK_MAIN_APP,
    appType: 'react',
    source: 'packages'
  },
  {
    title: 'react qiankun 子应用模版',
    appPath: path.resolve(__dirname, '../../../react-qiankun-sub-app'),
    app: REACT_QK_SUB_APP,
    appType: 'react',
    source: 'packages'
  },
  {
    title: 'react qiankun 子应用V2模版',
    appPath: path.resolve(__dirname, '../../../react-qiankun-sub-app-v2'),
    app: REACT_QK_SUB_APP_V2,
    appType: 'react',
    source: 'packages'
  }
  // {
  //   title: 'vue3 基础应用',
  //   appPath: '',
  //   app: VUE3_BASIC_APP,
  //   appType: 'vue',
  //   source: 'packages'
  // },
  // {
  //   title: 'vue3集成多功能应用',
  //   appPath: '',
  //   app: VUE3_INTEGRATION_APP,
  //   appType: 'vue',
  //   source: 'packages'
  // }
]
