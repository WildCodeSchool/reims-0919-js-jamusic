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

library.add(faCommentDots, faTags, faUser, faScroll)

const Navbar = () => {
  return (
    <div className='Navbar'>
      <FontAwesomeIcon icon='scroll' className='navIcon' />
      <FontAwesomeIcon icon='tags' className='navIcon' />
      <FontAwesomeIcon icon='user' className='navIcon' />
      <FontAwesomeIcon icon='comment-dots' className='navIcon' />
    </div>
  )
}

export default Navbar
