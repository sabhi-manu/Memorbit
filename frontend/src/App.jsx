import React, { useEffect } from 'react'
import {Route, BrowserRouter as Router, Routes }  from "react-router-dom"
import Home from './pages/home/Home'
import Login from './pages/auth/Login'
import SignUp from './pages/auth/SignUp'
import axiosInstance from './utils/axiosInstance'
// import StoryModal from './StoryModal'


const App = () => {

  // checking the connection with backend --- test api
  useEffect(()=>{
    axiosInstance.get('/test').then((resp)=>console.log("backend connected : ",resp.data))
    .catch((err)=>console.log("connection failed : ",err))
  },[])
  
  return (
    <div>
  
    <Router>
      <Routes>
        <Route path='/dashboard' element={<Home/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/signup' element={<SignUp/>} />
      </Routes>
    </Router>

    {/* checking the model working  */}
    
    {/* <StoryModal/> */}

    </div>
  )
}

export default App