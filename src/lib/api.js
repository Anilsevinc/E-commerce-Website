import axios from 'axios'

export const api = axios.create({
  baseURL: 'https://workintech-fe-ecommerce.onrender.com',
})

export function setApiAuthToken(token) {
  if (!token) {
    delete api.defaults.headers.common.Authorization
    return
  }
  api.defaults.headers.common.Authorization = token
}

