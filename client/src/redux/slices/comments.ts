//@ts-nocheck
import { IComment } from './../../models'
import { createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'
import commentService from '../../services/comment.service'
import httpService from '../../services/http.service'

export const fetchComments = createAsyncThunk(
  'comments/fetchComments',
  async (pageId) => {
    const { data } = await httpService.get('/comment', {
      params: {
        orderBy: 'pageId',
        equalTo: `${pageId}`,
      },
    })
    return data
  }
)

export const createComment = createAsyncThunk(
  'comments/createComment',
  async (payload) => {
    const { data } = await httpService.post('/comment/', payload)
    return data
  }
)

interface EntitiesDetailState {
  entities: IComment | null
  isLoading: boolean
  error: string | null
}

const initialState: EntitiesDetailState = {
  entities: null,
  isLoading: true,
  error: null,
}

const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    commentCreated: (state, action: PayloadAction<IComment>) => {
      state.entities.push(action.payload)
    },
    commentRemoved: (state, action) => {
      state.entities = state.entities.filter((c) => c._id !== action.payload)
    },
  },
  extraReducers: {
    [fetchComments.pending.type]: (state) => {
      state.entities = null
      state.isLoading = true
    },
    [fetchComments.fulfilled.type]: (state, action) => {
      state.entities = action.payload
      state.isLoading = false
    },
    [fetchComments.rejected.type]: (state) => {
      state.entities = null
      state.isLoading = false
    },
    [createComment.fulfilled.type]: (state, action) => {
      state.entities.push(action.payload)
      state.isLoading = false
    },
    [createComment.rejected.type]: (state, action) => {
      state.error = action.payload
      state.isLoading = false
    },
  },
})

const { reducer: commentsReducer, actions } = commentsSlice
const { commentRemoved } = actions

export const removeComment = (commentId: String) => async (dispatch) => {
  try {
    const { content } = await commentService.removeComment(commentId)
    if (!content) {
      dispatch(commentRemoved(commentId))
    }
  } catch (error) {
    dispatch(commentsRequestFailed(error.message))
  }
}
export const getComments = () => (state) => state.comments.entities

export const getCommentsLoadingStatus = () => (state) =>
  state.comments.isLoading

export default commentsReducer
