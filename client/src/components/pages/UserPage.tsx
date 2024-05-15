import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { getUserById } from '../../redux/slices/users'
import config from '../../config.json'
import Profession from '../ui/Profession'
import Comments from '../ui/Comments'

interface UserPageProps {}

const UserPage: React.FC<UserPageProps> = () => {
  const { userId } = useParams()
  const user = useSelector(getUserById(userId))

  if (user) {
    return (
      <div className='container flex-column align-items-start'>
        <div className='m-3'>
          <div className='card-body'>
            <div className='d-flex flex-column align-items-center text-center position-relative'>
              <img
                src={
                  user.avatar
                    ? `${config.REACT_APP_apiEndpoint}${user.avatar}`
                    : '/noavatar.png'
                }
                className='rounded-circle img-responsive'
                width='150'
                height='150'
                style={{ objectFit: 'cover' }}
              />
              <div className='m-2'>
                <h4>{user.name}</h4>
                <p className='text-secondary mb-1'>Пол: {user.sex}</p>
                <Profession id={user.profession} />
              </div>
            </div>
          </div>
        </div>
        <div className='d-flex flex-column m-3'>
          <Comments />
        </div>
      </div>
    )
  } else {
    return <h2>Загрузка...</h2>
  }
}

export default UserPage
