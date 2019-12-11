import React from "react";

const test = {
  id: 1,
  profile_pic: 'https://i.pinimg.com/236x/01/ba/d2/01bad2f10881ae2319623e1b62450ff4--fan-art-wallpaper.jpg',
  nickname: "Ragsomar",
  instrument: "Guitare",
  style: "Rock",
  status: "Amateur",
  city: "Reims"
};
class Profiles extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div key={test.id}>
        <img src={test.profile_pic} alt='Personnal profile pic' />
        <h2>@{test.nickname}</h2>
        <p>x abonnés ! y abonnements</p>
        <h3>Centres d'intérêts : </h3>
        <p>
          {test.style} / {test.instrument}
        </p>
        <p>{test.city}</p>
      </div>
    );
  }
}

export default Profiles;
