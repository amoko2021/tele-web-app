import { useCallback, useState } from 'react'
import { userApi } from '../services/api'

export function useSonarAds({ userId, onReward, onError }) {
  const [watchingAds, setWatchingAds] = useState(false)

  const rewardUser = useCallback(
    async (reward) => {
      try {
        const currentBalance = await userApi.getUserInfo(userId)
        const newBalance = (currentBalance?.balance || 0) + reward
        await userApi.updateBalance(userId, reward)
        alert(`Bạn đã nhận được ${reward} đ khi xem quảng cáo!`)
      } catch (error) {
        console.error('Error updating balance:', error)
        alert(`Bạn đã nhận được ${reward} đ nhưng có lỗi khi cập nhật số dư!`)
      }
    },
    [userId]
  )

  const showSonarAd = useCallback(
    async (reward) => {
      const result = await window.Sonar.show({
        adUnit: 'reward',
        loader: true,
        onStart: () => {
          console.log('Sonar ad started loading')
        },
        onShow: () => {
          console.log('Sonar ad is showing')
        },
        onError: (error) => {
          console.error('Sonar ad error:', error)
          const errorMessage =
            error?.message || error || 'Không thể hiển thị quảng cáo'
          alert(`Lỗi quảng cáo:\n${errorMessage}\n\nVui lòng thử lại!`)
          onError?.(error)
        },
        onClose: () => {
          console.log('Sonar ad closed')
        },
        onReward: async () => {
          // If custom onReward is provided, use it.
          // Otherwise fall back to default balance reward behavior if reward > 0
          if (onReward) {
            onReward()
          } else if (reward > 0) {
            await rewardUser(reward)
          }
        },
      })

      if (result.status === 'showing') {
        return true
      }
      return false
    },
    [rewardUser, onReward, onError]
  )

  const handleWatchAds = useCallback(
    async (rewardAmount = 0) => {
      if (!userId) {
        alert('Không tìm thấy thông tin user!')
        return
      }

      if (watchingAds) return

      setWatchingAds(true)

      try {
        // Use provided reward amount or random if not provided and no custom handler
        let reward = rewardAmount
        if (!onReward && reward <= 0) {
          reward = Math.floor(Math.random() * (20 - 5 + 1)) + 5
        }

        if (!window.Sonar) {
          alert('Sonar SDK chưa được tải. Vui lòng thử lại!')
          return
        }

        const adShown = await showSonarAd(reward)

        if (!adShown) {
          alert('Không thể hiển thị quảng cáo. Vui lòng thử lại!')
        }
      } catch (error) {
        console.error('Error watching ads:', error)
        alert('Có lỗi xảy ra. Vui lòng thử lại!')
        onError?.(error)
      } finally {
        setWatchingAds(false)
      }
    },
    [userId, watchingAds, showSonarAd, onReward, onError]
  )

  return { handleWatchAds, watchingAds }
}
