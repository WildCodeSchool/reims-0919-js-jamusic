import React from "react";
import "./App.css";
import axios from "axios";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      profiles: [],
      tags: []
    };
  }

  componentDidMount() { 
    // axios.get(`http://localhost:3000/profiles`)
    // .then(profilesRes => {
    //   const profiles = profilesRes.data;
    //   this.setState({ profiles });
    // })
    axios.all([
      axios.get('http://localhost:3000/profiles'),
      axios.get('http://localhost:3000/tags')
    ])
    .then(axios.spread((profilesRes, tagsRes) => {
      const profiles = profilesRes.data
      const tags = tagsRes.data
      this.setState({profiles, tags})
    }))
}

  render() {
    return <div className="App"><h1>Welcome to jaMusic</h1></div>;
  }
}

export default App;
