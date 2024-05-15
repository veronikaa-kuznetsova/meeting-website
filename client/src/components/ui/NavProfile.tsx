// @ts-nocheck

import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { getCurrentUserData, logOut } from '../../redux/slices/users'
import config from '../../config.json'

const NavProfile = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const currentUser = useSelector(getCurrentUserData())
  const [isOpen, setOpen] = useState(false)
  const toggleMenu = () => {
    setOpen((prevState) => !prevState)
  }

  const handleLogOut = () => {
    dispatch(logOut())
    navigate('/')
  }

  if (!currentUser) return 'Загрузка...'
  return (
    <div className='dropdown' onClick={toggleMenu}>
      <div className='btn d-flex align-items-center'>
        <img
          src={
            currentUser.avatar
              ? `${config.REACT_APP_apiEndpoint}${currentUser.avatar}`
              : '/noavatar.png'
          }
          alt={currentUser.name}
          height='40'
          width='40'
          style={{ objectFit: 'cover' }}
          className='img-responsive rounded-circle'
        />
      </div>
      <div
        className={
          'dropdown-menu dropdown-menu-start end-0' + (isOpen ? ' show' : '')
        }
      >
        <Link to={`/user/${currentUser._id}`} className='dropdown-item'>
          Профиль
        </Link>
        <Link to={`/user/${currentUser._id}/edit`} className='dropdown-item'>
          Редактировать
        </Link>
        <button onClick={handleLogOut} className='dropdown-item'>
          Выйти
        </button>
      </div>
    </div>
  )
}

export default NavProfile
