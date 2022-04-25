import './public-path'
import React from 'react'
import App from './App'
import ReactDom from 'react-dom'
import './styles/global.less'

const render = (props: any) => {
	const { container } = props
	ReactDom.render(
		<App />,
		container ? container.querySelector('#root') : document.querySelector('#root')
	)
}

if (!window.__POWERED_BY_QIANKUN__) {
	render({})
}

console.log('micrp-app', window.__POWERED_BY_QIANKUN__)

export async function bootstrap(): Promise<void> {
	console.log('react child boostrap')
}

export async function mount(props: any): Promise<void> {
	console.log('react child mount', props)
	render(props)
}

export async function unmount(props: any): Promise<void> {
	const { container } = props
	console.log('react child unmoumt')
	ReactDom.unmountComponentAtNode(
		container ? container.querySelector('#root') : document.querySelector('#root')
	)
}
