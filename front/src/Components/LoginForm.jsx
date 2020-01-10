import React from 'react'
import './AccountRegister.css'
import { Link, Redirect } from 'react-router-dom'

function LoginForm(props) {
    return (
        <div>
            <h2>Connexion</h2>
            <form onSubmit={props.submitForm} className='accountRegisterForm'>
                <div>
                    <label htmlFor='email'>Adresse Email</label>
                    <input
                        type='email'
                        id='email'
                        name='email'
                        onChange={props.onChangeEmail}
                        value={props.email}
                        required
                    />
                </div>
                <div>
                    <label htmlFor='password'>Mot de passe</label>
                    <input
                        type='password'
                        id='password'
                        name='password'
                        onChange={props.onChangePassword}
                        value={props.password}
                        required
                    />
                </div>
                <Link to={'/profiles'}>
                    <input type='submit' value='Envoyer' />
                </Link>
            </form>
            <Link to='/register'>
                Vous n'avez pas de comtpe ? Inscrivez-vous !
            </Link>
        </div>
    )
}

export default LoginForm
