import { commentsDate } from '../../../utils/dateFormat'
import { useSelector } from 'react-redux'
import { getCurrentUserId, getUserById } from '../../../redux/slices/users'
import config from '../../../config.json'

interface CommentProps {
  content: string
  created_at: string
  _id: string
  userId: string
  onRemove: any
}

const Comment = ({
  content,
  created_at: created,
  _id,
  userId,
  onRemove,
}: CommentProps) => {
  const currentUserId = useSelector(getCurrentUserId())
  const user = useSelector(getUserById(userId))

  return (
    <div className='bg-light card-body  mb-3'>
      <div className='row'>
        <div className='col'>
          <div className='d-flex flex-start '>
            <img
              src={
                user.avatar
                  ? `${config.REACT_APP_apiEndpoint}${user.avatar}`
                  : '/noavatar.png'
              }
              className='rounded-circle shadow-1-strong me-3'
              alt={user && user.name}
              width='65'
              height='65'
              style={{ objectFit: 'cover' }}
            />
            <div className='flex-grow-1 flex-shrink-1'>
              <div className='mb-4'>
                <div className='d-flex justify-content-between align-items-center'>
                  <p className='mb-1 '>
                    <b>{user && user.name}</b>

                    <span className='small'> - {commentsDate(created)}</span>
                  </p>
                  {currentUserId === userId && (
                    <button
                      className='btn btn-sm text-dark d-flex align-items-center'
                      onClick={() => onRemove(_id)}
                    >
                      <i className='bi bi-x-lg'></i>
                    </button>
                  )}
                </div>
                <p className='small mb-0'>{content}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Comment
