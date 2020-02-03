import React, { useEffect } from 'react'
import axios from 'axios'
import { Redirect } from 'react-router-dom'
import cogoToast from 'cogo-toast'

class ProfileCreation extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			picture: '',
			nickname: '',
			biography: '',
			ville: '',
			tag: '',
			accountCreated: false,
			tags: []
		}
	}
	componentDidMount() {
		axios
			.get('http://localhost:3000/tags', {
				headers: {
					Authorization: `Bearer ${this.props.location.state.token}`
				}
			})
			.then(res => this.setState({ tags: res.data }))
	}
	submitProfileData = () => {
		const { picture, nickname, biography, ville, tag } = this.state
		const data = {
			picture,
			nickname,
			biography,
			ville,
			tag
		}
		axios
			.post('http://localhost:3000/profiles/', data, {
				headers: {
					Authorization: `Bearer ${this.props.location.state.token}`
				}
			})
			.then(() => this.setState({ accountCreated: true }))
			.then(cogoToast.success('Profile créé'))
	}

	submitForm = () => {
		this.submitProfileData()
		//tagData()
	}

	onChange = e => {
		this.setState({ [e.target.name]: e.target.value })
	}

	render() {
		return this.state.accountCreated ? (
			<Redirect
				to={{
					pathname: '/login/',
					state: { token: this.props.location.state.token }
				}}
			/>
		) : (
			<div className='height-max-100 flex-column flex-align:center space-size:l space:stack space:inset-squish'>
				<label htmlFor='nickname' className='space:stack'>
					Pseudonyme :
				</label>
				<input
					placeholder='Pseudonyme'
					type='text'
					name='nickname'
					id='nickname'
					onInput={this.onChange}
					className='underlined no-focus space:stack body-font'
				/>
				<label htmlFor='picture' className='space:stack'>
					Avatar :
				</label>
				<input
					placeholder="URL d'avatar"
					type='text'
					name='picture'
					id='picture'
					onInput={this.onChange}
					className='underlined no-focus space:stack body-font'
				/>
				<label htmlFor='ville' className='space:stack'>
					Ville :
				</label>
				<input
					placeholder='Ville'
					type='text'
					name='ville'
					id='ville'
					onInput={this.onChange}
					className='underlined no-focus space:stack body-font'
				/>
				<label htmlFor='biography' className='space:stack'>
					Bio :
				</label>
				<input
					placeholder='Petite description de vous'
					type='text'
					name='biography'
					id='biography'
					onInput={this.onChange}
					className='underlined no-focus space:stack body-font'
				/>
				<label htmlFor='tags' className='space:stack'>
					Tag :{' '}
				</label>
				<select
					name='tag'
					id='tag'
					className='space:stack'
					onInput={this.onChange}
				>
					{React.Children.toArray(
						this.state.tags.map(tag => (
							<option value={tag.id}>{tag.name}</option>
						))
					)}
				</select>
				<button
					type='button'
					className='space:inset-squish btn-animation btn-angles btn-shadow btn-borderless btn-color body-font'
					onClick={this.submitForm}
				>
					Créer votre profil
				</button>
			</div>
		)
	}
}

export default ProfileCreation
