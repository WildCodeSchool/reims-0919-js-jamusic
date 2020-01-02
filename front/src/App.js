import React from 'react'
import './App.css'
import axios from 'axios'
import Search from './Components/Search'
import Profile from './Components/Profile'
import CreateProfile from './Components/CreateProfile'
import LoginForm from './Components/LoginForm'

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
              handleresearchIsVisible={this.handleresearchIsVisible}
            />
          )}
          <CreateProfile />
          <LoginForm />
          <Profile profile={this.state.profiles} />
        </div>
      )
    }
  }
}

export default App
