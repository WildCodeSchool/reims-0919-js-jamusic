import React from 'react'
import { Link } from 'react-router-dom'
import './Space.css'
import axios from 'axios'
import PostDisplay from './PostDisplay'
import cogoToast from 'cogo-toast'

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
			media: '',
			newPostInjected: false,
			email: ''
		}
	}

	handleSelectedTags(instrument) {
		this.setState({
			selectedTags: this.state.selectedTags.includes(instrument)
				? this.state.selectedTags.filter(tag => tag !== instrument)
				: [...this.state.selectedTags, instrument]
		})
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
					email: profileRes.data[0].email,
					posts: postsRes.data,
					isLoaded: true
				})
			})
		)
	}

	componentDidUpdate() {
		this.state.newPostInjected &&
			axios
				.get(
					`http://localhost:3000/profiles/${this.props.match.params.id}/posts`,
					{
						headers: {
							Authorization: `Bearer ${this.props.token}`
						}
					}
				)
				.then(response => {
					this.setState({
						posts: response.data,
						newPostInjected: false,
						isLoaded: true
					})
				})
	}

	showPostCreation = () => {
		this.setState({
			didShowPostCreation: true
		})
	}

	hidePostCreation = () => {
		this.setState({
			didShowPostCreation: false
		})
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
			.then(this.setState({ newPostInjected: true }))
			.then(this.hidePostCreation)
			.then(cogoToast.success('Message posté'))
	}

	onChange = e => {
		this.setState({ [e.target.name]: e.target.value })
	}

	render() {
		return this.state.didShowPostCreation ? (
			<form
				onSubmit={this.submitMessage}
				className='height-max-100 flex-column flex-align:center space-size:l space:stack space:inset-squish'
			>
				<label htmlFor='text'>Votre message :</label>
				<textarea
					placeholder='Votre message ici ...'
					name='text'
					id='text'
					rows='5'
					cols='33'
					onInput={this.onChange}
				/>
				<label htmlFor='picture'>Media :</label>
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
						className='flex-column border profile-bg-color'
					>
						<div className='flex-row'>
							<div className=''>
								<div className='flex-column space:inset'>
									<h2 className='space:stack title-color title-font'>
										@{this.state.nickname}
									</h2>
									<p className='space-size:s space:stack'>
										0 abonné / 0 abonnement
									</p>
									<h3 className='space:stack title-font'>
										CENTRES D'INTERETS :{' '}
									</h3>
								</div>
								<div className='flex-column'>
									<div className='flex-row'>
										<p className='space-size:s space:inline space:stack space:inset-squish'>
											Violon
										</p>
										<p className='space-size:s space:inline space:stack space:inset-squish'>
											Email de contact: {this.state.email}
										</p>
										<p className='space-size:s space:inline space:stack space:inset-squish'></p>
										<p className='space-size:s space:inline space:stack space:inset-squish'>
											Ville {this.state.ville}
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
									className='img-chip space:stack'
									style={{
										width: '64px',
										height: '64px',
										objectFit: 'scale-down'
									}}
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
									loadProfile={this.loadProfile}
									profileId={this.props.match.params.id}
									date={post.date}
								/>
							))
						) : (
							<p>Chargement des posts ...</p>
						)}
					</div>
					<button
						className='addButton'
						onClick={this.showPostCreation}
					>
						+
					</button>
				</div>
			</div>
		)
	}
}

export default Profile
