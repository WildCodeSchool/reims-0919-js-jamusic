import React, { useState } from 'react'
import logo from './images/logo.png'
import axios from 'axios'
import { Redirect, Link } from 'react-router-dom'

const AccountRegister = props => {
	const [account, setAccount] = useState({
		email: '',
		password: '',
		passwordCheck: ''
	})
	const [isCreated, setIsCreated] = useState(false)
	const [token, setToken] = useState({ token: '' })
	console.log({ token })

	const onChange = e => {
		setAccount({ ...account, [e.target.name]: e.target.value })
	}
	const submitForm = e => {
		if (account.password === account.passwordCheck) {
			e.preventDefault()
			const data = { email: account.email, password: account.password }
			axios
				.post('http://localhost:3000/register', data)
				.then(response => setToken(response.data.token))
				.then(() => {
					setIsCreated(true)
				})
		} else {
			e.preventDefault()
			alert('Les mots de passe ne correspondent pas')
		}
	}
	return (
		<>
			{isCreated ? (
				<Redirect
					to={{
						pathname: '/createprofile',
						state: { token }
					}}
				/>
			) : (
				<div className='height-max-100 flex-column flex-align:center'>
					<img
						src={logo}
						alt='logo de JaMusic'
						className='rescale50'
					/>
					<form onSubmit={submitForm} className='flex-column'>
						<label htmlFor='email' className='space:stack'>
							Adresse mail :
						</label>
						<input
							type='email'
							name='email'
							id='email'
							required
							onInput={onChange}
							className='space:stack underlined no-focus body-font'
						/>
						<label htmlFor='password' className='space:stack'>
							Mot de passe :
						</label>
						<input
							type='password'
							name='password'
							id='password'
							required
							onInput={onChange}
							className='space:stack underlined no-focus body-font'
						/>
						<label htmlFor='passwordCheck' className='space:stack'>
							Confirmation du mot de passe :
						</label>
						<input
							type='password'
							name='passwordCheck'
							id='passwordCheck'
							className='space:stack underlined no-focus body-font'
							onInput={onChange}
						/>
						<button
							id='submit'
							className='space:inset-squish btn-animation btn-angles btn-shadow btn-borderless btn-color body-font'
						>
							S'inscrire
						</button>
					</form>
				</div>
			)}
		</>
	)
}

export default AccountRegister
