import React from 'react'
import './App.css'
import axios from 'axios'
import Profile from './Components/Profile'

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            profiles: [],
            tags: [],
            isLoaded: false
        }
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

    render() {
        if (!this.state.isLoaded) {
            return <h2>Loading ...</h2>
        } else {
            return (
                <div className='app'>
                    <h1 className='title'>JaMusic</h1>
                    <Profile profile={this.state.profiles} />
                </div>
            )
        }
    }
}

export default App
