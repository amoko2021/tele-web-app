import { useCallback, useState, useEffect } from 'react'
import { renderTadsWidget } from 'react-tads-widget'
import { userApi } from '../services/api'
import { UI_TEXT } from '../config/uiText'
import { logger } from '../services/logger'

/**
 * Hook for Tads integration
 * @param {Object} options
 * @param {string} options.userId - Current user ID for rewards
 * @param {string} options.widgetId - Tads widget ID
 * @param {Function} [options.onReward] - Custom reward callback
 * @param {Function} [options.onError] - Error callback
 */
export function useTads({ userId, widgetId, onReward, onError }) {
  const [isWatching, setIsWatching] = useState(false)

  // Safety timeout to reset watching state if ad hangs
  useEffect(() => {
    let timeoutId
    if (isWatching) {
      timeoutId = setTimeout(() => {
        if (isWatching) {
          logger.warn('Tads ad timeout - resetting state', { userId, widgetId })
          setIsWatching(false)
        }
      }, 60000) // 60 seconds timeout
    }
    return () => {
      if (timeoutId) clearTimeout(timeoutId)
    }
  }, [isWatching, userId, widgetId])

  const rewardUser = useCallback(
    async (amount) => {
      if (!userId) return
      try {
        await userApi.updateBalance(userId, amount)
        // Use UI_TEXT for localized messages
        const message = UI_TEXT.home.alerts.rewardFromAd.replace('{amount}', amount)
        alert(message)
      } catch (error) {
        logger.error('Error updating balance after Tads ad:', error)
        const errorMessage = UI_TEXT.home.alerts.rewardUpdateError.replace('{amount}', amount)
        alert(errorMessage)
      }
    },
    [userId]
  )

  const showFullScreen = useCallback(
    async (rewardAmount = 0) => {
      if (!userId) {
        alert(UI_TEXT.home.alerts.noUser)
        return false
      }

      if (isWatching) return false

      setIsWatching(true)
      try {
        renderTadsWidget({
          id: widgetId,
          type: 'fullscreen',
          onShowReward: async () => {
            logger.info('Tads reward triggered', { userId, widgetId })
            if (onReward) {
              onReward()
            } else if (rewardAmount > 0) {
              await rewardUser(rewardAmount)
            }
            setIsWatching(false)
          },
          onAdsNotFound: () => {
            logger.warn('Tads ads not found', { userId, widgetId })
            alert(UI_TEXT.home.alerts.adUnavailable)
            setIsWatching(false)
            onError?.(new Error('Ads not found'))
          },
        })
        return true
      } catch (error) {
        logger.error('Error showing Tads fullscreen ad:', error)
        setIsWatching(false)
        onError?.(error)
        return false
      }
    },
    [userId, widgetId, isWatching, onReward, rewardUser, onError]
  )

  // Handlers for TadsWidget component usage
  const handleAdsNotFound = useCallback(() => {
    logger.warn('Tads ads not found (component)', { userId, widgetId })
    alert(UI_TEXT.home.alerts.adUnavailable)
    setIsWatching(false)
    onError?.(new Error('Ads not found'))
  }, [userId, widgetId, onError])

  const handleShowReward = useCallback(async (rewardAmount = 0) => {
    logger.info('Tads reward triggered (component)', { userId, widgetId })
    if (onReward) {
      onReward()
    } else if (rewardAmount > 0) {
      await rewardUser(rewardAmount)
    }
    setIsWatching(false)
  }, [userId, widgetId, onReward, rewardUser])

  return {
    showFullScreen,
    isWatching,
    handleAdsNotFound,
    handleShowReward,
  }
}
