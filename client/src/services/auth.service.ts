import { IUser } from './../models'
import axios from 'axios'
import localStorageService from './localStorage.service'
import config from '../config.json'

const httpAuth = axios.create({
  baseURL: config.REACT_APP_apiEndpoint + '/auth/',
})

const authService = {
  register: async (payload: Object) => {
    const { data } = await httpAuth.post(`signUp`, payload)
    return data
  },
  login: async ({ email, password }: IUser) => {
    const { data } = await httpAuth.post(`signInWithPassword`, {
      email,
      password,
      returnSecureToken: true,
    })
    return data
  },
  refresh: async () => {
    const { data } = await httpAuth.post('token', {
      grant_type: 'refresh_token',
      refresh_token: localStorageService.getRefreshToken(),
    })
    return data
  },
}

export default authService
