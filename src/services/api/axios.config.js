import axios from 'axios'
import { logger } from '../logger'

// Base URL cho production API
// Ưu tiên lấy từ biến môi trường, fallback về localhost hoặc URL mặc định
const BASE_URL = import.meta.env.VITE_API_URL || 'https://betestminiapp-production-9a0b.up.railway.app'

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
      config.headers['Authorization'] = 'Bearer tma ' + tg.initData
    }
    config.metadata = { startTime: Date.now() }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Response interceptor
apiClient.interceptors.response.use(
  (response) => {
    logger.apiResponse(response)
    return response.data
  },
  (error) => {
    // Log lỗi API
    logger.apiError(error.config, error)
    return Promise.reject(error)
  }
)

export default apiClient
