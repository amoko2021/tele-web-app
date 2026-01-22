import { useCallback, useState, useMemo, useEffect, useRef } from 'react'
import { userApi } from '../services/api'
import createAdHandler from 'monetag-tg-sdk'
import { useAdsgram } from './useAdsgram'
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

export function useMonetag({ userId, zoneId, onReward, onError, type }) {
  const [monetagWatching, setMonetagWatching] = useState(false)
  const [adsgramWatching, setAdsgramWatching] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [adReady, setAdReady] = useState(false)
  const rewardAmountRef = useRef(0)

  // Handler for Adsgram reward
  const handleAdsgramReward = useCallback(async () => {
    const rewardAmount = rewardAmountRef.current
    if (rewardAmount > 0 && userId) {
      try {
        await userApi.updateBalance(userId, rewardAmount)
      } catch (error) {
        console.error('Error updating balance:', error)
        alert(
          UI_TEXT.home.alerts.rewardUpdateError.replace(
            '{amount}',
            rewardAmount
          )
        )
      }
    }
    onReward?.()
  }, [userId, onReward])

  // Initialize Adsgram for fallback
  const showAdsgram = useAdsgram({
    blockId: '20539',
    fallbackBlockId: '20540',
    onReward: handleAdsgramReward,
    onError: (err) => {
      console.error('Adsgram fallback failed', err)
      onError?.(err)
    },
  })

  // Wrapper to track Adsgram watching state
  const showAdsgramWrapped = useCallback(async () => {
    if (adsgramWatching) return
    setAdsgramWatching(true)
    try {
      await showAdsgram()
    } finally {
      setAdsgramWatching(false)
    }
  }, [showAdsgram, adsgramWatching])

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

      // Store reward amount for fallback
      rewardAmountRef.current = rewardAmount

      // Fallback to Adsgram if Monetag handler is missing
      if (!adHandler) {
        console.warn('Monetag handler missing, falling back to Adsgram')
        alert(UI_TEXT.home.alerts.monetagFallback)
        await showAdsgramWrapped()
        return true
      }

      setMonetagWatching(true)
      setIsLoading(true)

      // Helper for fallback execution
      const executeFallback = async (reason) => {
        console.warn(
          'Monetag ad unavailable/failed, executing fallback. Reason:',
          reason
        )

        // CRITICAL: Reset Monetag watching state BEFORE starting Adsgram
        setMonetagWatching(false)
        setIsLoading(false)
        setAdReady(false) // Ensure we try fresh next time

        try {
          await showAdsgramWrapped()
        } catch (adsgramError) {
          console.error('Adsgram fallback also failed', adsgramError)
          if (onError) onError(adsgramError)
        }
      }

      try {
        // 1. Preload/Check availability (only if not already ready)
        if (!adReady) {
          try {
            // Reduced timeout to 4s to avoid losing "user interaction" token for fallback
            await withTimeout(adHandler({ type: 'preload', ymid }), 4000) 
            setAdReady(true)
          } catch (preloadError) {
            await executeFallback(preloadError)
            return true
          }
        }

          // 2. Show Ad
        try {
          setIsLoading(false) // Stop loading before showing ad
          await withTimeout(adHandler({ ymid, ...(type ? { type } : {}) }))
          // Reset ready state after showing
          setAdReady(false)
        } catch (showError) {
          // If show fails, it might be because the preloaded ad expired or failed.
          await executeFallback(showError)
          return true
        }

        // 3. Success - Reward User
        try {
          await userApi.updateBalance(userId, rewardAmount)
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
        return true
      } finally {
        // Ensure this is reset in case we didn't go through fallback
        setMonetagWatching(false)
        setIsLoading(false)
      }
    },
    [userId, onReward, adHandler, showAdsgramWrapped, onError, adReady]
  )

  const handleWatchAds = useCallback(
    async (rewardAmount) => {
      if (monetagWatching || adsgramWatching) return false

      const ymid = getYmid()
      return await showMonetagAd(ymid, rewardAmount)
    },
    [monetagWatching, adsgramWatching, showMonetagAd, getYmid]
  )

  return {
    handleWatchAds,
    watchingAds: monetagWatching || adsgramWatching,
    isLoading, // Export isLoading state
    adReady,
    preloadAd,
  }
}
