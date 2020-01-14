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

const Navbar = () => {
    return (
        <div className='flex-row fixed-bottom-1 width100 space-around border'>
            <Link to='' className=''>
                <FontAwesomeIcon icon='scroll' className='width25 icon-zone' />
            </Link>
            <Link to='/tags' className=''>
                <FontAwesomeIcon icon='tags' className='width25 icon-zone' />
            </Link>
            <Link to='/profiles' className=''>
                <FontAwesomeIcon icon='user' className='width25 icon-zone' />
            </Link>
            <Link to='' className=''>
                <FontAwesomeIcon
                    icon='comment-dots'
                    className='width25 icon-zone'
                />
            </Link>
        </div>
    )
}

export default Navbar
