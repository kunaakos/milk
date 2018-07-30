export function mapBlock(block) {
	return {
		id: block.sys.id,
		type: block.sys.contentType.sys.id,
		data: block.fields
	}
}

export function mapBlocks(blocks) {
	return blocks
		.map(mapBlock)
}
