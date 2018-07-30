import React from 'react'
import { withRouteData, Head } from 'react-static'
import Markdown from 'react-remarkable';

function renderImage(asset) {
	return (<img
		key={asset.sys.id}
		src={asset.fields.file.url}
		alt={asset.fields.title}
		style={{
			width: '25%'
		}}
	/>)
}

export default withRouteData(({
	data: gallery
}) => {
	return (
		<div>
			<Head>
				<title>{gallery.name}</title>
			</Head>
			<h1>{gallery.name}</h1>
			<Markdown source={gallery.description} />
			<div>{gallery.media.map(renderImage)}</div>
		</div>
	)
})