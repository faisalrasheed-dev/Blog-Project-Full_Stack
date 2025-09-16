import React, { useState } from 'react'
import { Link,useNavigate} from 'react-router-dom'
import {createUserWithEmailAndPassword,getAuth} from 'firebase/auth'

const CreateAccountPage = () => {
    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')
    const [error,setError]=useState('')
    const navigate=useNavigate()
    const [confirmPassword,setConfirmPassword]=useState('')
    const[loading,setLoading]=useState(false)
    const handleLogin= async()=>{
      setError('')
      setLoading(true)
      if (password !== confirmPassword)
      {
        setError("password and confirm password doesnt match")
        setLoading(false)
        return
      }
        try{
            await createUserWithEmailAndPassword(getAuth(),email,password)
            navigate('/articles')
        }
        catch (e){
            setError(e.message)
        }
        finally{
          setLoading(false)
        }

    }
  return (
    <div>
          <h1 className="text-center text-2xl md:text-4xl font-bold text-gray-700">Register</h1>
          {error && <p className="text-red-500">{error}</p>}
    
          <div className="mt-5 md:h-[320px] bg-white p-5 md:p-10 flex flex-col items-center text-center border rounded-xl shadow-lg space-y-8">
            <input
              className="w-full px-4 py-2 md:px-6 md:py-4 bg-gray-100 border rounded-lg text-center focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter Your Email"
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
    
            <input
              className="w-full px-4 py-2 md:px-6 md:py-4 bg-gray-100 border rounded-lg text-center focus:outline-none focus:ring-2 focus:ring-blue-500"
              type="password"
              placeholder="Enter Your Password"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
            <input
              className="w-full px-4 py-2 md:px-6 md:py-4 bg-gray-100 border rounded-lg text-center focus:outline-none focus:ring-2 focus:ring-blue-500"
              type="password"
              placeholder="Confirm Your Password"
              value={confirmPassword}
              onChange={e => setConfirmPassword(e.target.value)}
            />
    
            <button
              className="w-full px-4 py-2 md:px-6 md:py-4 border rounded-lg  text-xl md:text-2xl font-bold text-white bg-blue-500 hover:bg-white hover:text-black focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              onClick={handleLogin}
              disabled={loading}
            >
              {loading ? "Waiting" : "SignUp"}
            </button>
          </div>
    
          <Link to="/login">
            <p className="text-center">Already have an account? click here</p>
          </Link>
        </div>
  )
}

export default CreateAccountPage