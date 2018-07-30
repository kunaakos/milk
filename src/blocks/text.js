import React from 'react'
import Markdown from 'react-remarkable'

export default ({ data: { content } }) => (
	<div>
		<Markdown source={content} />
	</div>
)