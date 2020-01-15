import React from 'react'
import './Profile.css'
import { Link } from 'react-router-dom'
import axios from 'axios'

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
        this.state = {
            id: this.props.id,
            nickname: '',
            firstname: '',
            lastname: ''
        }
    }
    componentDidMount() {
        axios
            .get(`http://localhost:3000/profiles/${this.state.id}`, {
                params: {
                    token: this.props.token
                }
            })
            .then(data =>
                this.setState({
                    id: data.data[0].profile_id,
                    nickname: data.data[0].nickname,
                    firstname: data.data[0].firstname,
                    lastname: data.data[0].lastname
                })
            )
    }

    render() {
        return (
            <div className='profilePage'>
                <div key={this.state.id} className='profile'>
                    <img
                        src={
                            test.profile_pic
                                ? test.profile_pic
                                : 'https://www.mystpedia.net/mystpedia/images/8/86/Point_d%27interrogation.png'
                        }
                        alt='Personnal profile pic'
                        className='profilePic'
                    />
                    <Link to='/profiles/modif'>Modifier</Link>
                    <h3>@{this.state.nickname}</h3>
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

                    {}
                </div>
            </div>
        )
    }
}

export default Profile
