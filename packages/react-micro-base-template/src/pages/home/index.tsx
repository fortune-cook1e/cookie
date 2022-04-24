import React from 'react'
import { Button } from 'antd'
import { useNavigate } from 'react-router-dom'
import { REACT_MICRO_CHILD_URL } from '@/micro'

const Page = (): JSX.Element => {
	const navigate = useNavigate()

	return (
		<div>
			<h1>this is homne page</h1>
			<Button onClick={() => navigate(`${REACT_MICRO_CHILD_URL}`)}>go micro app page</Button>
		</div>
	)
}

export default Page
