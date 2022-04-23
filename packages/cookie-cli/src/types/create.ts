import { AppItem } from './index'

export interface CreateParams {
  createType: 'app' | 'plugin'
  createPath: string // 创建路径
  createName?: string // 创建应用的名称
  app?: string
  plugin?: string
}

export interface DownloadAppParams {
  createPath: string
  createName: string
  appInfo: AppItem
}
