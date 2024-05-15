//@ts-nocheck
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import httpService from '../../services/http.service'

export const fetchProfessions = createAsyncThunk(
  'professions/fetchProfessions',
  async () => {
    const { data } = await httpService.get('/profession')
    return data
  }
)

const professionsSlice = createSlice({
  name: 'professions',
  initialState: {
    entities: null,
    isLoading: true,
    error: null,
  },
  reducers: {},
  extraReducers: {
    [fetchProfessions.pending.type]: (state) => {
      state.entities = null
      state.isLoading = true
    },
    [fetchProfessions.fulfilled.type]: (state, action) => {
      state.entities = action.payload
      state.isLoading = false
    },
    [fetchProfessions.rejected.type]: (state) => {
      state.entities = null
      state.isLoading = false
    },
  },
})

const { reducer: professionsReducer } = professionsSlice

export const getProfessions = () => (state) => state.professions.entities
export const getProfessionsLoadingStatus = () => (state) =>
  state.professions.isLoading
export const getProfessionById = (id) => (state) => {
  if (state.professions.entities) {
    return state.professions.entities.find((p) => p._id === id)
  }
}

export default professionsReducer
