import fetchTemplate from './fetchTemplate'

type InitProps = {
  appName:string;
  appType:string;
  appPath:string;
  template:string;
  pluginType:string;
}

export function create({
  appName = '',
  appType = '',
  appPath = '',
  template = '',
  pluginType = ''
}:InitProps):void {
  console.log('create params', { appName, appType, appPath, template, pluginType })
  switch (appType) {
    case 'react': {
      fetchTemplate(appName, appPath)
    }
  }
}