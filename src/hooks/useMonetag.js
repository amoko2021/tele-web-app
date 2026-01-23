import { useCallback, useState, useMemo, useEffect } from 'react'
import { userApi } from '../services/api'
import createAdHandler from 'monetag-tg-sdk'
import { UI_TEXT } from '../config/uiText'

// Helper to add timeout to promises
const withTimeout = (promise, ms = 15000) => {
  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => {
      reject(new Error('Ad operation timed out'))
    }, ms)

    promise
      .then((res) => {
        clearTimeout(timer)
        resolve(res)
      })
      .catch((err) => {
        clearTimeout(timer)
        reject(err)
      })
  })
}

export function useMonetag({
  userId,
  zoneId,
  onReward,
  onError,
  type,
  isPrediction,
}) {
  const [monetagWatching, setMonetagWatching] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [adReady, setAdReady] = useState(false)

  // Memoize the ad handler to avoid recreation on every render
  const adHandler = useMemo(() => {
    if (!zoneId) return null
    return createAdHandler(zoneId)
  }, [zoneId])

  // Helper to get consistent ymid
  const getYmid = useCallback(() => {
    const baseId = userId?.toString() || 'guest-user'
    return `${baseId}-${Date.now()}`
  }, [userId])

  // Auto-preload on mount or when dependencies change
  useEffect(() => {
    if (!adHandler) return

    const ymid = getYmid()
    // Preload silently
    adHandler({ type: 'preload', ymid })
      .then(() => {
        setAdReady(true)
      })
      .catch((error) => {
        console.warn('Monetag auto-preload failed:', error)
        setAdReady(false)
      })
  }, [adHandler, getYmid])

  const preloadAd = useCallback(
    async (ymid) => {
      if (!adHandler) {
        console.warn('Monetag SDK not available or zoneId not set')
        return false
      }

      try {
        setIsLoading(true)
        await withTimeout(adHandler({ type: 'preload', ymid }))
        setAdReady(true)
        return true
      } catch (error) {
        console.error('Monetag preload error:', error)
        setAdReady(false)
        return false
      } finally {
        setIsLoading(false)
      }
    },
    [adHandler]
  )

  const showMonetagAd = useCallback(
    async (ymid, rewardAmount) => {
      if (!userId) {
        alert(UI_TEXT.home.alerts.noUser)
        return false
      }

      // Check handler
      if (!adHandler) {
        console.warn('Monetag handler missing')
        alert(UI_TEXT.home.alerts.adUnavailable)
        return false
      }

      setMonetagWatching(true)
      setIsLoading(true)

      // Helper for fallback execution (now just alert)
      const executeFallback = async (reason) => {
        console.warn(
          'Monetag ad unavailable/failed. Reason:',
          reason
        )

        setMonetagWatching(false)
        setIsLoading(false)
        setAdReady(false) // Ensure we try fresh next time
        
        alert(UI_TEXT.home.alerts.adUnavailable)
        if (onError) onError(reason)
      }

      try {
        // 1. Preload/Check availability (only if not already ready)
        if (!adReady) {
          try {
            // Reduced timeout to 4s
            await withTimeout(adHandler({ type: 'preload', ymid }), 4000) 
            setAdReady(true)
          } catch (preloadError) {
            await executeFallback(preloadError)
            return false
          }
        }

          // 2. Show Ad
        try {
          setIsLoading(false) // Stop loading before showing ad
          await withTimeout(adHandler({ ymid, ...(type ? { type } : {}) }))
          // Reset ready state after showing
          setAdReady(false)
        } catch (showError) {
          await executeFallback(showError)
          return false
        }

        // 3. Success - Reward User
        try {
          await userApi.updateBalance(userId, rewardAmount)

          if (isPrediction) {
            if (window.Telegram?.WebApp?.showAlert) {
              window.Telegram.WebApp.showAlert(UI_TEXT.home.alerts.rewardPrediction)
            } else {
              alert(UI_TEXT.home.alerts.rewardPrediction)
            }
          }

          onReward?.()
        } catch (rewardError) {
          console.error('Error updating balance:', rewardError)
          alert(
            UI_TEXT.home.alerts.rewardUpdateError.replace('{amount}', rewardAmount)
          )
        }

        return true
      } catch (error) {
        // Catch-all for unexpected errors
        console.error('Unexpected error in showMonetagAd:', error)
        await executeFallback(error)
        return false
      } finally {
        setMonetagWatching(false)
        setIsLoading(false)
      }
    },
    [userId, onReward, adHandler, onError, adReady, isPrediction, type]
  )

  const handleWatchAds = useCallback(
    async (rewardAmount) => {
      if (monetagWatching) return false

      const ymid = getYmid()
      return await showMonetagAd(ymid, rewardAmount)
    },
    [monetagWatching, showMonetagAd, getYmid]
  )

  return {
    handleWatchAds,
    watchingAds: monetagWatching,
    isLoading,
    adReady,
    preloadAd,
  }
}
