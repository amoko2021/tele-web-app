import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTelegram } from '../../hooks/useTelegram'
import { userApi } from '../../services/api/userApi'
import { UI_TEXT } from '../../config/uiText'
import styles from './GiftRain.module.css'

const GAME_DURATION = 60 // seconds
const SPAWN_RATE = 500 // ms
const GIFT_TYPES = [
  { emoji: '🎁', value: 10, speed: 3 },
  { emoji: '💎', value: 50, speed: 4 },
  { emoji: '💰', value: 20, speed: 3.5 },
  { emoji: '🧧', value: 5, speed: 2.5 },
]

export const GiftRain = () => {
  const navigate = useNavigate()
  const { user } = useTelegram()
  const userId = user?.id

  const [gameState, setGameState] = useState('ready') // ready, playing, finished
  const [score, setScore] = useState(0)
  const [timeLeft, setTimeLeft] = useState(GAME_DURATION)
  const [gifts, setGifts] = useState([])
  const [floatingTexts, setFloatingTexts] = useState([])
  const [isSubmitting, setIsSubmitting] = useState(false)

  const gameLoopRef = useRef(null)
  const spawnTimerRef = useRef(null)
  const gameAreaRef = useRef(null)

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      stopGame()
    }
  }, [])

  const startGame = () => {
    setGameState('playing')
    setScore(0)
    setTimeLeft(GAME_DURATION)
    setGifts([])
    setFloatingTexts([])
    
    // Start timer
    gameLoopRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          endGame()
          return 0
        }
        return prev - 1
      })
    }, 1000)

    // Start spawning gifts
    spawnTimerRef.current = setInterval(spawnGift, SPAWN_RATE)
  }

  const stopGame = () => {
    if (gameLoopRef.current) clearInterval(gameLoopRef.current)
    if (spawnTimerRef.current) clearInterval(spawnTimerRef.current)
  }

  const endGame = () => {
    stopGame()
    setGameState('finished')
    submitScore()
  }

  const submitScore = async () => {
    if (!userId) return
    
    setIsSubmitting(true)
    try {
      // Update user balance with the score earned
      // Using updateBalance which adds to existing balance
      await userApi.updateBalance(userId, 0)
    } catch (error) {
      console.error('Error updating balance:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const spawnGift = () => {
    const id = Date.now() + Math.random()
    const type = GIFT_TYPES[Math.floor(Math.random() * GIFT_TYPES.length)]
    const left = Math.random() * 90 // 0-90% width
    
    setGifts((prev) => [
      ...prev,
      {
        id,
        ...type,
        left: `${left}%`,
        animationDuration: `${Math.random() * 2 + 2}s` // 2-4s fall time
      }
    ])

    // Cleanup old gifts (simple garbage collection)
    setGifts((prev) => {
      if (prev.length > 20) return prev.slice(prev.length - 20)
      return prev
    })
  }

  const handleGiftClick = (e, gift) => {
    e.stopPropagation()
    
    // Add score
    setScore((prev) => prev + gift.value)
    
    // Show floating text
    const id = Date.now()
    setFloatingTexts((prev) => [
      ...prev,
      {
        id,
        value: gift.value,
        x: e.clientX,
        y: e.clientY
      }
    ])

    // Remove floating text after animation
    setTimeout(() => {
      setFloatingTexts((prev) => prev.filter(item => item.id !== id))
    }, 800)

    // Remove gift
    setGifts((prev) => prev.filter((g) => g.id !== gift.id))
  }

  // Remove gifts that have fallen out of view (handled by CSS animation mostly, 
  // but we clean up state periodically or just let React handle it via key updates)
  // For simplicity in this version, we rely on the click to remove or the array slicing in spawnGift

  return (
    <div className={styles.container}>
      {/* Header */}
      <div className={styles.header}>
        <div className={styles.scoreBoard}>
          {UI_TEXT.giftRain.score.replace('{score}', score)}
        </div>
        <div className={styles.timer}>
          {UI_TEXT.giftRain.timeLeft.replace('{time}', timeLeft)}
        </div>
      </div>

      {/* Game Area */}
      <div className={styles.gameArea} ref={gameAreaRef}>
        {gameState === 'playing' && gifts.map((gift) => (
          <div
            key={gift.id}
            className={styles.gift}
            style={{
              left: gift.left,
              animationDuration: gift.animationDuration
            }}
            onMouseDown={(e) => handleGiftClick(e, gift)}
            onTouchStart={(e) => handleGiftClick(e, gift)}
          >
            {gift.emoji}
          </div>
        ))}

        {/* Floating Texts */}
        {floatingTexts.map((text) => (
          <div
            key={text.id}
            className={styles.plusScore}
            style={{
              left: text.x,
              top: text.y
            }}
          >
            +{text.value}
          </div>
        ))}
      </div>

      {/* Start Screen */}
      {gameState === 'ready' && (
        <div className={styles.startScreen}>
          <h1 className={styles.title}>{UI_TEXT.giftRain.title}</h1>
          <p className={styles.instructions}>{UI_TEXT.giftRain.instructions}</p>
          <button className={styles.button} onClick={startGame}>
            {UI_TEXT.giftRain.startGame}
          </button>
          <button 
            className={`${styles.button} ${styles.secondaryButton}`}
            onClick={() => navigate('/')}
          >
            {UI_TEXT.giftRain.backHome}
          </button>
        </div>
      )}

      {/* Game Over Screen */}
      {gameState === 'finished' && (
        <div className={styles.gameOverScreen}>
          <h1 className={styles.title}>{UI_TEXT.giftRain.gameOver}</h1>
          <div className={styles.finalScore}>
            {UI_TEXT.giftRain.finalScore.replace('{score}', score)}
          </div>
          
          {isSubmitting ? (
            <p>{UI_TEXT.common.loading}</p>
          ) : (
            <>
              <button className={styles.button} onClick={startGame}>
                {UI_TEXT.giftRain.playAgain}
              </button>
              <button 
                className={`${styles.button} ${styles.secondaryButton}`}
                onClick={() => navigate('/')}
              >
                {UI_TEXT.giftRain.backHome}
              </button>
            </>
          )}
        </div>
      )}
    </div>
  )
}
