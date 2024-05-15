import { Outlet } from 'react-router-dom'
import NavBar from './NavBar'

interface LayoutProps {}

const Layout: React.FC<LayoutProps> = () => {
  return (
    <>
      <NavBar />
      <Outlet />
    </>
  )
}

export default Layout
