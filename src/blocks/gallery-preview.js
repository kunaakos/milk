import React from 'react'
import Markdown from 'react-remarkable'
import { Link } from 'react-static'

export default (props) => {
	const {
		name,
		description,
		slug
	} = props.data

	return (
		<div>
			<h3>{name}</h3>
			<Markdown source={description} />
			<Link to={`/gallery/${slug}`}>Go</Link>
		</div>
	)
}
