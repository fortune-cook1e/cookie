import './public-path'
import React from 'react'
import App from './App'
import ReactDom from 'react-dom'
import './styles/base.less'
import SharedModule from './micro/shared'

const render = (props: any) => {
	// 如果父应用没有传递Shared实例过来 那么就自己生成一份
	const { container, shared = SharedModule.getShared() } = props
	SharedModule.overloadShared(shared)

	ReactDom.render(
		<App />,
		container
			? container.querySelector('#root')
			: document.querySelector('#root')
	)
}

if (!window.__POWERED_BY_QIANKUN__) {
	render({})
}

export async function bootstrap(): Promise<void> {
	await console.log('app boostrap')
}

export async function mount(props: any): Promise<void> {
	await console.log('app mount', props)
	render(props)
}

export async function unmount(props: any): Promise<void> {
	const { container } = props
	await console.log('app unmoumt')
	ReactDom.unmountComponentAtNode(
		container
			? container.querySelector('#root')
			: document.querySelector('#root')
	)
}
