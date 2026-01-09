import { useCallback, useState } from 'react'
import { userApi } from '../services/api'

export function useSonarAds({ userId }) {
  const [watchingAds, setWatchingAds] = useState(false)

  const handleWatchAds = useCallback(async () => {
    if (!userId) {
      alert('Không tìm thấy thông tin user!')
      return
    }

    if (watchingAds) return

    if (!window.Sonar) {
      alert('Chức năng quảng cáo chưa sẵn sàng!')
      return
    }

    setWatchingAds(true)

    try {
      const reward = Math.floor(Math.random() * (100 - 10 + 1)) + 10

      const result = await window.Sonar.show({
        adUnit: 'interstitial',
        loader: true,
        onStart: () => {
          console.log('Ad started loading')
        },
        onShow: () => {
          console.log('Ad is showing')
        },
        onError: (error) => {
          console.error('Ad error:', error)
          const errorMessage = error?.message || error || 'Không thể hiển thị quảng cáo'
          alert(`Lỗi quảng cáo:\n${errorMessage}\n\nVui lòng thử lại!`)
        },
        onClose: () => {
          console.log('Ad closed')
          alert(`Bạn đã nhận được ${reward} đ khi xem quảng cáo!`)
        },
      })

      if (result.status === 'showing') {
        const currentBalance = await userApi.getUserInfo(userId)
        const newBalance = (currentBalance?.balance || 0) + reward

        await userApi.updateBalance(userId, newBalance)

      } else {
        console.error('Ad failed to show')
      }
    } catch (error) {
      console.error('Error watching ads:', error)
      alert('Có lỗi xảy ra. Vui lòng thử lại!')
    } finally {
      setWatchingAds(false)
    }
  }, [userId, watchingAds])

  return { handleWatchAds, watchingAds }
}