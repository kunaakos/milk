import React, { Component } from 'react'
import { ServerStyleSheet } from 'styled-components'
import { createClient } from 'contentful'

const client = createClient({
	space: "f6r7brhx27m3",
	accessToken: "a241fa726461a9402ec10aa3f3e51ab3cf896e9deff79cdf77c7a51c7d98762f"
});

const pageEntries = client.getEntries({ 'content_type': 'page' })
const bookEntries = client.getEntries({ 'content_type': 'book' })
const galleryEntries = client.getEntries({ 'content_type': 'gallery' })
const navEntries = client.getEntries({ 'content_type': 'navigation' })

async function generateNavItems(navEntries) {
	const { items } = await navEntries

	const navItems = items
		.map(({ fields: navItem, sys }) => ({
			path: `/${navItem.target.fields.slug || ''}`, // home page hack
			label: navItem.label,
			priority: navItem.priority,
			id: sys.id
		}))

	return navItems
}

async function generateRoutes({
	entries,
	component,
	basePath
}) {
	const { items } = await entries

	const routes = items
		.map(({ fields }) => {
			const slug = fields.slug || '' // home page hack
			return {
				path: `${basePath}/${slug}`,
				component,
				getData: () => ({
					data: {
						...fields,
						slug
					}
				})
			}
		})

	return routes
}

export default {

	getSiteData: async () => {
		return {
			title: 'React Static',
			navItems: await generateNavItems(navEntries)
		}
	},

	getRoutes: async () => {
		const pageRoutes = await generateRoutes({
			entries: pageEntries,
			component: 'src/containers/page',
			basePath: '/'
		})
		const bookRoutes = await generateRoutes({
			entries: bookEntries,
			component: 'src/containers/book-page',
			basePath: '/book'
		})
		const galleryRoutes = await generateRoutes({
			entries: galleryEntries,
			component: 'src/containers/gallery-page',
			basePath: '/gallery'
		})

		return [
			...pageRoutes,
			...bookRoutes,
			...galleryRoutes,
			{
				is404: true,
				component: 'src/containers/404',
			}
		]
	},

	renderToHtml: (render, Comp, meta) => {
		const sheet = new ServerStyleSheet()
		const html = render(sheet.collectStyles(<Comp />))
		meta.styleTags = sheet.getStyleElement()
		return html
	},

	Document: class CustomHtml extends Component {
		render() {
			const {
				Html, Head, Body, children, siteData, renderMeta,
			} = this.props
			return (
				<Html>
					<Head>
						<meta charSet="UTF-8" />
						<meta name="viewport" content="width=device-width, initial-scale=1" />
						{renderMeta.styleTags}
					</Head>
					<Body>{children}</Body>
				</Html>
			)
		}
	},
}
