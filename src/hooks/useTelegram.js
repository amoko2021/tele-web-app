import { useEffect, useState } from 'react'
import { telegramAuthService } from '../services/telegram/telegramAuthService'
import { logger } from '../services/logger'

export const useTelegram = () => {
  const [tg] = useState(window.Telegram?.WebApp)
  const [isValidating, setIsValidating] = useState(false)
  const [validationData, setValidationData] = useState(null)
  const [validationError, setValidationError] = useState(null)

  useEffect(() => {
    if (!tg) {
      logger.error('Telegram WebApp not available', null, { 
        hasWindow: !!window.Telegram,
        hasWebApp: !!window.Telegram?.WebApp 
      })
      logger.telegramInit('failed', { reason: 'telegram_webapp_not_available' })
      return
    }

    try {
      tg?.ready()
      logger.telegramInit('success', { 
        platform: tg.platform,
        version: tg.version 
      })
    } catch (error) {
      logger.error('Telegram WebApp ready failed', error)
      logger.telegramInit('failed', { error: error.message })
    }

    //tg?.requestFullscreen()

    // Validate init data khi component mount
    validateInitData()
  }, [tg])

  const validateInitData = async () => {
    if (!tg?.initData) {
      logger.warn('No Telegram initData available', { hasTg: !!tg })
      logger.telegramInit('failed', { reason: 'no_init_data' })
      return
    }

    const currentUserId = tg?.initDataUnsafe?.user?.id

    // Kiểm tra cache trước
    const cachedData = telegramAuthService.getCachedValidation()
    if (cachedData) {
      // Double check: Verify cached user ID matches current user
      const cachedUserId = cachedData?.data?.user?.id || cachedData?.user?.id
      
      if (cachedUserId && cachedUserId !== currentUserId) {
        logger.warn('Cached user ID mismatch, forcing revalidation', {
          cached: cachedUserId,
          current: currentUserId,
        })
        // Clear cache và force revalidate
        telegramAuthService.clearCache()
      } else {
        setValidationData(cachedData)
        logger.info('Using cached validation data', { userId: currentUserId })
        logger.validation('success', { cached: true })
        return
      }
    }

    // Nếu không có cache hoặc user khác, gọi API
    setIsValidating(true)
    try {
      const result = await telegramAuthService.validateInitData(tg.initData)
      setValidationData(result)
      logger.info('Validation successful', { userId: currentUserId })
      logger.validation('success', { cached: false })
    } catch (error) {
      setValidationError(error)
      logger.error('Validation failed', error, { 
        hasInitData: !!tg?.initData 
      })
      logger.validation('failed', { error: error.message })
    } finally {
      setIsValidating(false)
    }
  }

  return {
    tg,
    user: tg?.initDataUnsafe?.user,
    initDataUnsafe: tg?.initDataUnsafe,
    closeApp: () => tg?.close(),
    isValidating,
    validationData,
    validationError,
    revalidate: validateInitData,
  }
}
