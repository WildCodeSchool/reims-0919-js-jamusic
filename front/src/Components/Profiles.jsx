import React from "react";

const tests = [
  {
    nickname: "DarkSasuke",
    firstname: "Kevin",
    lastname: "Beaubois"
  },
  {
    nickname: "Ragsomar",
    firstname: "P",
    lastname: "A"    
  }
];

class Profiles extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        {this.props.profiles.map(profile => (
          <div key={profile.id}>
            <h2>{profile.nickname}</h2>
            <p>{profile.firstname}</p>
            <p>{profile.lastname}</p>
          </div>
        ))}
      </div>
    );
  }
}

export default Profiles;
