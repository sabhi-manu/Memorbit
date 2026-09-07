import React from 'react'
import { UseAuth } from '../context/authContext'
import { getInitialsLater } from '../utils/helper'
import {useNavigate} from "react-router-dom"
 
const ProfileInfo = () => {
    const navigate = useNavigate()

    // const {user,setUserFunction} = UseAuth()


    const onLogout = ()=>{
        console.log("logout button user remove...")
        // setUserFunction(null)
        navigate("/login")
    }
  return (
    <div className='flex items-center gap-3'>
        <div className='w-12 h-12 flex items-center justify-center rounded-full text-slate-950 font-medium bg-slate-200 ' > 
            {getInitialsLater("manu kumar")}
        </div>
        <div>
            <p className='text-sm font-medium'> { "manu"} </p>
            <button className='' onClick={onLogout}>Logout</button>
        </div>
    </div>
  )
}

export default ProfileInfo