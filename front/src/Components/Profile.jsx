import React from 'react'
import { Link } from 'react-router-dom'
import './Space.css'
import axios from 'axios'
import PostDisplay from './PostDisplay'

class Profile extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			nickname: '',
			picture: '',
			biography: '',
			ville: '',
			posts: []
		}
	}
	componentDidMount() {
		const url = [
			`http://localhost:3000/profiles/${this.props.id}`,
			`http://localhost:3000/posts/${this.props.id}`
		]
		axios
			.all([
				(axios.get(url[0], {
					headers: {
						Authorization: `Bearer ${this.props.token}`
					}
				}),
				axios.get(url[1], {
					headers: {
						Authorization: `Bearer ${this.props.token}`
					}
				}))
			])
			.then(
				axios.spread((profileRes, postsRes) => {
					this.setState({
						nickname: profileRes.data[0].nickname,
						picture: profileRes.data[0].picture,
						biography: profileRes.data[0].biography,
						ville: profileRes.data[0].ville,
						tags: postsRes
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
					<div>
						{this.state.posts.map(post => (
							<PostDisplay
								key={post.nickname}
								profile_pic={post.picture}
								nickname={post.nickname}
								tags={post.tags}
								media={post.media}
								likes={post.likes}
								text={post.text}
							/>
						))}
					</div>
				</div>
			</div>
		)
	}
}

export default Profile
