// @ts-nocheck
import axios from 'axios'
import configFile from '../config.json'
import localStorageService from './localStorage.service'
import authService from './auth.service'

const http = axios.create({
  baseURL: configFile.REACT_APP_apiEndpoint,
})

http.interceptors.request.use(
  async function (config) {
    const expiresDate = localStorageService.getTokenExpiresDate()
    const refreshToken = localStorageService.getRefreshToken()

    if (refreshToken && expiresDate < Date.now()) {
      const data = await authService.refresh()

      localStorageService.setTokens({
        refreshToken: data.refreshToken,
        accessToken: data.accessToken,
        expiresIn: data.expiresIn,
        userId: data.userId,
      })
    }
    const accessToken = localStorageService.getAccessToken()
    if (accessToken) {
      config.headers = {
        ...config.headers,
        Authorization: `Bearer ${accessToken}`,
      }
    }
    return config
  },
  function (error) {
    return Promise.reject(error)
  }
)

http.interceptors.response.use(
  (res) => {
    return res
  },
  function (error) {
    const expectedErrors =
      error.response &&
      error.response.status >= 400 &&
      error.response.status < 500

    if (!expectedErrors) {
      console.log(error)
      alert('Something was wrong. Try it later')
    }
    return Promise.reject(error)
  }
)
const httpService = {
  get: http.get,
  post: http.post,
  put: http.put,
  delete: http.delete,
  patch: http.patch,
}
export default httpService
