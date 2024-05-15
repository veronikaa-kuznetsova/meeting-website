// @ts-nocheck

import { orderBy } from 'lodash'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import {
  createComment,
  fetchComments,
  getComments,
  getCommentsLoadingStatus,
  removeComment,
} from '../../redux/slices/comments'
import AddCommentForm from '../common/comments/AddCommentForm'
import CommentsList from '../common/comments/CommentsList'

interface CommentsProps {}

const Comments: React.FC<CommentsProps> = () => {
  const { userId } = useParams()
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchComments(userId))
  }, [userId, dispatch])
  const isLoading = useSelector(getCommentsLoadingStatus())
  const comments = useSelector(getComments())

  const handleSubmit = (data: React.SyntheticEvent) => {
    dispatch(createComment({ ...data, pageId: userId }))
  }
  const handleRemoveComment = (id: String) => {
    if (window.confirm('Удалить комментарий?')) {
      dispatch(removeComment(id))
    }
  }
  const sortedComments = orderBy(comments, ['created_at'], ['desc'])

  return (
    <>
      <div className='card mb-4'>
        <div className='card-body '>
          <AddCommentForm onSubmit={handleSubmit} />
        </div>
      </div>
      {sortedComments.length > 0 && (
        <div className='card mb-3'>
          <div className='card-body '>
            {!isLoading ? (
              <CommentsList
                comments={sortedComments}
                onRemove={handleRemoveComment}
              />
            ) : (
              <p>Загрузка...</p>
            )}
          </div>
        </div>
      )}
    </>
  )
}

export default Comments
