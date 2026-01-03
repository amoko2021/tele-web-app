import axios from 'axios'

// Base URL cho production API
const BASE_URL = 'https://betestminiapp-production.up.railway.app'

// Tạo axios instance
const apiClient = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Request interceptor
apiClient.interceptors.request.use(
  (config) => {
    // Có thể thêm token vào header ở đây
    // const token = localStorage.getItem('token')
    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`
    // }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Response interceptor
apiClient.interceptors.response.use(
  (response) => {
    return response.data
  },
  (error) => {
    // Xử lý lỗi ở đây
    if (error.response) {
      console.error('API Error:', error.response.data)
    }
    return Promise.reject(error)
  }
)

export default apiClient
