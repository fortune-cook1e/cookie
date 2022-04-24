import { registerMicroApps, start } from 'qiankun'

interface MicroApp {
	name: string
	entry: string
	container: string
	activeRule: string
}

export const REACT_MICRO_CHILD_TEMPLATE = '#react-micro-child-template'
export const REACT_MICRO_CHILD_URL = '/react-micro-child-template'

export const MIRCO_APPS: MicroApp[] = [
	{
		name: 'react-micro-child-template',
		entry: '//localhost:8088',
		container: REACT_MICRO_CHILD_TEMPLATE,
		activeRule: REACT_MICRO_CHILD_URL
	}
]

export const startMicroApps = (): void => {
	registerMicroApps(MIRCO_APPS)
	start()
}
