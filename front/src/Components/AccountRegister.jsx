import React, { useState } from 'react'
import './AccountRegister.css'
import { Link } from 'react-router-dom'

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
        <form
            onSubmit={handleForm}
            action='http://localhost:3000/register'
            method='post'
            className='accountRegisterForm'
        >
            <label htmlFor='email'>Adresse mail :</label>
            <input type='email' name='email' id='email' required />
            <label htmlFor='password'>Mot de passe :</label>
            <input
                type='password'
                name='password'
                id='password'
                required
                onInput={e => setPassword(e.target.value)}
            />
            <label htmlFor='passwordCheck'>
                Confirmation du mot de passe :
            </label>
            <input
                type='password'
                name='passwordCheck'
                id='passwordCheck'
                onInput={e => setPasswordCheck(e.target.value)}
            />
            <Link to='/login'>
                <button type='submit' id='submit'>
                    S'inscrire
                </button>
            </Link>
        </form>
    )
}

export default AccountRegister
