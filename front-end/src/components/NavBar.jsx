import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { signOut, getAuth } from 'firebase/auth'
import { useUser } from '../UserContext.jsx'

const NavBar = () => {
  const { isLoading, user } = useUser()
  const navigate = useNavigate()
  const [isOpen, setIsOpen] = useState(false)

  const handleSignOut = async () => {
    await signOut(getAuth())
    navigate('/login')
    setIsOpen(false) // close dropdown after logout
  }

  return (
    <header className='p-4 md:p-8 bg-gray-400 md:text-white'>
      <nav className='flex justify-between items-center relative'>
        <h1 className="text-2xl md:text-4xl font-bold">
          <span className="text-black">Ink</span><span className="text-white">Flow</span>
        </h1>

        <button 
          className='md:hidden text-2xl' 
          onClick={() => setIsOpen(!isOpen)}
        >
          ☰
        </button>

        <ul className='hidden md:flex justify-end gap-1 md:gap-2 font-serif'>
          <li><Link to='/' className="hover:text-blue-500">Home</Link></li>
          <li><Link to='/about' className="hover:text-blue-500">About</Link></li>
          <li><Link to='/articles' className="hover:text-blue-500">Articles</Link></li>
          {user && <li><Link to="/addarticle" className="hover:text-blue-500">Add Article</Link></li>}
          {isLoading 
            ? <li>Loading...</li>
            : <>
                {user && <li><Link to="/profile" className="hover:text-blue-500">Profile</Link></li>}
                <li>
                  {user
                    ? <button onClick={handleSignOut} className="hover:text-blue-500">Logout</button>
                    : <button onClick={() => { navigate('/login'); setIsOpen(false); }} className="hover:text-blue-500">Login</button>}
                </li>
              </>
          }
        </ul>

        {isOpen && (
          <ul className='md:hidden absolute right-0 top-full mt-2 bg-white/70 shadow-md p-4 space-y-2 w-40 text-right font-serif'>
            <li>
              <Link to='/' className="hover:text-blue-500" onClick={() => setIsOpen(false)}>Home</Link>
            </li>
            <li>
              <Link to='/about' className="hover:text-blue-500" onClick={() => setIsOpen(false)}>About</Link>
            </li>
            <li>
              <Link to='/articles' className="hover:text-blue-500" onClick={() => setIsOpen(false)}>Articles</Link>
            </li>
            {user && (
              <li>
                <Link to="/addarticle" className="hover:text-blue-500" onClick={() => setIsOpen(false)}>Add Article</Link>
              </li>
            )}
            {isLoading 
              ? <li>Loading...</li>
              : <>
                  {user && <li><Link to="/profile" className="hover:text-blue-500" onClick={() => setIsOpen(false)}>Profile</Link></li>}
                  <li>
                    {user
                      ? <button onClick={handleSignOut} className="hover:text-blue-500">Logout</button>
                      : <button onClick={() => { navigate('/login'); setIsOpen(false); }} className="hover:text-blue-500">Login</button>}
                  </li>
                </>
            }
          </ul>
        )}
      </nav>
    </header>
  )
}

export default NavBar
