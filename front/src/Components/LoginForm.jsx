import React from 'react'
import { Link } from 'react-router-dom'
import logo from './images/logo.png'

class LoginForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            email: '',
            password: ''
        }
        this.onChange = this.onChange.bind(this)
        this.submitForm = this.submitForm.bind(this)
    }
    onChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    submitForm(e) {
        e.preventDefault()
        const config = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(this.state)
        }
        const url = 'http://localhost:3000/login'

        fetch(url, config)
            .then(res => res.json())
            .then(res => {
                if (res.error) {
                    alert(res.error)
                } else {
                    alert(`Connecté`)
                }
            })
            .catch(e => {
                console.error(e)
                alert(
                    `Impossible de se connecter. Adresse email ou mot de passe incorrect.`
                )
            })
    }

    render() {
        return (
            <div className='height-max-100 flex-column flex-align:center'>
                <img src={logo} alt='logo de JaMusic' className='rescale50' />
                <form
                    onSubmit={this.submitForm}
                    className='space:stack space:inset-squish flex-column'
                >
                    <div className='flex-column'>
                        <label htmlFor='email' className='space:stack'>
                            Email
                        </label>
                        <input
                            type='email'
                            id='email'
                            name='email'
                            onChange={this.onChange}
                            value={this.state.title}
                            required
                            className='underlined no-focus space:stack body-font'
                        />
                    </div>
                    <div className='flex-column'>
                        <label htmlFor='password' className='space:stack'>
                            Mot de passe
                        </label>
                        <input
                            type='password'
                            id='password'
                            name='password'
                            onChange={this.onChange}
                            value={this.state.password}
                            required
                            className='underlined no-focus space:stack body-font'
                        />
                    </div>
                    <input
                        type='submit'
                        value='Se connecter'
                        className='space:inset-squish btn-animation btn-angles btn-shadow btn-borderless btn-color body-font'
                    />
                </form>
                <Link to='/register'>
                    Vous n'avez pas de comtpe ? Inscrivez-vous !
                </Link>
            </div>
        )
    }
}

export default LoginForm
