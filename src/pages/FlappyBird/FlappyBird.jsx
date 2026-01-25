import { useState, useEffect, useCallback, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTelegram } from '../../hooks/useTelegram'
import { useUserInfo } from '../../hooks/useApi'
import { useMonetag } from '../../hooks/useMonetag'
import { useAdsgram } from '../../hooks/useAdsgram'
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

  const { data: userInfo, refetch } = useUserInfo(userId)
  const currentBalance = userInfo?.data?.balance || 0

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [earnedCoins, setEarnedCoins] = useState(0)
  const [showRewardToast, setShowRewardToast] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [gameStarted, setGameStarted] = useState(false)

  const iframeRef = useRef(null)

  // Ad Handlers
  const { handleWatchAds: showMonetag } = useMonetag({
    userId,
    zoneId: '10456534',
    onReward: () => {
      if (iframeRef.current?.contentWindow) {
        iframeRef.current.contentWindow.postMessage({ type: 'AD_COMPLETED' }, '*')
      }
    },
    onError: () => {
      // Handled by dual fallback logic in handleMessage
    }
  })

  const showAdsgram = useAdsgram({
    blockId: '20540',
    onReward: () => {
      if (iframeRef.current?.contentWindow) {
        iframeRef.current.contentWindow.postMessage({ type: 'AD_COMPLETED' }, '*')
      }
    },
    onError: () => {
      // If both fail, let game start anyway to not break UX
      if (iframeRef.current?.contentWindow) {
        iframeRef.current.contentWindow.postMessage({ type: 'AD_COMPLETED' }, '*')
      }
    }
  })

  const handleGameLoad = () => {
    setIsLoading(false)
  }

  const handleStartGame = () => {
    // This triggers the ad check flow inside the game
    if (iframeRef.current?.contentWindow) {
      iframeRef.current.contentWindow.postMessage({ type: 'TRIGGER_START' }, '*')
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
        
        // Refresh user info to show new balance
        if (refetch) {
          await refetch()
        }
        
        setTimeout(() => setShowRewardToast(false), 3000)
      } catch (error) {
        console.error('Error updating balance:', error)
        alert(UI_TEXT.home.alerts.rewardUpdateError.replace('{amount}', amount))
      } finally {
        setIsSubmitting(false)
      }
    },
    [userId, refetch],
  )

  useEffect(() => {
    const handleMessage = async (event) => {
      if (event.data?.type === 'FLAPPY_BIRD_AD_REQUEST') {
        // Attempt dual ad flow from React side
        const success = await showMonetag(0)
        if (!success) {
          await showAdsgram()
        }
      }
      if (event.data?.type === 'FLAPPY_BIRD_START') {
        setGameStarted(true)
      }
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
  }, [submitReward, showMonetag, showAdsgram])

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.headerLeft}>
          <button className={styles.backButton} onClick={() => navigate('/')}>
            <span className="material-symbols-outlined">arrow_back</span>
          </button>
          <h1 className={styles.title}>{UI_TEXT.flappyBird.title}</h1>
        </div>
        
        <div className={styles.balanceDisplay}>
          <span className="material-symbols-outlined">payments</span>
          <span className={styles.balanceValue}>{currentBalance.toLocaleString()}</span>
        </div>
      </div>

      <div className={styles.iframeContainer}>
        <iframe
          ref={iframeRef}
          src="/floppybird/index.html"
          title="Flappy Bird"
          className={styles.gameIframe}
          onLoad={handleGameLoad}
          frameBorder="0"
          allow="autoplay"
        />
      </div>

      {!gameStarted && !isLoading && (
        <div className={styles.startOverlay}>
          <div className={styles.startContent}>
            <div className={styles.gameIcon}>
              <img src="/floppybird/assets/bird.png" alt="Bird" />
            </div>
            <h2>{UI_TEXT.flappyBird.title}</h2>
            <p>{UI_TEXT.flappyBird.instructions}</p>
            <button className={styles.startButton} onClick={handleStartGame}>
              {UI_TEXT.flappyBird.startGame}
            </button>
          </div>
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

      {(isSubmitting || isLoading) && (
        <div className={styles.loadingOverlay}>
          <div className={styles.loader}></div>
          <p>{isLoading ? UI_TEXT.flappyBird.loading : UI_TEXT.common.loading}</p>
        </div>
      )}
    </div>
  )
}

