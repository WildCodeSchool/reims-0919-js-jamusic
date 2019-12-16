import React from 'react'
import './CreateProfile.css'

const CreateProfile = () => {
    return (
        <form method='post' className='createProfileForm'>
<<<<<<< HEAD
            <label htmlFor='nickname'>Pseudonyme :</label>
            <br />
            <input type='text' name='nickname' id='nickname' required />
            <br />
            <label htmlFor='firstname'>Prénom :</label>
            <br />
            <input type='text' name='firstname' id='firstname' required />
            <br />
            <label htmlFor='lastname'>Nom :</label>
            <br />
            <input type='text' name='lastname' id='lastname' required />
            <br />
            <button
                type='submit'
                id='submit'
                formAction='http://localhost:3000/profiles'
            >
=======
            <label htmlFor='email'>Adresse mail :</label>
            <input type='email' name='email' id='email' required />
            <label htmlFor='password'>Mot de passe :</label>
            <input type='password' name='password' id='password' required />
            <label htmlFor='password2'>Confirmation du mot de passe :</label>
            <input type='password' name='password2' id='password2' />
            <button type='submit' id='submit'>
>>>>>>> 4850b2474a1b74182425f4609517b8eb9f8806cf
                S'inscrire
            </button>
        </form>
    )
}

export default CreateProfile
