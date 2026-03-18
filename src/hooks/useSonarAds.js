import { useCallback, useState } from 'react'
import { userApi } from '../services/api'
import { UI_TEXT } from '../config/uiText'

export function useSonarAds({ userId, onReward, onError }) {
  const [watchingAds, setWatchingAds] = useState(false)

  const rewardUser = useCallback(
    async (reward) => {
      try {
        // const currentBalance = await userApi.getUserInfo(userId)
        // const newBalance = (currentBalance?.balance || 0) + reward
        await userApi.updateCoins(userId, reward)
        alert(UI_TEXT.home.alerts.rewardFromAd.replace('{amount}', reward))
      } catch (error) {
        console.error('Error updating coins:', error)
        alert(UI_TEXT.home.alerts.rewardUpdateError.replace('{amount}', reward))
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
            error?.message || error || UI_TEXT.common.error
          alert(`${UI_TEXT.home.alerts.adError}\n${errorMessage}`)
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
        alert(UI_TEXT.home.alerts.noUser)
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
          alert(UI_TEXT.home.alerts.adUnavailable)
          return
        }

        const adShown = await showSonarAd(reward)

        if (!adShown) {
          alert(UI_TEXT.home.alerts.adError)
        }
      } catch (error) {
        console.error('Error watching ads:', error)
        alert(UI_TEXT.common.error)
        onError?.(error)
      } finally {
        setWatchingAds(false)
      }
    },
    [userId, watchingAds, showSonarAd, onReward, onError]
  )

  return { handleWatchAds, watchingAds }
}
