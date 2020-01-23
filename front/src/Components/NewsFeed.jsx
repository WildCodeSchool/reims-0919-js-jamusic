import React from 'react'
import PostDisplay from './PostDisplay'
import axios from 'axios'

class NewsFeed extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			posts: []
		}
	}

	componentDidMount() {
		axios
			.get(`http://localhost:3000/feed`, {
				headers: {
					Authorization: `Bearer ${this.props.token}`
				}
			})
			.then(data =>
				this.setState({
					posts: data.data
				})
			)
	}

	loadAnotherProfile = event => {
		this.props.history.push(`/profiles/${event.target.id}`)
	}

	render() {
		return (
			<div>
				{this.state.posts.map(post => (
					<PostDisplay
						key={post.id}
						profile_pic={post.picture}
						nickname={post.nickname}
						tags={post.tags}
						media={post.media}
						likes={post.likes}
						text={post.text}
						profileId={post.profile_id}
						loadAnotherProfile={this.loadAnotherProfile}
						date={post.date}
					/>
				))}
			</div>
		)
	}
}

export default NewsFeed
