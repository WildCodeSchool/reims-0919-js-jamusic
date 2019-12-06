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
        {tests.map(test => (
          <div>
            <h2>{test.nickname}</h2>
            <p>{test.firstname}</p>
            <p>{test.lastname}</p>
          </div>
        ))}
      </div>
    );
  }
}

export default Profiles;
