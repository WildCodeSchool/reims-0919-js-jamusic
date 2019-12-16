import React from 'react'
import './Profile.css'

const test = {
    id: 1,
    profile_pic:
        'https://i.pinimg.com/236x/01/ba/d2/01bad2f10881ae2319623e1b62450ff4--fan-art-wallpaper.jpg',
    nickname: 'Ragsomar',
    instrument: 'Guitare',
    style: 'Rock',
    status: 'Amateur',
    city: 'Reims',
    bio:
        'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Corrupti consectetur, architecto accusamus modi optio sunt qui at et incidunt quidem accusantium pariatur nobis, animi quis placeat earum amet quasi fugit.'
}

class Profile extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    render() {
        return (
            <div className='profilePage'>
                <div key={test.id} className='profile'>
                    <img
                        src={
                            test.profile_pic
                                ? test.profile_pic
                                : 'https://www.mystpedia.net/mystpedia/images/8/86/Point_d%27interrogation.png'
                        }
                        alt='Personnal profile pic'
                        className='profilePic'
                    />
                    <h3>@{this.props.profile[0].nickname}</h3>
                    <p>2B abonnés / 1k abonnements</p>
                    <h3>CENTRES D'INTERETS : </h3>
                    <p>
                        {test.style} / {test.instrument} / {test.status}
                    </p>
                    <p>{test.city}</p>
                    <p>{test.bio}</p>
                </div>
                <div className='profilePost'>
                    <h2>DERNIERES PUBLICATIONS</h2>
                    <hr />
                </div>
            </div>
        )
    }
}

export default Profile
