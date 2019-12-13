import React from 'react'
import './CreateProfile.css'

const CreateProfile = () => {
    return (
        <form method='post' className='createProfileForm'>
            <label htmlFor='nickname'>Pseudonyme :</label>
            <br />
            <input type='text' name='nickname' id='nickname' required />
            <br />
            <label htmlFor='email'>Adresse mail :</label>
            <br />
            <input type='email' name='email' id='email' required />
            <br />
            <label htmlFor='password'>Mot de passe :</label>
            <br />
            <input type='password' name='password' id='password' required />
            <br />
            <label htmlFor='password2'>Confirmation du mot de passe :</label>
            <br />
            <input type='password' name='password2' id='password2' />
            <br />
            <button type='submit' id='submit'>
                S'inscrire
            </button>
        </form>
    )
}

export default CreateProfile
