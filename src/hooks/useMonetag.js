import { useCallback, useState } from 'react'
import { userApi } from '../services/api'
import createAdHandler from 'monetag-tg-sdk'

export function useMonetag({ userId, zoneId, onReward, onError }) {
  const [watchingAds, setWatchingAds] = useState(false)
  const [adReady, setAdReady] = useState(false)

  const adHandler = zoneId ? createAdHandler(zoneId) : null

  const preloadAd = useCallback(
    async (ymid) => {
      try {
        if (adHandler) {
          await adHandler({ type: 'preload', ymid })
          setAdReady(true)
        }
      } catch (error) {
        console.error('Monetag preload error:', error)
        setAdReady(false)
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

      if (!adHandler) {
        onError?.(new Error('Monetag SDK not available or zoneId not set'))
        return false
      }

      setWatchingAds(true)

      try {
        await adHandler({type: 'pop', ymid })

        try {
          const currentBalance = await userApi.getUserInfo(userId)
          const newBalance = (currentBalance?.balance || 0) + rewardAmount
          await userApi.updateBalance(userId, newBalance)
          alert(`Bạn đã nhận được ${rewardAmount} đ khi xem quảng cáo!`)
          onReward?.()
        } catch (error) {
          console.error('Error updating balance:', error)
          alert(`Bạn đã nhận được ${rewardAmount} đ nhưng có lỗi khi cập nhật số dư!`)
        }

        return true
      } catch (error) {
        console.error('Monetag ad error:', error)
        onError?.(error)
        return false
      } finally {
        setWatchingAds(false)
      }
    },
    [userId, onReward, onError, adHandler]
  )

  const handleWatchAds = useCallback(
    async (rewardAmount) => {
      if (watchingAds) return false

      const ymid = userId || 'guest-user'

      return await showMonetagAd(ymid, rewardAmount)
    },
    [userId, watchingAds, showMonetagAd]
  )

  return {
    handleWatchAds,
    watchingAds,
    adReady,
    preloadAd,
  }
}
