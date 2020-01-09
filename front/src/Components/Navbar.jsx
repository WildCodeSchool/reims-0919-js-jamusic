import React from 'react'
import { library } from '@fortawesome/fontawesome-svg-core'
import {
    faCommentDots,
    faTags,
    faUser,
    faScroll
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './Navbar.css'
import { Link } from 'react-router-dom'

library.add(faCommentDots, faTags, faUser, faScroll)

const Navbar = () => {
    return (
        <div className='Navbar'>
            <Link to=''>
                <FontAwesomeIcon icon='scroll' className='navIcon' />
            </Link>
            <Link to='/tags'>
                <FontAwesomeIcon icon='tags' className='navIcon' />
            </Link>
            <Link to='/profiles'>
                <FontAwesomeIcon icon='user' className='navIcon' />
            </Link>
            <Link to=''>
                <FontAwesomeIcon icon='comment-dots' className='navIcon' />
            </Link>
        </div>
    )
}

export default Navbar
