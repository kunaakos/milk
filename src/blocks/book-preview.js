import React from 'react'
import Markdown from 'react-remarkable'
import { Link } from 'react-static'

export default (props) => {
	const {
		title,
		description,
		slug,
		vol
	} = props.data

	return (
	  <div>
		<h3>{title}</h3>
		<Markdown source={description} />
		{
			vol && vol.length
				? (<p>kötetek: {vol.length}</p>)
				: null
		}
		<Link to={`/book/${slug}`}>Go</Link>
	  </div>
	)
}
