import React from 'react'
import './CreateProfile.css'

const CreateProfile = () => {
    return (
        <form method='post' className='createProfileForm'>
            <label htmlFor='email'>Adresse mail :</label>
            <input type='email' name='email' id='email' required />
            <label htmlFor='password'>Mot de passe :</label>
            <input type='password' name='password' id='password' required />
            <button formAction='http://localhost:3000/register'>
                S'inscrire
            </button>
        </form>
    )
}

export default CreateProfile
