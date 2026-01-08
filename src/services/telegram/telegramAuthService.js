import axios from 'axios'
import { logger } from '../logger'

const VALIDATE_URL = 'https://betestminiapp-production-9a0b.up.railway.app/validate'
const CACHE_KEY_PREFIX = 'telegram_validation_data'
const CACHE_DURATION = 24 * 60 * 60 * 1000 // 24 hours
const CURRENT_USER_KEY = 'telegram_current_user_id'

export const telegramAuthService = {
  // Helper để lấy cache key theo user
  _getCacheKey: (userId) => {
    return `${CACHE_KEY_PREFIX}_${userId}`
  },

  // Lấy cached validation data
  getCachedValidation: () => {
    try {
      const tg = window.Telegram?.WebApp
      const currentUserId = tg?.initDataUnsafe?.user?.id
      
      if (!currentUserId) {
        logger.warn('No user ID available for cache lookup')
        return null
      }

      // Kiểm tra xem user có thay đổi không
      const lastUserId = localStorage.getItem(CURRENT_USER_KEY)
      if (lastUserId && lastUserId !== String(currentUserId)) {
        // User đã thay đổi, clear tất cả cache cũ
        logger.info('User changed, clearing old cache', { 
          oldUserId: lastUserId, 
          newUserId: currentUserId 
        })
        telegramAuthService.clearAllCache()
      }

      // Cập nhật current user
      localStorage.setItem(CURRENT_USER_KEY, String(currentUserId))

      const cacheKey = telegramAuthService._getCacheKey(currentUserId)
      const cached = localStorage.getItem(cacheKey)
      if (!cached) return null

      const { data, timestamp, userId } = JSON.parse(cached)
      
      // Kiểm tra userId trong cache có khớp không (double check)
      if (userId !== currentUserId) {
        logger.warn('Cache user ID mismatch', { cached: userId, current: currentUserId })
        localStorage.removeItem(cacheKey)
        return null
      }

      const isExpired = Date.now() - timestamp > CACHE_DURATION

      if (isExpired) {
        localStorage.removeItem(cacheKey)
        return null
      }

      return data
    } catch (error) {
      logger.error('Error reading cache', error)
      return null
    }
  },

  // Lưu validation data vào cache
  setCachedValidation: (data) => {
    try {
      const tg = window.Telegram?.WebApp
      const currentUserId = tg?.initDataUnsafe?.user?.id
      
      if (!currentUserId) {
        logger.warn('No user ID available for caching')
        return
      }

      const cacheKey = telegramAuthService._getCacheKey(currentUserId)
      const cacheData = {
        data,
        timestamp: Date.now(),
        userId: currentUserId, // Lưu userId để verify sau
      }
      localStorage.setItem(cacheKey, JSON.stringify(cacheData))
      localStorage.setItem(CURRENT_USER_KEY, String(currentUserId))
      
      logger.info('Cached validation data', { userId: currentUserId })
    } catch (error) {
      logger.error('Error saving cache', error)
    }
  },

  // Xóa cache của user hiện tại
  clearCache: () => {
    try {
      const tg = window.Telegram?.WebApp
      const currentUserId = tg?.initDataUnsafe?.user?.id
      
      if (currentUserId) {
        const cacheKey = telegramAuthService._getCacheKey(currentUserId)
        localStorage.removeItem(cacheKey)
      }
      
      // Không xóa CURRENT_USER_KEY để có thể detect user change
    } catch (error) {
      logger.error('Error clearing cache', error)
    }
  },

  // Xóa tất cả cache (dùng khi user thay đổi)
  clearAllCache: () => {
    try {
      // Xóa tất cả các key bắt đầu với CACHE_KEY_PREFIX
      Object.keys(localStorage).forEach(key => {
        if (key.startsWith(CACHE_KEY_PREFIX)) {
          localStorage.removeItem(key)
        }
      })
      logger.info('Cleared all validation cache')
    } catch (error) {
      logger.error('Error clearing all cache', error)
    }
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
      logger.error('Error validating init data', error, { 
        url: VALIDATE_URL,
        hasInitData: !!initData 
      })
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
