import React from 'react'
import { library } from '@fortawesome/fontawesome-svg-core'
import {
	faCommentDots,
	faTags,
	faUser,
	faScroll
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from 'react-router-dom'
import './Navbar.css'

library.add(faCommentDots, faTags, faUser, faScroll)

const Navbar = props => {
	return (
		<div className='flex-row width100 space-around border'>
			<Link to={`/${props.id}/feed`}>
				<FontAwesomeIcon
					icon='scroll'
					size='lg'
					className='icon-zone nav-icon-color'
				/>
			</Link>
			<Link to='/tags'>
				<FontAwesomeIcon
					icon='tags'
					size='lg'
					className='icon-zone nav-icon-color'
				/>
			</Link>
			<Link to={`/profiles/${props.id}`}>
				<FontAwesomeIcon
					icon='user'
					size='lg'
					className='icon-zone nav-icon-color'
				/>
			</Link>
			<Link to=''>
				<FontAwesomeIcon
					icon='comment-dots'
					size='lg'
					className='icon-zone nav-icon-color'
				/>
			</Link>
		</div>
	)
}

export default Navbar
