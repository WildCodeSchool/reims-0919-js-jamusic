import React from 'react'
import './AccountRegister.css'

const AccountRegister = () => {
    return (
        <form method='post' className='accountRegisterForm'>
            <label htmlFor='email'>Adresse mail :</label>
            <input type='email' name='email' id='email' required />
            <label htmlFor='password'>Mot de passe :</label>
            <input type='password' name='password' id='password' required />
            <label htmlFor='password2'>Confirmation du mot de passe :</label>
            <input type='password' name='password2' id='password2' />
            <button type='submit' id='submit'>
                S'inscrire
            </button>
        </form>
    )
}

export default AccountRegister
