import React from 'react'
import { withRouteData, Head } from 'react-static'

import BookPreview from '../blocks/book-preview'
import GalleryPreview from '../blocks/gallery-preview'
import TextBlock from '../blocks/text'

import { mapBlocks } from '../utils/contentful';

export default withRouteData((props) => {
	const {
		name,
		slug,
		content: blocks
	} = props.data

	const content = mapBlocks(blocks)
		.map((block) => {
			switch (block.type) {
				case 'book':
					return (<BookPreview key={block.id} data={block.data} />)
				case 'gallery':
					return (<GalleryPreview key={block.id} data={block.data} />)
				case 'textBlock':
					return (<TextBlock key={block.id} data={block.data} />)
				default:
					return null
			}
		})

	return (
		<div>
			<Head>
				<title>{name}</title>
			</Head>
			<h1>{name}</h1>
			{content}
		</div>
	)
})