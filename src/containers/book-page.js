import React from 'react'
import { withRouteData, Head } from 'react-static'
import Markdown from 'react-remarkable';

import BookPreview from '../blocks/book-preview'

export default withRouteData(({
	data: book
}) => {
	return (
		<div>
			<Head>
				<title>{book.title}</title>
			</Head>
			<h1>{book.title}</h1>
			<Markdown source={book.description} />
			{book.vol && book.vol.length
				? book.vol.map((book) => (<BookPreview key={book.fields.slug} data={book.fields} />))
				: null}
		</div>
	)
})