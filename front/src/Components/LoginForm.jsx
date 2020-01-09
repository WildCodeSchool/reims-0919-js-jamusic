import React from 'react'
import './AccountRegister.css'
import { Link } from 'react-router-dom'

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
            <div>
                <h2>Connexion</h2>
                <form
                    onSubmit={this.submitForm}
                    className='accountRegisterForm'
                >
                    <div>
                        <label htmlFor='email'>Adresse Email</label>
                        <input
                            type='email'
                            id='email'
                            name='email'
                            onChange={this.onChange}
                            value={this.state.title}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor='password'>Mot de passe</label>
                        <input
                            type='password'
                            id='password'
                            name='password'
                            onChange={this.onChange}
                            value={this.state.password}
                            required
                        />
                    </div>
                    <Link to={`/profiles`}>
                        <input type='submit' value='Envoyer' />
                    </Link>
                </form>
                <Link to='/register'>
                    Vous n'avez pas de comtpe ? Inscrivez-vous !
                </Link>
            </div>
        )
    }
}

export default LoginForm
