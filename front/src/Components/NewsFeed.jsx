import React from 'react'
import PostDisplay from './PostDisplay'
import axios from 'axios'

class NewsFeed extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			token: this.props.token,
			posts: []
		}
	}

	componentDidMount() {
		axios
			.get(`http://localhost:3000/${this.props.id}/feed`, {
				params: {
					token: this.state.token
				}
			})
			.then(data =>
				this.setState({
					posts: data.data
				})
			)
	}

	render() {
		return (
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
		)
	}
}

export default NewsFeed
