// @ts-nocheck

import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { getIsLoggedIn } from '../../redux/slices/users'
import NavProfile from './NavProfile'

const NavBar: React.FC = () => {
  const isLoggedIn = useSelector(getIsLoggedIn())

  if (isLoggedIn) {
    return (
      <nav className='navbar navbar-dark bg-dark'>
        <div className='container-fluid'>
          <div>
            <ul className='navbar-nav me-auto mb-2 flex-row'>
              <li className='nav-item' style={{ marginRight: '15px' }}>
                <Link className='nav-link' to='/'>
                  Home
                </Link>
              </li>
              <li className='nav-item'>
                <Link className='nav-link' to='/users/search'>
                  Search
                </Link>
              </li>
            </ul>
          </div>
          <NavProfile />
        </div>
      </nav>
    )
  } else {
    return null
  }
}

export default NavBar
