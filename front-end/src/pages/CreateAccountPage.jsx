import React, { useState } from 'react'
import { Link,useNavigate} from 'react-router-dom'
import {createUserWithEmailAndPassword,getAuth} from 'firebase/auth'

const CreateAccountPage = () => {
    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')
    const [error,setError]=useState('')
    const navigate=useNavigate()
    const [confirmPassword,setConfirmPassword]=useState('')
    const[loading,setLoading]=useState()
    const handleLogin= async()=>{
      setLoading(true)
      if (password !== confirmPassword)
      {
        setError("password and confirm password doesnt match")
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
        <h1>Create Account</h1>
        {error && <p>{error}</p>}
        <input placeholder="Enter Your Email" type="email"value={email} 
        onChange={e=>setEmail(e.target.value)} />
        <input type="password" placeholder='Enter Your Password' value={password} 
        onChange={e=>setPassword(e.target.value)} />
        <input type="password" placeholder='Confirm Your Password' value={confirmPassword} 
        onChange={e=>setConfirmPassword(e.target.value)} />
        <button onClick={handleLogin} disabled={loading}>{loading?"Waiting":"Create Account"}</button>
        <Link to='/login'>Already have an account</Link>
    </div>
  )
}

export default CreateAccountPage