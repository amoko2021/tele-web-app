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

    // Kiểm tra cache trước
    const cachedData = telegramAuthService.getCachedValidation()
    if (cachedData) {
      setValidationData(cachedData)
      logger.info('Using cached validation data', cachedData)
      logger.validation('success', { cached: true })
      return
    }

    // Nếu không có cache, gọi API
    setIsValidating(true)
    try {
      const result = await telegramAuthService.validateInitData(tg.initData)
      setValidationData(result)
      logger.info('Validation successful', result)
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
