import React from 'react'
import './App.css'
import axios from 'axios'
import Profile from './Components/Profile'

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            profiles: [],
            tags: []
        }
    }

    componentDidMount() {
        axios
            .all([
                axios.get('http://localhost:3000/profiles'),
                axios.get('http://localhost:3000/tags')
            ])
            .then(
                axios.spread((profilesRes, tagsRes) => {
                    const profiles = profilesRes.data
                    const tags = tagsRes.data
                    this.setState({ profiles, tags })
                })
            )
    }

    render() {
        return (
            <div className='app'>
                <h1 className='title'>JaMusic</h1>
                <Profile />
            </div>
        )
    }
}

export default App
