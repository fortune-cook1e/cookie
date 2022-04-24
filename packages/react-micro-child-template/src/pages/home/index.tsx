import React from 'react'
import { Button } from 'antd'
import { useNavigate } from 'react-router-dom'

const Page = (): JSX.Element => {
	const navigate = useNavigate()
	return (
		<div>
			<h1>this is child-home-page</h1>
			<Button onClick={() => navigate('/other')}>go other page</Button>
		</div>
	)
}

export default Page
