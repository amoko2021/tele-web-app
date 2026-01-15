import { useCallback, useState, useMemo } from 'react'
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

  const adHandler = useMemo(
    () => (zoneId ? createAdHandler(zoneId) : null),
    [zoneId]
  )

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

      try {
        // Show Rewarded Interstitial ad
        await adHandler({ ymid })

        // Ad completed - reward user
        try {
          // const currentBalance = await userApi.getUserInfo(userId)
          // const newBalance = (currentBalance?.data?.balance || 0) + rewardAmount
          await userApi.updateBalance(userId, rewardAmount)
          // alert(UI_TEXT.home.alerts.rewardFromAd.replace('{amount}', rewardAmount))
          onReward?.()
        } catch (error) {
          console.error('Error updating balance:', error)
          alert(
            UI_TEXT.home.alerts.rewardUpdateError.replace('{amount}', rewardAmount)
          )
        }

        return true
      } catch (error) {
        console.error('Monetag ad failed, falling back to Sonar:', error)
        alert(UI_TEXT.home.alerts.monetagError)
        // Fallback to Sonar on error
        setMonetagWatching(false) // Ensure we reset this before switching
        await showSonarAds(rewardAmount)
        return true
      } finally {
        setMonetagWatching(false)
      }
    },
    [userId, onReward, adHandler, showSonarAds]
  )

  const handleWatchAds = useCallback(
    async (rewardAmount) => {
      if (monetagWatching || sonarWatching) return false

      // Use userId as ymid for tracking, fallback to 'guest-user'
      const ymid = userId?.toString() || 'guest-user'

      return await showMonetagAd(ymid, rewardAmount)
    },
    [userId, monetagWatching, sonarWatching, showMonetagAd]
  )

  return {
    handleWatchAds,
    watchingAds: monetagWatching || sonarWatching,
    adReady,
    preloadAd,
  }
}
