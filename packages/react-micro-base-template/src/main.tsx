import React from 'react'
import App from './App'
import { render } from 'react-dom'
import './styles/global.less'
import { startMicroApps } from '@/micro'

render(<App />, document.getElementById('root'))

startMicroApps()
