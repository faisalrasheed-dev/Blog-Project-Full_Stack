import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { createContext, useContext, useEffect, useState } from 'react'
const UserContext=createContext()
export const UserProvider=({children})=>{
    const [user,setUser]=useState(null)
    const [isLoading,setIsLoading]=useState(true)
    useEffect(()=>{
        const unSubscribe=onAuthStateChanged(getAuth(),function(currentUser) {
            setUser(currentUser)
            setIsLoading(false)
        })
        return unSubscribe
    },[])
    return (
    <UserContext.Provider value={{ user, isLoading }}>
      {children}
    </UserContext.Provider>
  );
}
export function useUser() {
  return useContext(UserContext);
}
