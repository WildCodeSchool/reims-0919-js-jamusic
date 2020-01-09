import React from 'react'
import './App.css'
import axios from 'axios'
import Search from './Components/Search'
import Profile from './Components/Profile'
import AccountRegister from './Components/AccountRegister'
import LoginForm from './Components/LoginForm'
import Navbar from './Components/Navbar'
import { Switch, Route } from 'react-router-dom'

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
        if (!this.state.isLoaded) {
            return <h2>Loading ...</h2>
        } else {
            return (
                <div className='App'>
                    <Switch>
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
                        <React.Fragment>
                            <Route
                                exact
                                path={`/profiles`}
                                component={() => (
                                    <Profile profile={this.state.profiles} />
                                )}
                            />{' '}
                            <Navbar />
                        </React.Fragment>
                    </Switch>
                </div>
            )
        }
    }
}

export default App
