import React, { useState, useEffect } from 'react'
import _ from 'lodash'
import UserCard from './UserCard'
import { useSelector } from 'react-redux'
import { getCurrentUserId, getUsersList } from '../../redux/slices/users'
import { paginate } from '../../utils/paginate'
import Pagination from '../common/Pagination'
import { IUser } from '../../models'

interface UsersListProps {}

const UsersList: React.FC<UsersListProps> = () => {
  const users = useSelector(getUsersList())

  const [currentPage, setCurrentPage] = useState<number>(1)
  const [searchQuery, setSearchQuery] = useState<string>('')
  const pageSize = 4

  useEffect(() => {
    setCurrentPage(1)
  }, [searchQuery])

  const handleSearchQuery = ({
    target,
  }: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(target.value)
  }

  const handlePageChange = (pageIndex: number) => {
    setCurrentPage(pageIndex)
  }
  const currentUserId = useSelector(getCurrentUserId())

  if (users) {
    const filterUsers = (users: IUser[]) => {
      const filteredUsers = searchQuery
        ? users.filter(
            (user) =>
              user.name.toLowerCase().indexOf(searchQuery.toLowerCase()) !== -1
          )
        : users
      return filteredUsers.filter((u) => u._id !== currentUserId)
    }
    const filteredUsers = filterUsers(users)
    const count = filteredUsers.length
    const sortedUsers = _.orderBy(filteredUsers)
    const usersCrop = paginate(sortedUsers, currentPage, pageSize)

    return (
      <div className='container mt-5'>
        <form className='d-flex m-4' role='search'>
          <input
            className='form-control'
            type='search'
            placeholder='Search...'
            aria-label='Search'
            name='searchQuery'
            onChange={handleSearchQuery}
            value={searchQuery}
          />
        </form>
        <div className='d-flex flex-column flex-shrink-1'>
          <div className='m-3'>
            {usersCrop.map((user) => (
              <UserCard key={user._id} user={user} />
            ))}
          </div>
        </div>
        <div className='d-flex justify-content-center'>
          <Pagination
            itemsCount={count}
            pageSize={pageSize}
            currentPage={currentPage}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
    )
  } else {
    return <p>Загрузка...</p>
  }
}

export default UsersList
