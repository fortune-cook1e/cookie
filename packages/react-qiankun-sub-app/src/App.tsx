import React from 'react'
import { Button, ConfigProvider } from 'antd'
import { BrowserRouter as Router } from 'react-router-dom'
import RouteMap from './routes'
import config from '@/utils/config'

const App = (): JSX.Element => {
	// 设置动态主题
	ConfigProvider.config({
		theme: {
			primaryColor: '#25b864'
		}
	})

	return (
		<ConfigProvider>
			<div>
				<h1>this is react child paa</h1>
				<Router basename={window.__POWERED_BY_QIANKUN__ ? config.micro_app_base_url : '/'}>
					<RouteMap />
				</Router>
			</div>
		</ConfigProvider>
	)
}

export default App
