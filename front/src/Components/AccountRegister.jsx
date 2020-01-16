import React from 'react'
import logo from './images/logo.png'

const AccountRegister = () => {
    return (
        <div className='height-max-100 flex-column flex-align:center'>
            <img src={logo} alt='logo de JaMusic' className='rescale50' />
            <form method='post' className='flex-column'>
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
                    className='space:stack underlined no-focus body-font'
                />
                <label htmlFor='password2' className='space:stack'>
                    Confirmation du mot de passe :
                </label>
                <input
                    type='password'
                    name='password2'
                    id='password2'
                    className='space:stack underlined no-focus body-font'
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
