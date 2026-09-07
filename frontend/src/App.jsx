import React from 'react'
import {Route, BrowserRouter as Router, Routes }  from "react-router-dom"
import Home from './pages/home/Home'
import Login from './pages/auth/Login'
import SignUp from './pages/auth/SignUp'
// import StoryModal from './StoryModal'


const App = () => {
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