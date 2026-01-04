import axios from 'axios'

// Base URL cho production API
const BASE_URL = 'https://betestminiapp-production-9a0b.up.railway.app'

// Tạo axios instance
const apiClient = axios.create({
  baseURL: BASE_URL,
  timeout: 5000, // Giảm timeout xuống 5 giây
  headers: {
    'Content-Type': 'application/json',
  },
})

// Request interceptor
apiClient.interceptors.request.use(
  (config) => {
    // Thêm Telegram initData vào header để authentication
    const tg = window.Telegram?.WebApp
    if (tg?.initData) {
      config.headers['X-Telegram-Init-Data'] = tg.initData
    }
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
