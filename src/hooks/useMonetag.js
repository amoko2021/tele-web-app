import { useCallback, useState } from 'react'
import { userApi } from '../services/api'
import createAdHandler from 'monetag-tg-sdk'
import { useSonarAds } from './useSonarAds'

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

  const adHandler = zoneId ? createAdHandler(zoneId) : null

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
        alert('Không tìm thấy thông tin user!')
        return false
      }

      // Fallback to Sonar if Monetag handler is missing
      if (!adHandler) {
        console.warn('Monetag handler missing, falling back to Sonar')
        await showSonarAds(rewardAmount)
        return true
      }

      setMonetagWatching(true)

      try {
        // Use Rewarded Popup format with type: 'pop'
        await adHandler({ ymid })

        // Popup attempt completed - reward user
        try {
          const currentBalance = await userApi.getUserInfo(userId)
          // const newBalance = (currentBalance?.data?.balance || 0) + rewardAmount
          await userApi.updateBalance(userId, rewardAmount)
          // alert(`Bạn đã nhận được ${rewardAmount} đ khi xem quảng cáo!`)
          onReward?.()
        } catch (error) {
          console.error('Error updating balance:', error)
          alert(
            `Bạn đã nhận được ${rewardAmount} đ nhưng có lỗi khi cập nhật số dư!`
          )
        }

        return true
      } catch (error) {
        console.error('Monetag popup ad failed, falling back to Sonar:', error)
        // Fallback to Sonar on error
        setMonetagWatching(false) // Ensure we reset this before switching
        await showSonarAds(rewardAmount)
        return true
      } finally {
        setMonetagWatching(false)
      }
    },
    [userId, onReward, onError, adHandler, showSonarAds]
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
