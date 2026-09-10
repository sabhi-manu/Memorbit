import React, { useEffect } from 'react'
import {Navigate, Route, BrowserRouter as Router, Routes }  from "react-router-dom"
import Home from './pages/home/Home'
import Login from './pages/auth/Login'
import SignUp from './pages/auth/SignUp'
import axiosInstance from './utils/axiosInstance'
// import StoryModal from './StoryModal'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import PublicRoute from './protectedRoute/PublicRoute'
import PrivateRoute from './protectedRoute/PrivateRoute'

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
        <Route path='/' element={<Navigate to='/dashboard' replace />} />

        <Route element={<PrivateRoute/>}>
        <Route path='/dashboard' element={<Home/>} />
        </Route>

        <Route element={<PublicRoute/>} >
        <Route path='/login' element={<Login/>} />
        <Route path='/signup' element={<SignUp/>} />
        </Route>
      </Routes>
    </Router>

    {/* checking the model working  */}
    
    {/* <StoryModal/> */}
 <ToastContainer />
    </div>
  )
}

export default App