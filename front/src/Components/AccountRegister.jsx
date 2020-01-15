import React from 'react'
//import './AccountRegister.css'
import { Link } from 'react-router-dom'

const AccountRegister = () => {
    return (
        <form
            method='post'
            className='height-max-100 flex-both:center flex-column'
        >
            <label htmlFor='email' className='space:stack'>
                Adresse mail :
            </label>
            <input
                type='email'
                name='email'
                id='email'
                required
                className='space:stack underlined no-focus'
            />
            <label htmlFor='password' className='space:stack'>
                Mot de passe :
            </label>
            <input
                type='password'
                name='password'
                id='password'
                required
                className='space:stack underlined no-focus'
            />
            <label htmlFor='password2' className='space:stack'>
                Confirmation du mot de passe :
            </label>
            <input
                type='password'
                name='password2'
                id='password2'
                className='space:stack underlined no-focus'
            />
            <button
                type='submit'
                id='submit'
                className='space:inset-squish btn-animation btn-angles btn-shadow btn-borderless btn-color'
            >
                S'inscrire
            </button>
        </form>
    )
}

export default AccountRegister
