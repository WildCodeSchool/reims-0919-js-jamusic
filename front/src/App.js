import React from "react";
import "./App.css";
import axios from "axios";
import Tags from "./Components/Tags";
import Profiles from "./Components/Profiles";
import Search from "./Components/Search";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      profiles: [],
      tags: [],
      researchIsVisible: false,
      selectedTags: []
    };
    this.handleSelectedTags = this.handleSelectedTags.bind(this);
    this.handleresearchIsVisible = this.handleresearchIsVisible.bind(this);
  }

  componentDidMount() {
    axios
      .all([
        axios.get("http://localhost:3000/profiles"),
        axios.get("http://localhost:3000/tags")
      ])
      .then(
        axios.spread((profilesRes, tagsRes) => {
          const profiles = profilesRes.data;
          const tags = tagsRes.data;
          this.setState({ profiles, tags });
        })
      );
  }

  handleresearchIsVisible() {
    this.setState({ researchIsVisible: !this.state.researchIsVisible });
  }

  handleSelectedTags(instrument) {
    this.state.selectedTags.includes(instrument)
      ? this.setState({
          selectedTags: this.state.selectedTags.filter(
            tag => tag !== instrument
          )
        })
      : this.setState({
          selectedTags: [...this.state.selectedTags, instrument]
        });
  }
  render() {
    return (
      <div className="App">
        {this.state.researchIsVisible ? null : (
          <img
            src="https://img.icons8.com/metro/26/000000/chevron-left.png"
            className="menu_icon"
            alt="chevron"
            onClick={this.handleresearchIsVisible}
          />
        )}
        <h1>Welcome to jaMusic</h1>
        <Profiles profiles={this.state.profiles} />
        <Tags tags={this.state.tags} />
        {this.state.researchIsVisible && (
          <Search
            tags={this.state.tags}
            handleSelectedTags={this.handleSelectedTags}
            selectedTags={this.state.selectedTags}
            researchIsVisible={this.state.researchIsVisible}
            handleresearchIsVisible={this.handleresearchIsVisible}
          />
        )}
      </div>
    );
  }
}

export default App;
