import React, { useState } from 'react'
import travlelogo from '../assets/travel-story-logo.svg'
import ProfileInfo from './ProfileInfo'
import {useNavigate} from 'react-router-dom'
import axiosInstance from '../utils/axiosInstance'
import { toast } from 'react-toastify'
import SearchBar from './SearchBar'

const Navbar = ({searchQuery,setSearchQuery,handleSearchStory,handleClearSearch}) => {
    const navigate = useNavigate()
   

  const userInfo = {
    name:'manu kumar'
  }

  const onLogout = async ()=>{
    console.log('logout function call ....')
   try {
    const response = await axiosInstance.delete(`/user/logout`)
    
    if(response.data && response.data.success){
      toast.success('User Logout successfully.')
      navigate('/login')
    }
     
   } catch (error) {
    console.log('Error ')
   }
  }

  const hendleSearch = async ()=>{
    if(searchQuery){
      handleSearchStory(searchQuery)
    }
  }

  const onCleaerSearch = async ()=>{
    handleClearSearch()
  }

  return (
    <div className='bg-white flex items-center justify-between px-6 py-3 drop-shadow sticky top-0 z-10  '>
        <img src={travlelogo} alt="travel-logo" className=' h-20' />

        <SearchBar value={searchQuery} onChange={({target})=>{
          setSearchQuery(target.value)
        }}
        handleSearch={hendleSearch}
        onClearSearch ={onCleaerSearch}
        />

        <ProfileInfo userInfo={userInfo} onLogout={onLogout} />
    </div>
  )
}

export default Navbar