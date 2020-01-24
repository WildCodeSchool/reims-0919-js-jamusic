import React from 'react'
import { Link } from 'react-router-dom'
import './Space.css'
import axios from 'axios'
import PostDisplay from './PostDisplay'
//import PostCreation from './PostCreation'
import { FABButton, Icon, Spinner } from 'react-mdl'

class Profile extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			nickname: '',
			picture: '',
			biography: '',
			ville: '',
			posts: [],
			isLoaded: false,
			didShowPostCreation: false,
			text: '',
			media: ''
		}
	}
	componentDidMount() {
		const url = [
			`http://localhost:3000/profiles/${this.props.match.params.id}`,
			`http://localhost:3000/profiles/${this.props.match.params.id}/posts`
		]

		const config = {
			headers: {
				Authorization: `Bearer ${this.props.token}`
			}
		}
		axios.all([axios.get(url[0], config), axios.get(url[1], config)]).then(
			axios.spread((profileRes, postsRes) => {
				this.setState({
					nickname: profileRes.data[0].nickname,
					picture: profileRes.data[0].picture,
					biography: profileRes.data[0].biography,
					ville: profileRes.data[0].ville,
					posts: postsRes.data,
					isLoaded: true
				})
			})
		)
	}

	submitMessage = e => {
		e.preventDefault()
		const data = {
			text: this.state.text,
			media: this.state.media
		}
		axios
			.post(
				`http://localhost:3000/profile/${this.props.id}/posts/new`,
				data,
				{
					headers: {
						Authorization: `Bearer ${this.props.token}`
					}
				}
			)
			.then(alert('Message créé'))
			.then(() => this.showPostCreation)
	}

	showPostCreation = () => {
		this.setState({
			didShowPostCreation: !this.didShowPostCreation
		})
	}

	onChange = e => {
		this.setState({ [e.target.name]: e.target.value })
	}

	render() {
		return this.state.didShowPostCreation ? (
			<form onSubmit={this.submitMessage}>
				<label htmlFor='text'>Votre message :</label>
				<textarea
					placeholder='Votre message ici ...'
					name='text'
					id='text'
					rows='5'
					cols='33'
					onInput={this.onChange}
				/>
				<label htmlFor='picture'>Avatar :</label>
				<input
					placeholder='URL de votre media'
					type='text'
					name='media'
					id='media'
					onInput={this.onChange}
				/>
				<button type='submit'>Poster</button>
			</form>
		) : (
			<div className=''>
				<div className='space-between'>
					<div
						key={this.props.id}
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
								{this.props.match.params.id ==
									this.props.id && (
									<Link
										to='/profiles/modif'
										className='space-size:s space:inset-squish space:stack'
									>
										Modifier
									</Link>
								)}
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
						{this.state.posts ? (
							this.state.posts.map(post => (
								<PostDisplay
									key={post.id}
									profile_pic={post.picture}
									nickname={post.nickname}
									tags={post.tags}
									media={post.media}
									likes={post.likes}
									text={post.text}
									date={post.date}
								/>
							))
						) : (
							<>
								<Spinner singleColor />
								<p>Chargement des posts ...</p>
							</>
						)}
					</div>
					<FABButton colored ripple onClick={this.showPostCreation}>
						<Icon name='+' />
					</FABButton>
				</div>
			</div>
		)
	}
}

export default Profile
