import React from 'react'
import { Navigate } from 'react-router-dom'
import { useUser } from './UserContext'

const ProtectedRoutes = ({children}) => {
    const{user,isLoading}=useUser()
    if(isLoading)return <p>Loading</p>
    if(!user)return <Navigate to='/login' replace/>
  return children
}

export default ProtectedRoutes