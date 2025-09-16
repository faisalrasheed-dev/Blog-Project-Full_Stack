import { Outlet } from 'react-router-dom'
import NavBar from './components/NavBar'
import MainLayout from './components/MainLayout'
const Layout = () => {
  return (
    <div>
        <>
        <NavBar/>
        <MainLayout>
            <Outlet/>
        </MainLayout>
        </>
    </div>
  )
}

export default Layout