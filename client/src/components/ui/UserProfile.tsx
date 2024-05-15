import React from 'react'
import { useSelector } from 'react-redux'
import { getUserById } from '../../redux/slices/users'
import config from '../../config.json'
import Profession from './Profession'

interface UserProfileProps {
  currentUserId: string
}

const UserProfile: React.FC<UserProfileProps> = ({ currentUserId }) => {
  const user = useSelector(getUserById(currentUserId))

  return (
    <div className='card m-3'>
      <div className='card-body'>
        <div className='align-items-center text-center'>
          <img
            src={
              user.avatar
                ? `${config.REACT_APP_apiEndpoint}${user.avatar}`
                : 'noavatar.png'
            }
            className='rounded-circle img-responsive'
            width='150'
            height='150'
            style={{ objectFit: 'cover' }}
          />
          <div className='mt-3'>
            <h4>{user.name}</h4>
            <Profession id={user.profession} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserProfile
