import axios from 'axios'
import { baseUrl } from './config'

const createInstance = (accessToken) => axios.create({
  baseURL: baseUrl,
  timeout: 8000,
  headers: {'authorization': `bearer ${accessToken}`}
})

const logoutOnTokenExpiry = (error, authentication) => {
  if (error.response.data.statusCode === 401) {
    return authentication.logout()
  }
  return Promise.reject(error);
};

const createRequest = (authentication) => {
  const axios = createInstance(authentication.accessToken)
  axios.interceptors.response.use(
    (response) => response,
    (error) => {
      return logoutOnTokenExpiry(error, authentication);
    }
  )

  return axios
}

export { createRequest }