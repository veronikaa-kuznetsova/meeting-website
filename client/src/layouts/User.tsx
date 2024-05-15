import { useSelector } from 'react-redux'
import UsersLoader from '../components/ui/hooks/UsersLoader'
import UserProfile from '../components/ui/UserProfile'
import { getCurrentUserId, getIsLoggedIn } from '../redux/slices/users'

const Users = () => {
  const currentUserId = useSelector(getCurrentUserId())
  const isLoggedIn = useSelector(getIsLoggedIn())

  if (isLoggedIn) {
    return (
      <>
        <UsersLoader>
          <div className='container d-flex justify-content-between align-items-start'>
            <UserProfile currentUserId={currentUserId} />
          </div>
        </UsersLoader>
      </>
    )
  } else {
    return <div>Загрузка...</div>
  }
}

export default Users
