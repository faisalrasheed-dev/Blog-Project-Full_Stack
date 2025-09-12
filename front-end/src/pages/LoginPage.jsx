import React, { useState } from 'react'
import { Link,useNavigate} from 'react-router-dom'
import {signInWithEmailAndPassword,getAuth} from 'firebase/auth'

const LoginPage = () => {
    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')
    const [error,setError]=useState('')
    const [loading,setLoading]=useState()
    const navigate=useNavigate()
    const handleLogin= async()=>{
        setLoading(true)
        try{
            await signInWithEmailAndPassword(getAuth(),email,password)
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
        <h1>Login</h1>
        {error && <p>{error}</p>}
        <input placeholder="Enter Your Email" type="email"value={email} 
        onChange={e=>setEmail(e.target.value)} />
        <input type="password" placeholder='Enter Your Password' value={password} 
        onChange={e=>setPassword(e.target.value)} />
        <button onClick={handleLogin} disabled={loading}>{loading?"Waiting":"login"}</button>
        <Link to='/registration'>Dont have an account?click here</Link>
    </div>
  )
}

export default LoginPage