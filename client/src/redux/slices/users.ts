//@ts-nocheck
import { createAction, createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import authService from '../../services/auth.service'
import localStorageService from '../../services/localStorage.service'
import { generateAuthError } from '../../utils/generateAuthError'
import httpService from '../../services/http.service'

export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
  const { data } = await httpService.get('/user')
  return data
})

export const updateUser = createAsyncThunk(
  'users/updateUser',
  async (payload) => {
    const { data } = await httpService.patch(
      '/user/' + localStorageService.getUserId(),
      payload
    )
    return data
  }
)

export const followUser = createAsyncThunk(
  'users/followUser',
  async (payload) => {
    const { data } = await httpService.put('/user/' + payload, {
      currentUserId,
    })
    return data
  }
)
export const unfollowUser = createAsyncThunk(
  'users/unfollowUser',
  async (payload) => {
    const { data } = await httpService.put('/user/' + payload, {
      currentUserId,
    })
    return data
  }
)

const initialState = localStorageService.getAccessToken()
  ? {
      entities: null,
      isLoading: true,
      error: null,
      auth: { userId: localStorageService.getUserId() },
      isLoggedIn: true,
      dataLoaded: false,
    }
  : {
      entities: null,
      isLoading: false,
      error: null,
      auth: null,
      isLoggedIn: false,
      dataLoaded: false,
    }

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    authRequestSuccess: (state, action) => {
      state.auth = action.payload
      state.isLoggedIn = true
    },
    authRequestFailed: (state, action) => {
      state.error = action.payload
    },
    userLoggedOut: (state) => {
      state.entities = null
      state.isLoggedIn = false
      state.auth = null
      state.dataLoaded = false
    },
    authRequested: (state) => {
      state.error = null
    },
  },
  extraReducers: {
    [fetchUsers.pending.type]: (state) => {
      state.isLoading = true
    },
    [fetchUsers.fulfilled.type]: (state, action) => {
      state.entities = action.payload
      state.dataLoaded = true
      state.isLoading = false
    },
    [fetchUsers.rejected.type]: (state, action) => {
      state.error = action.payload
      state.isLoading = false
    },
    [updateUser.fulfilled.type]: (state, action) => {
      state.entities[
        state.entities.findIndex(
          (u: { _id: any }) => u._id === action.payload._id
        )
      ] = action.payload
      state.isLoading = false
    },
    [updateUser.rejected.type]: (state, action) => {
      state.error = action.payload
      state.isLoading = false
    },
  },
})

const { reducer: usersReducer, actions } = usersSlice
const { authRequestSuccess, authRequestFailed, userLoggedOut } = actions

const authRequested = createAction('users/authRequested')

export const login =
  ({ payload }) =>
  async (dispatch: (arg0: { payload: any; type: string }) => void) => {
    const { email, password } = payload
    dispatch(authRequested())
    try {
      const data = await authService.login({ email, password })
      localStorageService.setTokens(data)
      dispatch(authRequestSuccess({ userId: data.userId }))
    } catch (error) {
      const { code, message } = error.response.data.error
      if (code === 400) {
        const errorMessage = generateAuthError(message)
        dispatch(authRequestFailed(errorMessage))
      } else {
        dispatch(authRequestFailed(error.message))
      }
    }
  }

export const signUp =
  (payload: Object) =>
  async (dispatch: (arg0: { payload: any; type: string }) => void) => {
    dispatch(authRequested())
    try {
      const data = await authService.register(payload)
      localStorageService.setTokens(data)
      dispatch(authRequestSuccess({ userId: data.userId }))
    } catch (error) {
      dispatch(authRequestFailed(error.message))
    }
  }

export const logOut = () => (dispatch) => {
  localStorageService.removeAuthData()
  dispatch(userLoggedOut())
}

export const getUsersList = () => (state) => state.users.entities
export const getCurrentUserData = () => (state) => {
  return state.users.entities
    ? state.users.entities.find((u) => u._id === state.users.auth.userId)
    : null
}

export const getUserById = (userId) => (state) => {
  if (state.users.entities) {
    return state.users.entities.find((u) => u._id === userId)
  }
}

export const getIsLoggedIn = () => (state) => state.users.isLoggedIn
export const getDataStatus = () => (state) => state.users.dataLoaded
export const getUsersLoadingStatus = () => (state) => state.users.isLoading
export const getCurrentUserId = () => (state) => state.users.auth.userId

export const getAuthErrors = () => (state) => state.users.error

export default usersReducer
