import React from 'react'
import { Link } from 'react-router-dom'
import './Space.css'
import axios from 'axios'

const test = {
	id: 1,
	picture:
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
					id: data.data[0].id,
					nickname: data.data[0].nickname
				})
			)
	}

	render() {
		return (
			<div className=''>
				<div className='space-between'>
					<div
						key={this.state.id}
						className=' flex-column border profile-bg-color'
					>
						<div className='flex-row'>
							<div className=''>
								<div className='flex-column space:inset'>
									<h2 className='space:stack title-color title-font'>
										@{this.state.nickname}
									</h2>
									<p className='space-size:s space:stack'>
										2B abonnés / 1k abonnements
									</p>
									<h3 className='space:stack title-font'>
										CENTRES D'INTERETS :{' '}
									</h3>
								</div>
								<div className='flex-column'>
									<div className='flex-row'>
										<p className='space-size:s space:inline space:stack space:inset-squish'>
											{test.style}
										</p>
										<p className='space-size:s space:inline space:stack space:inset-squish'>
											{test.instrument}
										</p>
										<p className='space-size:s space:inline space:stack space:inset-squish'>
											{test.status}
										</p>
										<p className='space-size:s space:inline space:stack space:inset-squish'>
											{test.city}
										</p>
									</div>
								</div>
							</div>
							<div className='flex-column'>
								<img
									src={
										test.picture
											? test.picture
											: 'https://www.mystpedia.net/mystpedia/images/8/86/Point_d%27interrogation.png'
									}
									alt='Personnal profile pic'
									className='img-chip width100 space:stack'
								/>
								<Link
									to='/profiles/modif'
									className='space-size:s space:inset-squish space:stack'
								>
									Modifier
								</Link>
							</div>
						</div>

						<p className='space:inset-squish space:stack'>
							{test.bio}
						</p>
					</div>
				</div>
				<div className=''>
					<h2 className='flex-column space:inset title-font'>
						DERNIERES PUBLICATIONS
					</h2>
					<p>
						Lorem ipsum dolor sit, amet consectetur adipisicing
						elit. Maiores sapiente esse ipsum quisquam quibusdam,
						beatae aperiam tempore quo alias exercitationem dolorum,
						quaerat eos magni voluptates at veniam odio obcaecati
						culpa! Lorem ipsum dolor sit amet consectetur
						adipisicing elit. Ullam laboriosam itaque,
						necessitatibus expedita aut voluptatibus ad animi totam
						quod ratione quaerat nisi doloribus quidem non assumenda
						quam atque! Ex, in?
					</p>
				</div>
			</div>
		)
	}
}

export default Profile
