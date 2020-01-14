import React from 'react'
import { Link } from 'react-router-dom'
import './Space.css'

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
            <div className=''>
                <div key={test.id} className='flex-column'>
                    <img
                        src={
                            test.profile_pic
                                ? test.profile_pic
                                : 'https://www.mystpedia.net/mystpedia/images/8/86/Point_d%27interrogation.png'
                        }
                        alt='Personnal profile pic'
                        className='profilePic'
                    />
                    <div className='flex-column space:inset'>
                        <Link
                            to='/profiles/modif'
                            className='space-size:s space:stack'
                        >
                            Modifier
                        </Link>
                        <h3 className='space:stack'>@{test.nickname}</h3>
                        <p className='space-size:s space:stack'>
                            2B abonnés / 1k abonnements
                        </p>
                        <h3 className='space:stack'>CENTRES D'INTERETS : </h3>
                        <div className='flex-row'>
                            <p className='space-size:s space:inline space:stack'>
                                {test.style}
                            </p>
                            <p className='space-size:s space:inline space:stack'>
                                {test.instrument}
                            </p>
                            <p className='space-size:s space:inline space:stack'>
                                {test.status}
                            </p>
                            <p className='space-size:s space:inline space:stack'>
                                {test.city}
                            </p>
                        </div>
                        <p className='space:inset-squish'>{test.bio}</p>
                    </div>
                </div>
                <div className=''>
                    <h2 className='flex-column space:inset'>
                        DERNIERES PUBLICATIONS
                    </h2>
                </div>
            </div>
        )
    }
}

export default Profile
