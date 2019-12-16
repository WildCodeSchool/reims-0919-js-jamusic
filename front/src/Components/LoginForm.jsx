import React from 'react'

class LoginForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            email: '',
            password: ''
        }
        this.onChange = this.onChange.bind(this)
        this.submitForm = this.submitForm.bind(this)
        this.postForm = this.postForm.bind(this)
    }
    onChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    submitForm(e) {
        e.preventDefault()
    }

    postForm() {
        const config = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(this.state)
        }
        const url = 'http://localhost:3000/accounts'

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
                <h2>Connection</h2>
                <form onSubmit={this.submitForm}>
                    <fieldset>
                        <div>
                            <label htmlFor='email'>Adresse Email</label>
                            <input
                                type='email'
                                id='email'
                                name='email'
                                onChange={this.onChange}
                                value={this.state.title}
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
                            />
                        </div>
                        <input
                            type='submit'
                            value='Envoyer'
                            onClick={this.postForm}
                        />
                    </fieldset>
                </form>
            </div>
        )
    }
}

export default LoginForm
