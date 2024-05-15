import { configureStore } from '@reduxjs/toolkit'
import professionsReducer from './slices/professions'
import usersReducer from './slices/users'
import commentsReducer from './slices/comments'

const store = configureStore({
  reducer: {
    users: usersReducer,
    professions: professionsReducer,
    comments: commentsReducer,
  },
})

export default store
