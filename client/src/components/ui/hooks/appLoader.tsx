// @ts-nocheck

import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchProfessions } from '../../../redux/slices/professions'
import {
  fetchUsers,
  getIsLoggedIn,
  getUsersLoadingStatus,
} from '../../../redux/slices/users'

const AppLoader = ({ children }) => {
  const dispatch = useDispatch()
  const isLoggedIn = useSelector(getIsLoggedIn())
  const usersStatusLoading = useSelector(getUsersLoadingStatus())
  useEffect(() => {
    dispatch(fetchProfessions())
    if (isLoggedIn) {
      dispatch(fetchUsers())
    }
  }, [isLoggedIn])
  if (usersStatusLoading) return <p>Загрузка...</p>
  return children
}

export default AppLoader
