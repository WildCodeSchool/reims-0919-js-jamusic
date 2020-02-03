import React from 'react'
import axios from 'axios'

class Search extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			tags: []
		}
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

	handleSelectedTags(tag) {
		let selectedTags = [...this.props.selectedTags]
		if (selectedTags.some(selectedTag => selectedTag.id === tag.id)) {
			selectedTags = selectedTags.filter(
				selectedTag => selectedTag.id !== tag.id
			)
		} else {
			selectedTags.push(tag)
		}
		this.props.setSelectedTags(selectedTags)
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
												this.handleSelectedTags(tag)
											}
											className={
												this.props.selectedTags.some(
													selectedTag =>
														selectedTag.id ===
														tag.id
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
												this.handleSelectedTags(tag)
											}
											className={
												this.props.selectedTags.some(
													selectedTag =>
														selectedTag.id ===
														tag.id
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
			</div>
		)
	}
}

export default Search
