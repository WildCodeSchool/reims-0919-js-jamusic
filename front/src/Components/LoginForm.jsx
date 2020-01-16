import React from 'react'
import { Link } from 'react-router-dom'
import logo from './images/logo.png'

function LoginForm(props) {
    return (
        <div className='height-max-100 flex-column flex-align:center'>
            <img src={logo} alt='logo de JaMusic' className='rescale50' />

            <h2>Connexion</h2>
            <form
                onSubmit={props.submitForm}
                className='space:stack space:inset-squish flex-column'
            >
                <div className='flex-column'>
                    <label htmlFor='email' className='space:stack'>
                        Adresse Email
                    </label>
                    <input
                        type='email'
                        id='email'
                        name='email'
                        onChange={props.onChangeEmail}
                        value={props.email}
                        required
                    />
                </div>
                <div className='flex-column'>
                    <label htmlFor='password'>Mot de passe</label>
                    <input
                        type='password'
                        id='password'
                        name='password'
                        onChange={props.onChangePassword}
                        value={props.password}
                        required
                        className='underlined no-focus space:stack body-font'
                    />
                </div>
                <button
                    type='submit'
                    className='space:inset-squish btn-animation btn-angles btn-shadow btn-borderless btn-color body-font'
                >
                    Envoyer
                </button>
            </form>
            <Link to='/register'>
                Vous n'avez pas de compte ? Inscrivez-vous !
            </Link>
        </div>
    )
}

export default LoginForm
