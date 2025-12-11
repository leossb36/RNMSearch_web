import axios from 'axios'

const getApiBaseUrl = () => {
  if (globalThis.window !== undefined) {
    return '/api'
  }
  return process.env.API_BASE_URL || 'http://localhost:3001/api'
}

export const Api = axios.create({
  baseURL: getApiBaseUrl(),
})
