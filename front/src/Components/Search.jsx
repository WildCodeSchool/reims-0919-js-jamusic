import React from 'react'

const Search = props => {
	return (
		<div className='flex-column overflow:hidden'>
			<h2 className='space-size:xl space:inset-squish title-font'>
				Selectionnez vos tags:
			</h2>
			<ul>
				{props.tags.map(tag => {
					return (
						<li
							key={tag.id}
							onClick={() =>
								props.handleSelectedTags(tag.instrument)
							}
							className={
								props.selectedTags.includes(tag.instrument)
									? 'is_selected space-size:s space:stack style:none space:inset-squish tags-font'
									: 'space-size:s space:stack style:none space:inset-squish tags-font'
							}
						>{`#${tag.instrument}`}</li>
					)
				})}
			</ul>
		</div>
	)
}

export default Search
