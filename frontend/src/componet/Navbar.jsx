import React from 'react'
import travlelogo from '../assets/travel-story-logo.svg'
import ProfileInfo from './ProfileInfo'

const Navbar = () => {


  return (
    <div className='bg-white flex items-center justify-between px-6 py-3 drop-shadow sticky top-0 z-10  '>
        <img src={travlelogo} alt="travel-logo" className=' h-20' />
        <ProfileInfo/>
    </div>
  )
}

export default Navbar