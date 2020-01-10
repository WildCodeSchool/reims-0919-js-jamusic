import React from 'react'
import './App.css'
import axios from 'axios'
import Search from './Components/Search'
import Profile from './Components/Profile'
import AccountRegister from './Components/AccountRegister'
import LoginForm from './Components/LoginForm'
import Navbar from './Components/Navbar'
import ModifProfileForm from './Components/ModifProfileForm'
import { Switch, Route, Redirect, ren } from 'react-router-dom'

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            profiles: [],
            tags: [],
            researchIsVisible: false,
            selectedTags: [],
            isLoaded: false,
            email: '',
            password: '',
            token: ''
        }
        this.handleSelectedTags = this.handleSelectedTags.bind(this)
        this.handleresearchIsVisible = this.handleresearchIsVisible.bind(this)
        this.submitForm = this.submitForm.bind(this)
        this.onChangeEmail = this.onChangeEmail.bind(this)
        this.onChangePassword = this.onChangePassword.bind(this)
    }
    componentDidMount() {
        axios
            .all([
                axios.get('http://localhost:3000/profiles/2'),
                axios.get('http://localhost:3000/tags')
            ])
            .then(
                axios.spread((profilesRes, tagsRes) => {
                    const profiles = profilesRes.data
                    const tags = tagsRes.data
                    this.setState({
                        profiles,
                        tags,
                        isLoaded: true
                    })
                })
            )
    }

    submitForm(e) {
        e.preventDefault()
        const url = 'http://localhost:3000/login'

        axios
            .post(url, {
                email: this.state.email,
                password: this.state.password
            })
            .then(data => this.setState({ token: data.data.token }))
            .catch(function(error) {
                console.log(error)
            })
    }

    onChangeEmail(e) {
        this.setState({
            email: e.target.value
        })
    }

    onChangePassword(e) {
        this.setState({
            password: e.target.value
        })
    }

    handleresearchIsVisible() {
        this.setState({ researchIsVisible: !this.state.researchIsVisible })
    }

    handleSelectedTags(instrument) {
        this.setState({
            selectedTags: this.state.selectedTags.includes(instrument)
                ? this.state.selectedTags.filter(tag => tag !== instrument)
                : [...this.state.selectedTags, instrument]
        })
    }
    render() {
        return (
            <div className='App'>
                <Switch>
                    <Route exact path='/'>
                        {this.state.isLoaded ? (
                            <Redirect to='/login' />
                        ) : (
                            <h1>JaMusic</h1>
                        )}
                    </Route>
                    <Route
                        exact
                        path='/register'
                        component={() => <AccountRegister />}
                    />
                    <Route
                        exact
                        path='/login'
                        render={() => (
                            <LoginForm
                                email={this.state.email}
                                password={this.state.password}
                                token={this.state.token}
                                submitForm={this.submitForm}
                                onChangeEmail={this.onChangeEmail}
                                onChangePassword={this.onChangePassword}
                            />
                        )}
                    />
                    <React.Fragment>
                        <Route
                            exact
                            path={`/profiles`}
                            component={() => (
                                <Profile
                                    profile={this.state.profiles}
                                    token={this.state.token}
                                />
                            )}
                        />
                        <Route
                            exact
                            path={`/profiles/modif`}
                            component={() => (
                                <ModifProfileForm tags={this.state.tags} />
                            )}
                        />
                        <Route
                            exact
                            path={'/tags'}
                            component={() => (
                                <Search
                                    tags={this.state.tags}
                                    handleSelectedTags={this.handleSelectedTags}
                                    selectedTags={this.state.selectedTags}
                                    researchIsVisible={
                                        this.state.researchIsVisible
                                    }
                                    handleresearchIsVisible={
                                        this.handleresearchIsVisible
                                    }
                                />
                            )}
                        />
                        <Navbar />
                    </React.Fragment>
                </Switch>
            </div>
        )
    }
}

export default App
