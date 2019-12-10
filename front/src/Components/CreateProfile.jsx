import React from "react"

const CreateProfile = () => {
    return (
        <form action="">
            <label htmlFor="email">Email :</label>
            <br />
            <input type="email" name="email" id="email" />
            <br />
            <label htmlFor="password">Mot de passe :</label>
            <br />
            <input type="password" name="password" id="password" />
            <br />
            <label htmlFor="nickname">Pseudonyme :</label>
            <br />
            <input type="text" name="nickname" id="nickname" />
            <br />
            <button type="submit">S'inscrire</button>
        </form>
    )
}

export default CreateProfile
