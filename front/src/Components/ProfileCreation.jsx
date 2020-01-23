import React, { useState } from 'react'
import axios from 'axios'
import { Redirect } from 'react-router-dom'

const ProfileCreation = props => {
	const [profileData, setProfileData] = useState({
		picture: '',
		nickname: '',
		biography: '',
		ville: ''
	})
	const [accountCreated, setAccountCreated] = useState(false)

	const submitForm = e => {
		e.preventDefault()
		const data = {
			picture: profileData.picture,
			nickname: profileData.nickname,
			biography: profileData.biography,
			ville: profileData.ville
		}
		axios
			.post('http://localhost:3000/profiles/', data, {
				headers: {
					Authorization: `Bearer ${props.location.state.token}`
				}
			})
			.then(alert('Compte créé'))
			.then(() => setAccountCreated(true))
	}

	const onChange = e => {
		setProfileData({ ...profileData, [e.target.name]: e.target.value })
	}

	return accountCreated ? (
		<Redirect
			to={{
				pathname: '/login/',
				state: { token: props.location.state.token }
			}}
		/>
	) : (
		<form onSubmit={submitForm}>
			<label htmlFor='nickname'>Pseudonyme :</label>
			<input
				placeholder='Pseudonyme'
				type='text'
				name='nickname'
				id='nickname'
				onInput={onChange}
			/>
			<label htmlFor='picture'>Avatar :</label>
			<input
				placeholder="URL d'avatar"
				type='text'
				name='picture'
				id='picture'
				onInput={onChange}
			/>
			<label htmlFor='ville'>Ville :</label>
			<input
				placeholder='Ville'
				type='text'
				name='ville'
				id='ville'
				onInput={onChange}
			/>
			<label htmlFor='biography'>Bio :</label>
			<input
				placeholder='Petite description de vous'
				type='text'
				name='biography'
				id='biography'
				onInput={onChange}
			/>
			<button type='submit'>Créer votre profil</button>
		</form>
	)
}

export default ProfileCreation
