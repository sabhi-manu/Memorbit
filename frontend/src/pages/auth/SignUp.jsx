import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import signUp_image from '../../assets/signUp_image.png'
import { UseAuth } from '../../context/authContext'
import { signupApi } from './auth.api'
import {toast} from "react-toastify"


const SignUp = () => {
  const navigate = useNavigate()
  const {setUserFunction} = UseAuth()

  const [fullName,setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const validateEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)

  const handleLogin = async (e) => {
    e.preventDefault()
    setError('')

    if (!email || !password || !fullName) {
      setError('Fields  are required.')
      return
    }

    if (!validateEmail(email)) {
      setError('Please enter a valid email address.')
      return
    }

    try {
      setLoading(true)
    
      console.log('login handler', { fullName,email, password })

      const data = await signupApi({fullName,email,password})
      console.log('check the response of api create user ==>',data)
      setUserFunction(data.user)
      toast.success("User Register successfully.")
      navigate("/dashboard")
    
    } catch (err) {
      console.log("error occure in create user function signup ===>",err)
      setError(
        err?.response?.data?.message || 'Something went wrong. Please try again.'
      )
      toast.error("Something went wrong. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-cyan-100 overflow-hidden relative">

        <div className="login-ui-box right-10 -top-30" />
      <div className="login-ui-box -bottom-30 bg-cyan-300 left-80" />

      <div className="h-screen flex justify-center items-center px-4 relative z-50">
        <div className="flex w-full max-w-4xl bg-white rounded-2xl shadow-lg overflow-hidden items-stretch h-[500px]">
         
          <div className="hidden md:block w-1/2 overflow-hidden ">
            <img
              src={signUp_image}
              alt="SignUp"
              className="w-full h-full object-cover object-bottom rounded-2xl"
            />
          </div>

          <div className="w-full md:w-1/2 p-8 flex flex-col justify-center">
            <form onSubmit={handleLogin} className="flex flex-col gap-4">
              <h4 className="text-2xl font-semibold mb-2 text-gray-800">SignUp</h4>

              {error && (
                <p className="text-red-500 text-sm -mt-2">{error}</p>
              )}

              <div className="flex flex-col gap-1">
                <label htmlFor="fullName" className="text-sm font-medium text-gray-700">
                  User Name
                </label>
                <input
                  type="text"
                  name="fullName"
                  id="fullName"
                  placeholder="fullName"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="border border-gray-300 rounded-md px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 transition"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label htmlFor="email" className="text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="text"
                  name="email"
                  id="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="border border-gray-300 rounded-md px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 transition"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label htmlFor="password" className="text-sm font-medium text-gray-700">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="border border-gray-300 rounded-md px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 transition"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="bg-cyan-500 hover:bg-cyan-600 disabled:bg-cyan-300 text-white font-semibold py-2.5 rounded-md transition"
              >
                {loading ? 'SIGN IN...' : 'SIGNUP'}
              </button>

              <p className="text-center text-sm text-gray-500">or</p>

              <button
                type="button"
                onClick={() => navigate('/login')}
                className="border border-cyan-500 text-cyan-600 hover:bg-cyan-50 font-semibold py-2.5 rounded-md transition"
              >
                LOGIN
              </button>
            </form>
          </div>

        </div>
      </div>
    </div>
  )
}

export default SignUp