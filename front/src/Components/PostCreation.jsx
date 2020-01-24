import React from 'react'
import axios from 'axios'

class PostCreation extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			text: '',
			media: ''
		}
	}

	submitMessage = e => {
		e.preventDefault()
		const data = {
			text: this.state.text,
			media: this.state.media
		}
		axios
			.post(
				'http://localhost:3000/profiles/',
				data
				// , {
				// 	headers: {
				// 		Authorization: `Bearer ${props.location.state.token}`
				// 	}
				// }
			)
			.then(alert('Message créé'))
	}

	onChange = e => {
		this.setState({ [e.target.name]: e.target.value })
	}

	render() {
		return (
			<form onSubmit={this.submitMessage}>
				<label htmlFor='text'>Votre message :</label>
				<textarea
					placeholder='Votre message ici ...'
					name='text'
					id='text'
					rows='5'
					cols='33'
					onInput={this.onChange}
				/>
				<label htmlFor='picture'>Avatar :</label>
				<input
					placeholder='URL de votre media'
					type='text'
					name='media'
					id='media'
					onInput={this.onChange}
				/>
				<button type='submit'>Poster</button>
			</form>
		)
	}
}

export default PostCreation
