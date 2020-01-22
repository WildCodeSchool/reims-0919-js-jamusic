import React from 'react'
import { Link } from 'react-router-dom'
import './Space.css'
import axios from 'axios'

class Profile extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			id: this.props.id,
			nickname: '',
			picture: '',
			biography: '',
			ville: '',
			tags: []
		}
	}
	componentDidMount() {
		const url = [
			`http://localhost:3000/profiles/${this.state.id}`,
			'http://localhost:3000/tags'
		]
		axios
			.all([
				(axios.get(url[0], {
					params: {
						token: this.props.token
					}
				}),
				axios.get(url[1], {
					params: {
						token: this.props.token
					}
				}))
			])
			.then(
				axios.spread((profileRes, tagRes) => {
					this.setState({
						id: profileRes.data[0].id,
						nickname: profileRes.data[0].nickname,
						picture: profileRes.data[0].picture,
						biography: profileRes.data[0].biography,
						ville: profileRes.data[0].ville,
						tags: tagRes
					})
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
											Tag
										</p>
										<p className='space-size:s space:inline space:stack space:inset-squish'>
											Tag
										</p>
										<p className='space-size:s space:inline space:stack space:inset-squish'>
											Tag
										</p>
										<p className='space-size:s space:inline space:stack space:inset-squish'>
											{this.state.ville}
										</p>
									</div>
								</div>
							</div>
							<div className='flex-column'>
								<img
									src={
										this.state.picture
											? this.state.picture
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
							{this.state.biography}
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
