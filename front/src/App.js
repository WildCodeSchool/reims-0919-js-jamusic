import React from 'react'
//import './App.css'
import axios from 'axios'
import Search from './Components/Search'
import Profile from './Components/Profile'
import AccountRegister from './Components/AccountRegister'
import LoginForm from './Components/LoginForm'
import Navbar from './Components/Navbar'
import ModifProfileForm from './Components/ModifProfileForm'
import Header from './Components/Header'
import { Switch, Route, Redirect } from 'react-router-dom'
import './Components/Layout.css'
import './Components/Space.css'
import './Components/List.css'
import './Components/Form.css'
import './Components/Button.css'
import './Components/Color.css'
import './Components/Image.css'

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            profiles: [],
            tags: [],
            researchIsVisible: false,
            selectedTags: [],
            isLoaded: false
        }
        this.handleSelectedTags = this.handleSelectedTags.bind(this)
        this.handleresearchIsVisible = this.handleresearchIsVisible.bind(this)
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
                        component={() => <LoginForm />}
                    />
                    <div className='flex-column height-max-100'>
                        <Header />
                        <main className='flex1 overflow height-max-100'>
                            <Route
                                exact
                                path={`/profiles`}
                                component={() => (
                                    <Profile profile={this.state.profiles} />
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
                                        handleSelectedTags={
                                            this.handleSelectedTags
                                        }
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
                        </main>
                        <Navbar />
                    </div>
                </Switch>
            </div>
        )
    }
}

export default App
