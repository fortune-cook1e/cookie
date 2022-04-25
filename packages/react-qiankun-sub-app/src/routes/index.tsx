import React, { ComponentType, Suspense, lazy } from 'react'

import { RouteObject, useRoutes } from 'react-router-dom'

interface LazyComponentProps {
	importFunc: any
}

function LazyComponent({ importFunc }: LazyComponentProps) {
	const Component = lazy(importFunc)
	return (
		<Suspense fallback='loading...'>
			<Component />
		</Suspense>
	)
}

const routes: RouteObject[] = [
	{
		path: '/',
		element: () => import('@/pages/home')
	},
	{
		path: '/home',
		element: () => import('@/pages/home')
	},
	{
		path: '/other',
		element: () => import('@/pages/other')
	}
]

const setLazyRoutes = (routes: RouteObject[]): RouteObject[] => {
	if (!routes.length) return []
	routes.forEach((r: RouteObject) => {
		r.element = <LazyComponent importFunc={r.element} />
		r?.children && r?.children.length && setLazyRoutes(r.children)
	})
	return routes
}

const lazyRoutes = setLazyRoutes(routes)

const RouteElement = (): any => {
	const element = useRoutes([...lazyRoutes])
	return element
}

export default RouteElement
