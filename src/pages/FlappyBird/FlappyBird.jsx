import { useState, useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTelegram } from '../../hooks/useTelegram'
import { userApi } from '../../services/api/userApi'
import { useMonetag } from '../../hooks/useMonetag'
import { UI_TEXT } from '../../config/uiText'
import styles from './FlappyBird.module.css'

/**
 * FlappyBird Component
 * Hosts the legacy jQuery/HTML5 game in an iframe and handles reward logic.
 */
export const FlappyBird = () => {
  const navigate = useNavigate()
  const { user } = useTelegram()
  const userId = user?.id

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [earnedCoins, setEarnedCoins] = useState(0)
  const [showRewardToast, setShowRewardToast] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [hasWatchedAd, setHasWatchedAd] = useState(false)

  const { handleWatchAds, watchingAds, isLoading: adLoading } = useMonetag({
    userId,
    zoneId: import.meta.env.VITE_MONETAG_ZONE_ID || '',
    onReward: () => {
      setHasWatchedAd(true)
    },
    onError: (err) => {
      console.error('Monetag error:', err)
      // If ad fails, we still allow them to play for better UX, or you can block it
      // setHasWatchedAd(true) 
    }
  })

  const handleGameLoad = () => {
    setIsLoading(false)
  }

  const startWithAd = async () => {
    const success = await handleWatchAds(0)
    if (success) {
      setHasWatchedAd(true)
    }
  }

  const submitReward = useCallback(
    async (amount) => {
      if (!userId || amount <= 0) return
      setIsSubmitting(true)
      try {
        await userApi.updateBalance(userId, amount)
        setEarnedCoins(amount)
        setShowRewardToast(true)
        setTimeout(() => setShowRewardToast(false), 3000)
      } catch (error) {
        console.error('Error updating balance:', error)
      } finally {
        setIsSubmitting(false)
      }
    },
    [userId],
  )

  useEffect(() => {
    const handleMessage = (event) => {
      if (event.data?.type === 'FLAPPY_BIRD_SCORE') {
        const score = event.data.score
        const coins = Math.min(score, 1000)
        if (coins > 0) {
          submitReward(coins)
        }
        // Reset ad status after game ends so they have to watch again for next round
        // Note: The legacy game handles "Replay" internally, so we might need 
        // a way to trigger this from the iframe or just let them play until they leave the page.
      }
    }

    window.addEventListener('message', handleMessage)
    return () => window.removeEventListener('message', handleMessage)
  }, [submitReward])

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <button className={styles.backButton} onClick={() => navigate('/')}>
          <span className="material-symbols-outlined">arrow_back</span>
        </button>
        <h1 className={styles.title}>{UI_TEXT.flappyBird.title}</h1>
      </div>

      {!hasWatchedAd ? (
        <div className={styles.startOverlay}>
          <div className={styles.startPanel}>
            <div className={styles.birdIcon}>🐦</div>
            <h2 className={styles.startTitle}>{UI_TEXT.flappyBird.title}</h2>
            <p className={styles.startDesc}>{UI_TEXT.flappyBird.instructions}</p>
            <button 
              className={styles.adButton} 
              onClick={startWithAd}
              disabled={watchingAds || adLoading}
            >
              {watchingAds || adLoading ? (
                <div className={styles.loaderSmall}></div>
              ) : (
                <>
                  <span className="material-symbols-outlined">play_circle</span>
                  Xem quảng cáo để chơi
                </>
              )}
            </button>
          </div>
        </div>
      ) : (
        <div className={styles.iframeContainer}>
          <iframe
            src="/floppybird/index.html"
            title="Flappy Bird"
            className={styles.gameIframe}
            onLoad={handleGameLoad}
            frameBorder="0"
            allow="autoplay"
          />
        </div>
      )}

      {showRewardToast && (
        <div className={styles.rewardToast}>
          <div className={styles.toastIcon}>
            <span className="material-symbols-outlined">payments</span>
          </div>
          <div className={styles.toastContent}>
            {UI_TEXT.flappyBird.reward.replace('{coins}', earnedCoins)}
          </div>
        </div>
      )}

      {(isSubmitting || (hasWatchedAd && isLoading)) && (
        <div className={styles.loadingOverlay}>
          <div className={styles.loader}></div>
          <p>{isLoading ? UI_TEXT.flappyBird.loading : UI_TEXT.common.loading}</p>
        </div>
      )}
    </div>
  )
}

