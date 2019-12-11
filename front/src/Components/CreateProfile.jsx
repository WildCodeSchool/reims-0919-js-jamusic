import React from "react"
import "./CreateProfile.css"

const CreateProfile = () => {
    return (
        <form action="" method="post" className="createProfileForm">
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
            <input
                type="file"
                name="profilePicture"
                id="profilePicture"
                accept=".png, .jpg, .jpeg"
                style={{ display: "none" }}
            />
            <label htmlFor="profilePicture">
                Choisir une image...
                <br />
                (Format: jpg, jpeg ou png)
            </label>
            <br />
            <button type="submit" id="submit">
                S'inscrire
            </button>
        </form>
    )
}

export default CreateProfile
