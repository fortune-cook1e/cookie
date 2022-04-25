import React from 'react'
import { Button } from 'antd'
import { useNavigate } from 'react-router-dom'

const Page = (): JSX.Element => {
	const navigate = useNavigate()

	return (
		<div>
			<h1>this is child-other-page</h1>
			<Button onClick={() => navigate('/home')}>go chil-homne-page</Button>
		</div>
	)
}

export default Page
