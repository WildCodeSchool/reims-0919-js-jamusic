<<<<<<< HEAD

import React from "react";
import "./App.css";
import axios from "axios";
import Profile from "./Components/Profile";
=======
import React from 'react'
import './App.css'
import axios from 'axios'
import Search from './Components/Search'
import Profile from './Components/Profile'
import CreateProfile from './Components/CreateProfile'
>>>>>>> 4850b2474a1b74182425f4609517b8eb9f8806cf

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            profiles: [],
<<<<<<< HEAD
            tags: []
        }
    }

    componentDidMount() {
        axios
            .all([
                axios.get('http://localhost:3000/profiles'),
=======
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
>>>>>>> 4850b2474a1b74182425f4609517b8eb9f8806cf
                axios.get('http://localhost:3000/tags')
            ])
            .then(
                axios.spread((profilesRes, tagsRes) => {
                    const profiles = profilesRes.data
                    const tags = tagsRes.data
<<<<<<< HEAD
                    this.setState({ profiles, tags })
=======
                    this.setState({
                        profiles,
                        tags,
                        isLoaded: true
                    })
>>>>>>> 4850b2474a1b74182425f4609517b8eb9f8806cf
                })
            )
    }

<<<<<<< HEAD

  render() {
    return (
      <div className='app'>
        <h1 className='title'>JaMusic</h1>
          <Profile />
      </div>
    );
  }
=======
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
                    {this.state.researchIsVisible || (
                        <img
                            src='https://img.icons8.com/metro/26/000000/chevron-left.png'
                            className='menu_icon'
                            alt='chevron'
                            onClick={this.handleresearchIsVisible}
                        />
                    )}
                    <h1 className='title'>jaMusic</h1>

                    {this.state.researchIsVisible && (
                        <Search
                            tags={this.state.tags}
                            handleSelectedTags={this.handleSelectedTags}
                            selectedTags={this.state.selectedTags}
                            researchIsVisible={this.state.researchIsVisible}
                            handleresearchIsVisible={
                                this.handleresearchIsVisible
                            }
                        />
                    )}
                    <CreateProfile />
                    <Profile profile={this.state.profiles} />
                </div>
            )
        }
    }
>>>>>>> 4850b2474a1b74182425f4609517b8eb9f8806cf
}

export default App
