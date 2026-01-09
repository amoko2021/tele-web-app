import { useCallback, useState } from 'react'
import { userApi } from '../services/api'

export function useSonarAds({ userId }) {
  const [watchingAds, setWatchingAds] = useState(false)

  const rewardUser = useCallback(async (reward) => {
    try {
      const currentBalance = await userApi.getUserInfo(userId)
      const newBalance = (currentBalance?.balance || 0) + reward
      await userApi.updateBalance(userId, newBalance)
      alert(`Bạn đã nhận được ${reward} đ khi xem quảng cáo!`)
    } catch (error) {
      console.error('Error updating balance:', error)
      alert(`Bạn đã nhận được ${reward} đ nhưng có lỗi khi cập nhật số dư!`)
    }
  }, [userId])

  const showSonarAd = useCallback(async (reward) => {
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
        const errorMessage = error?.message || error || 'Không thể hiển thị quảng cáo'
        alert(`Lỗi quảng cáo:\n${errorMessage}\n\nVui lòng thử lại!`)
      },
      onClose: () => {
        console.log('Sonar ad closed')
      },
    })

    if (result.status === 'showing') {
      await rewardUser(reward)
      return true
    }
    return false
  }, [rewardUser])

  const showAdsgramAd = useCallback(async (reward) => {
    if (!window.Adsgram) {
      return false
    }

    try {
      const controller = window.Adsgram.init({ blockId: '20539' })
      await controller.show()
      await rewardUser(reward)
      return true
    } catch (error) {
      console.error('Adsgram ad error:', error)
      return false
    }
  }, [rewardUser])

  const handleWatchAds = useCallback(async () => {
    if (!userId) {
      alert('Không tìm thấy thông tin user!')
      return
    }

    if (watchingAds) return

    setWatchingAds(true)

    try {
      const reward = Math.floor(Math.random() * (100 - 10 + 1)) + 10

      let adShown = false

      if (window.Adsgram) {
        console.log('Trying Adsgram first...')
        adShown = await showAdsgramAd(reward)
      }

      if (!adShown && window.Sonar) {
        console.log('Adsgram failed, trying Sonar...')
        adShown = await showSonarAd(reward)
      }

      if (!adShown) {
        alert('Không thể hiển thị quảng cáo. Vui lòng thử lại!')
      }
    } catch (error) {
      console.error('Error watching ads:', error)
      alert('Có lỗi xảy ra. Vui lòng thử lại!')
    } finally {
      setWatchingAds(false)
    }
  }, [userId, watchingAds, showAdsgramAd, showSonarAd])

  return { handleWatchAds, watchingAds }
}