import React from 'react'

const ProfileCreation = () => {
	return (
		<form method='post' action='http://localhost:3000/profiles'>
			<label htmlFor='nickname'>Pseudonyme :</label>
			<input
				placeholder='Pseudonyme'
				type='text'
				name='nickname'
				id='nickname'
			/>
			<label htmlFor='picture'>Avatar :</label>
			<input
				placeholder="URL d'avatar"
				type='text'
				name='picture'
				id='picture'
			/>
			<label htmlFor='ville'>Ville :</label>
			<input placeholder='Ville' type='text' name='ville' id='ville' />
			<label htmlFor='biography'>Bio :</label>
			<input
				placeholder='Petite description de vous'
				type='text'
				name='biography'
				id='biography'
			/>
			<input type='submit' value='Créer votre profil' />
		</form>
	)
}

export default ProfileCreation
