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
						date={post.date}
					/>
				))}
			</div>
		)
	}
}

export default NewsFeed
