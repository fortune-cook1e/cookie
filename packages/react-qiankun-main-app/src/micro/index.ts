import { registerMicroApps, start } from 'qiankun'

interface MicroApp {
	name: string
	entry: string
	container: string
	activeRule: string
}

export const SUB_APP: MicroApp = {
	name: 'react-qiankun-sub-app',
	entry: '//localhost:8088',
	container: '#react-qiankun-sub-app',
	activeRule: '/react-qiankun-sub-app'
}

export const MIRCO_APPS: MicroApp[] = [SUB_APP]

export const startMicroApps = (): void => {
	registerMicroApps(MIRCO_APPS)
	start()
}
