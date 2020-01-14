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
        <div className='flex-row width100 space-around border'>
            <Link to=''>
                <FontAwesomeIcon
                    icon='scroll'
                    size='lg'
                    className='icon-zone'
                />
            </Link>
            <Link to='/tags'>
                <FontAwesomeIcon
                    icon='tags'
                    size='lg'
                    className='width25 icon-zone'
                />
            </Link>
            <Link to='/profiles'>
                <FontAwesomeIcon
                    icon='user'
                    size='lg'
                    className='width25 icon-zone'
                />
            </Link>
            <Link to=''>
                <FontAwesomeIcon
                    icon='comment-dots'
                    size='lg'
                    className='width25 icon-zone'
                />
            </Link>
        </div>
    )
}

export default Navbar
