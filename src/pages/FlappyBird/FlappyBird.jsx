import { useState, useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTelegram } from '../../hooks/useTelegram'
import { userApi } from '../../services/api/userApi'
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

  const handleGameLoad = () => {
    setIsLoading(false)
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
      // Security check: only accept messages from our own domain
      // In production, you might want to check event.origin
      if (event.data?.type === 'FLAPPY_BIRD_SCORE') {
        const score = event.data.score
        // Calculate reward (1 point = 1 coin, max 1000 per run)
        const coins = Math.min(score, 1000)
        if (coins > 0) {
          submitReward(coins)
        }
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

      {(isSubmitting || isLoading) && (
        <div className={styles.loadingOverlay}>
          <div className={styles.loader}></div>
          <p>{isLoading ? UI_TEXT.flappyBird.loading : UI_TEXT.common.loading}</p>
        </div>
      )}
    </div>
  )
}
