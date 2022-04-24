import React from 'react'
import { Button, ConfigProvider } from 'antd'
import { BrowserRouter as Router } from 'react-router-dom'
import RouteMap from './routes'

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
				<h1>this is App</h1>
				<Button>click me</Button>
				<Router>
					<RouteMap />
				</Router>
			</div>
		</ConfigProvider>
	)
}

export default App
