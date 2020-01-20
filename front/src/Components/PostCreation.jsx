import React from 'react'

const PostCreation = props => {
	return (
		<form action='' method='post'>
			<input type='file' name='media' id='media' />
			<textarea
				name='text'
				id='text'
				placeholder='Tapez votre message...'
				required></textarea>
		</form>
	)
}

export default PostCreation
