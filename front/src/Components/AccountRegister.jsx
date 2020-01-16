import React, { useState } from 'react'
import logo from './images/logo.png'

const AccountRegister = () => {
    const [password, setPassword] = useState()
    const [passwordCheck, setPasswordCheck] = useState()

    const handleForm = e => {
        if (password === passwordCheck) {
            alert('les mots de passe correspondent')
        } else {
            e.preventDefault()
            alert('Les mots de passe ne correspondent pas')
        }
    }
    return (
        <div className='height-max-100 flex-column flex-align:center'>
            <img src={logo} alt='logo de JaMusic' className='rescale50' />
            <form
                onSubmit={handleForm}
                action='http://localhost:3000/register'
                method='post'
                className='flex-column'
            >
                <label htmlFor='email' className='space:stack'>
                    Adresse mail :
                </label>
                <input
                    type='email'
                    name='email'
                    id='email'
                    required
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
                    onInput={e => setPassword(e.target.value)}
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
                    onInput={e => setPasswordCheck(e.target.value)}
                />
                <button
                    type='submit'
                    id='submit'
                    className='space:inset-squish btn-animation btn-angles btn-shadow btn-borderless btn-color body-font'
                >
                    S'inscrire
                </button>
            </form>
        </div>
    )
}

export default AccountRegister
