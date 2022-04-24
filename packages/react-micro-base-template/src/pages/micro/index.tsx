import React, { useEffect } from 'react'
import { start } from 'qiankun'
import { Button } from 'antd'
import { REACT_MICRO_CHILD_TEMPLATE } from '@/micro'
import { useNavigate } from 'react-router-dom'
const Page = (): JSX.Element => {
	const navigate = useNavigate()

	// useEffect(() => {
	// 	if (!window.qiankunStarted) {
	// 		window.qiankunStarted = true
	// 		start()
	// 	}
	// }, [])
	return (
		<div>
			this is base-app micro-page
			<Button onClick={() => navigate('/home')}>go home page</Button>
			<div id={REACT_MICRO_CHILD_TEMPLATE.slice(1)} />
		</div>
	)
}

export default Page
