import React from 'react'
import axios from 'axios'

class Search extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			tags: [],
			matchedProfiles: [],
			selectedTags: []
		}
		this.getProfileViaTag = this.getProfileViaTag.bind(this)
		this.handleSelectedTags = this.handleSelectedTags.bind(this)
	}
	componentDidMount() {
		axios
			.get('http://localhost:3000/tags/', {
				headers: {
					Authorization: `Bearer ${this.props.token}`
				}
			})
			.then(data => this.setState({ tags: data.data }))
	}

	handleSelectedTags(instrument) {
		this.setState({
			selectedTags: this.state.selectedTags.includes(instrument)
				? this.state.selectedTags.filter(tag => tag !== instrument)
				: [...this.state.selectedTags, instrument]
		})
	}

	getProfileViaTag() {
		axios
			.get(`http://localhost:3000/tags/${this.state.selectedTags}`, {
				headers: {
					Authorization: `Bearer ${this.props.token}`
				}
			})
			.then(data => this.setState({ matchedProfiles: data.data }))
	}

	render() {
		return (
			<div className='flex-column overflow:hidden'>
				<h2 className='space-size:xl space:inset-squish title-font'>
					Selectionnez vos tags:
				</h2>
				<div className='flex-row'>
					<div>
						<ul>
							{this.state.tags.map(tag => {
								return (
									tag.category === 'Instrument' && (
										<li
											key={tag.id}
											onClick={() =>
												this.handleSelectedTags(
													tag.name
												)
											}
											className={
												this.state.selectedTags.includes(
													tag.name
												)
													? 'is_selected space-size:s space:stack style:none tags-font'
													: 'space-size:s space:stack style:none tags-font'
											}
										>{`#${tag.name}`}</li>
									)
								)
							})}
						</ul>
					</div>
					<div>
						<ul>
							{this.state.tags.map(tag => {
								return (
									tag.category === 'Style' && (
										<li
											key={tag.id}
											onClick={() =>
												this.handleSelectedTags(
													tag.name
												)
											}
											className={
												this.state.selectedTags.includes(
													tag.name
												)
													? 'is_selected space-size:s space:stack style:none tags-font'
													: 'space-size:s space:stack style:none tags-font'
											}
										>{`#${tag.name}`}</li>
									)
								)
							})}
						</ul>
					</div>
				</div>
				<input type='submit' onClick={this.getProfileViaTag()} />
			</div>
		)
	}
}

export default Search
