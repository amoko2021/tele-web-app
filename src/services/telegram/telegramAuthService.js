import axios from 'axios'

const VALIDATE_URL = 'https://betestminiapp-production.up.railway.app/validate'
const CACHE_KEY = 'telegram_validation_data'
const CACHE_DURATION = 24 * 60 * 60 * 1000 // 24 hours

export const telegramAuthService = {
  // Lấy cached validation data
  getCachedValidation: () => {
    try {
      const cached = localStorage.getItem(CACHE_KEY)
      if (!cached) return null

      const { data, timestamp } = JSON.parse(cached)
      const isExpired = Date.now() - timestamp > CACHE_DURATION

      if (isExpired) {
        localStorage.removeItem(CACHE_KEY)
        return null
      }

      return data
    } catch (error) {
      console.error('Error reading cache:', error)
      return null
    }
  },

  // Lưu validation data vào cache
  setCachedValidation: (data) => {
    try {
      const cacheData = {
        data,
        timestamp: Date.now(),
      }
      localStorage.setItem(CACHE_KEY, JSON.stringify(cacheData))
    } catch (error) {
      console.error('Error saving cache:', error)
    }
  },

  // Xóa cache
  clearCache: () => {
    localStorage.removeItem(CACHE_KEY)
  },

  // Validate initData với server
  validateInitData: async (initData) => {
    try {
      const response = await axios.post(
        VALIDATE_URL,
        { initData },
        {
          headers: { 'Content-Type': 'application/json' },
        }
      )

      // Lưu vào cache
      if (response.data) {
        telegramAuthService.setCachedValidation(response.data)
      }

      return response.data
    } catch (error) {
      console.error('Error validating init data:', error)
      throw error
    }
  },

  // Lấy Telegram WebApp instance
  getTelegramWebApp: () => {
    return window.Telegram?.WebApp
  },

  // Lấy init data
  getInitData: () => {
    const tg = window.Telegram?.WebApp
    return {
      initData: tg?.initData || '',
      initDataUnsafe: tg?.initDataUnsafe || {},
    }
  },
}

export default telegramAuthService
