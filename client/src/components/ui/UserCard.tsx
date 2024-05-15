import React from 'react'
import { Link } from 'react-router-dom'
import { IUser } from '../../models'
import config from '../../config.json'
import Profession from './Profession'

interface UserCardProps {
  user: IUser
}

const UserCard: React.FC<UserCardProps> = ({ user }) => {
  return (
    <li className='list-group-item'>
      <div className='d-flex justify-content-between align-items-center border border-secondary rounded mb-3 p-2'>
        <Link to={`/user/${user._id}`} className='mr-4'>
          <img
            src={
              user.avatar
                ? `${config.REACT_APP_apiEndpoint}${user.avatar}`
                : '/noavatar.png'
            }
            alt={user.name}
            className='rounded-circle img-responsive'
            width='80'
            height='80'
            style={{ objectFit: 'cover' }}
          />
        </Link>
        <div className='d-flex flex-column flex-grow-1 px-4'>
          <Link to={`/user/${user._id}`}>
            <h5 className='card-title'>{user.name}</h5>
          </Link>
          <Profession id={user.profession} />
        </div>
      </div>
    </li>
  )
}

export default UserCard
