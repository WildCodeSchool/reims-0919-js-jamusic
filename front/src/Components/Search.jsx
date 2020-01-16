import React from 'react'
//import './Search.css'

const Search = props => {
    return (
        <div className='flex-column overflow:hidden'>
            <h2 className='space-size:xl space:inset-squish'>
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
                                    ? 'is_selected space-size:s space:stack style:none space:inset-squish'
                                    : 'space-size:s space:stack style:none space:inset-squish'
                            }
                        >{`#${tag.instrument}`}</li>
                    )
                })}
            </ul>
        </div>
    )
}

export default Search
