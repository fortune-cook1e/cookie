import fetchTemplate from './fetchTemplate'

type CreateParams = {
  appName:string;
  appType:string;
  appTemplate:string;
  appPath:string;
  pluginType:string;
  pluginTemplate:string;
}

export function create({
  appName = '',
  appType = '',
  appTemplate = '',
  appPath = '',
  pluginType = '',
  pluginTemplate = ''
}:CreateParams):void {
  console.log('create params', { appName, appType, appPath, appTemplate, pluginType, pluginTemplate })
}