import React from 'react'
import { useSelector } from 'react-redux'
import { Link, Navigate } from 'react-router-dom'
import { getIsLoggedIn } from '../redux/slices/users'

interface MainProps {}

const Main: React.FC<MainProps> = () => {
  const isLoggedIn = useSelector(getIsLoggedIn())
  if (isLoggedIn) {
    return <Navigate to={`/user`} />
  } else {
    return (
      <div className='container-fluid position-fixed top-0'>
        <div className='d-flex justify-content-center row align-items-center vh-100 overflow-hidden'>
          <Link
            to='/login'
            type='button'
            className='btn btn-outline-dark w-auto'
          >
            Войти в систему
          </Link>
        </div>
      </div>
    )
  }
}

export default Main
