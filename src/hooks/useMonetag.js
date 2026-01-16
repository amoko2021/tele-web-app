import { useCallback, useState, useMemo, useEffect } from 'react'
import { userApi } from '../services/api'
import createAdHandler from 'monetag-tg-sdk'
import { useSonarAds } from './useSonarAds'
import { UI_TEXT } from '../config/uiText'

export function useMonetag({ userId, zoneId, onReward, onError }) {
  const [monetagWatching, setMonetagWatching] = useState(false)
  const [adReady, setAdReady] = useState(false)

  // Initialize Sonar Ads for fallback
  const { handleWatchAds: showSonarAds, watchingAds: sonarWatching } =
    useSonarAds({
      userId,
      onReward,
      onError,
    })

  // Memoize the ad handler to avoid recreation on every render
  const adHandler = useMemo(() => {
    if (!zoneId) return null
    return createAdHandler(zoneId)
  }, [zoneId])

  // Helper to get consistent ymid
  const getYmid = useCallback(() => userId?.toString() || 'guest-user', [userId])

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
        await adHandler({ type: 'preload', ymid })
        setAdReady(true)
        return true
      } catch (error) {
        console.error('Monetag preload error:', error)
        setAdReady(false)
        return false
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

      // Fallback to Sonar if Monetag handler is missing
      if (!adHandler) {
        console.warn('Monetag handler missing, falling back to Sonar')
        alert(UI_TEXT.home.alerts.monetagFallback)
        await showSonarAds(rewardAmount)
        return true
      }

      setMonetagWatching(true)

      // Helper for fallback execution
      const executeFallback = async (reason) => {
        console.warn('Monetag ad unavailable/failed, executing fallback. Reason:', reason)
        // We don't alert error here to keep it seamless
        try {
          await showSonarAds(rewardAmount)
        } catch (sonarError) {
          console.error('Sonar fallback also failed', sonarError)
          if (onError) onError(sonarError)
        }
      }

      try {
        // 1. Preload/Check availability
        try {
          await adHandler({ type: 'preload', ymid })
        } catch (preloadError) {
          await executeFallback(preloadError)
          return true
        }

        // 2. Show Ad
        try {
          await adHandler({ ymid })
        } catch (showError) {
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
        setMonetagWatching(false)
      }
    },
    [userId, onReward, adHandler, showSonarAds, onError]
  )

  const handleWatchAds = useCallback(
    async (rewardAmount) => {
      if (monetagWatching || sonarWatching) return false

      const ymid = getYmid()
      return await showMonetagAd(ymid, rewardAmount)
    },
    [monetagWatching, sonarWatching, showMonetagAd, getYmid]
  )

  return {
    handleWatchAds,
    watchingAds: monetagWatching || sonarWatching,
    adReady,
    preloadAd,
  }
}
