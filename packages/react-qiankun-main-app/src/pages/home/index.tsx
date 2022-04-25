import React from 'react'
import { Button } from 'antd'
import { useNavigate } from 'react-router-dom'
import { SUB_APP } from '@/micro'

const Page = (): JSX.Element => {
	const navigate = useNavigate()

	return (
		<div>
			<h1>this is homne page</h1>
			<Button onClick={() => navigate(`${SUB_APP.activeRule}`)}>go micro app page</Button>
		</div>
	)
}

export default Page
