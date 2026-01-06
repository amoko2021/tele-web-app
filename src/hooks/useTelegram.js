import { useEffect, useState } from 'react'
import { telegramAuthService } from '../services/telegram/telegramAuthService'

export const useTelegram = () => {
  const [tg] = useState(window.Telegram?.WebApp)
  const [isValidating, setIsValidating] = useState(false)
  const [validationData, setValidationData] = useState(null)
  const [validationError, setValidationError] = useState(null)

  useEffect(() => {
    tg?.ready()
    if (tg?.isExpanded) tg?.expand()
    tg?.requestFullscreen()

    // Validate init data khi component mount
    validateInitData()
  }, [tg])

  const validateInitData = async () => {
    if (!tg?.initData) {
      console.warn('No Telegram initData available')
      return
    }

    // Kiểm tra cache trước
    const cachedData = telegramAuthService.getCachedValidation()
    if (cachedData) {
      setValidationData(cachedData)
      console.log('Using cached validation data:', cachedData)
      return
    }

    // Nếu không có cache, gọi API
    setIsValidating(true)
    try {
      const result = await telegramAuthService.validateInitData(tg.initData)
      setValidationData(result)
      console.log('Validation successful:', result)
    } catch (error) {
      setValidationError(error)
      console.error('Validation failed:', error)
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
