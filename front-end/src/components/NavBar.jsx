import { Link ,useNavigate} from 'react-router-dom'
import { signOut,getAuth} from 'firebase/auth'
import './NavBar.css'
import {useUser} from '../UserContext.jsx'
const NavBar = () => {
  const {isLoading,user}=useUser()
  const navigate=useNavigate()
  const handleSignOut = async () => {
  await signOut(getAuth());
  navigate('/login');
};
  return (
    <div className='maindiv'>
        <ul className='nav'>
          <li><Link to='/'>Home </Link> </li>
          <li><Link to='/about'>About</Link> </li>
          <li><Link to='/articles'>Articles</Link> </li>
          {isLoading ?<li>Loading...</li>:
          <>
          {
            user&&(<li>Logged in as {user.email}</li>)
          }
          {
            <li>{user
              ?<button onClick={ handleSignOut}>Signout</button>
              :<button onClick={()=>navigate('/login')}>Signin</button>}
            </li>
          }
          </>}
        </ul>
    </div>
  )
}

export default NavBar