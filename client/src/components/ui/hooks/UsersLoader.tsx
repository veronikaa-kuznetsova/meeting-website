//@ts-nocheck
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchUsers, getDataStatus } from '../../../redux/slices/users'

const UsersLoader = ({ children }) => {
  const dataStatus = useSelector(getDataStatus())
  const dispatch = useDispatch()

  useEffect(() => {
    if (!dataStatus) {
      return dispatch(fetchUsers())
    }
  }, [dataStatus])
  if (!dataStatus) return <p>Загрузка...</p>
  return children
}

export default UsersLoader
