import React from 'react'
import './CreateProfile.css'

const CreateProfile = () => {
    return (
        <form method='post' className='createProfileForm'>
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
                S'inscrire
            </button>
        </form>
    )
}

export default CreateProfile
