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
            <Link to='' className='navlink'>
                <FontAwesomeIcon icon='scroll' className='navIcon' />
            </Link>
            <Link to='/tags' className='navlink'>
                <FontAwesomeIcon icon='tags' className='navIcon' />
            </Link>
            <Link to='/profiles' className='navlink'>
                <FontAwesomeIcon icon='user' className='navIcon' />
            </Link>
            <Link to='' className='navlink'>
                <FontAwesomeIcon icon='comment-dots' className='navIcon' />
            </Link>
        </div>
    )
}

export default Navbar
