import { useState, useEffect, useRef, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTelegram } from '../../hooks/useTelegram'
import { userApi } from '../../services/api/userApi'
import { UI_TEXT } from '../../config/uiText'
import styles from './FlappyBird.module.css'

// Game Constants
const GRAVITY = 0.25
const JUMP = -4.6
const PIPE_SPEED = 2
const PIPE_SPAWN_RATE = 100 // frames
const PIPE_GAP = 100
const BIRD_SIZE = 20 // radius or width/height
const PIPE_WIDTH = 50

export const FlappyBird = () => {
  const navigate = useNavigate()
  const { user } = useTelegram()
  const userId = user?.id

  const canvasRef = useRef(null)
  const requestRef = useRef(null)
  const frameCountRef = useRef(0)
  
  // Game State Refs (for loop performance)
  const birdRef = useRef({ x: 50, y: 150, velocity: 0, radius: 12 })
  const pipesRef = useRef([])
  const scoreRef = useRef(0)
  const gameStateRef = useRef('ready') // ready, playing, gameOver

  // React State (for UI)
  const [gameState, setGameState] = useState('ready')
  const [score, setScore] = useState(0)
  const [bestScore, setBestScore] = useState(0)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [earnedCoins, setEarnedCoins] = useState(0)

  // Load best score from local storage
  useEffect(() => {
    const savedBest = localStorage.getItem(`flappy_best_${userId}`)
    if (savedBest) setBestScore(parseInt(savedBest))
  }, [userId])

  const initGame = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    // Reset game state
    birdRef.current = { x: canvas.width / 3, y: canvas.height / 2, velocity: 0, radius: 12 }
    pipesRef.current = []
    scoreRef.current = 0
    frameCountRef.current = 0
    gameStateRef.current = 'ready'
    
    setScore(0)
    setGameState('ready')
    
    // Initial draw
    draw()
  }, [])

  const startGame = () => {
    gameStateRef.current = 'playing'
    setGameState('playing')
    loop()
  }

  const jump = () => {
    if (gameStateRef.current === 'ready') {
      startGame()
    }
    
    if (gameStateRef.current === 'playing') {
      birdRef.current.velocity = JUMP
    }
  }

  const gameOver = () => {
    gameStateRef.current = 'gameOver'
    setGameState('gameOver')
    cancelAnimationFrame(requestRef.current)
    
    // Update best score
    if (scoreRef.current > bestScore) {
      setBestScore(scoreRef.current)
      localStorage.setItem(`flappy_best_${userId}`, scoreRef.current)
    }

    // Calculate reward (1 point = 10 coins, max 1000 per run)
    const coins = Math.min(scoreRef.current * 10, 1000)
    setEarnedCoins(coins)
    
    if (coins > 0 && userId) {
      submitReward(coins)
    }
  }

  const submitReward = async (amount) => {
    setIsSubmitting(true)
    try {
      await userApi.updateBalance(userId, amount)
    } catch (error) {
      console.error('Error updating balance:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const update = () => {
    const canvas = canvasRef.current
    if (!canvas) return

    const bird = birdRef.current
    const pipes = pipesRef.current

    // Bird Physics
    bird.velocity += GRAVITY
    bird.y += bird.velocity

    // Floor/Ceiling Collision
    if (bird.y + bird.radius >= canvas.height || bird.y - bird.radius <= 0) {
      gameOver()
      return
    }

    // Pipe Logic
    if (frameCountRef.current % PIPE_SPAWN_RATE === 0) {
      const minPipeHeight = 50
      const maxPipeHeight = canvas.height - PIPE_GAP - minPipeHeight
      const height = Math.floor(Math.random() * (maxPipeHeight - minPipeHeight + 1) + minPipeHeight)
      
      pipes.push({
        x: canvas.width,
        y: 0,
        width: PIPE_WIDTH,
        height: height,
        passed: false
      })
    }

    for (let i = 0; i < pipes.length; i++) {
      const pipe = pipes[i]
      pipe.x -= PIPE_SPEED

      // Collision Detection
      // Top Pipe
      if (
        bird.x + bird.radius > pipe.x &&
        bird.x - bird.radius < pipe.x + pipe.width &&
        bird.y - bird.radius < pipe.height
      ) {
        gameOver()
        return
      }

      // Bottom Pipe
      if (
        bird.x + bird.radius > pipe.x &&
        bird.x - bird.radius < pipe.x + pipe.width &&
        bird.y + bird.radius > pipe.height + PIPE_GAP
      ) {
        gameOver()
        return
      }

      // Score Update
      if (pipe.x + pipe.width < bird.x && !pipe.passed) {
        scoreRef.current += 1
        setScore(scoreRef.current)
        pipe.passed = true
      }
    }

    // Remove off-screen pipes
    if (pipes.length > 0 && pipes[0].x + pipes[0].width < 0) {
      pipes.shift()
    }

    frameCountRef.current++
  }

  const draw = () => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')

    // Clear Canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // Draw Background (Sky)
    ctx.fillStyle = '#70c5ce'
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    // Draw Pipes
    ctx.fillStyle = '#73bf2e' // Green pipe
    ctx.strokeStyle = '#558c22' // Darker border
    ctx.lineWidth = 2
    
    pipesRef.current.forEach(pipe => {
      // Top Pipe
      ctx.fillRect(pipe.x, 0, pipe.width, pipe.height)
      ctx.strokeRect(pipe.x, 0, pipe.width, pipe.height)
      
      // Bottom Pipe cap
      ctx.fillRect(pipe.x - 2, pipe.height - 20, pipe.width + 4, 20)
      ctx.strokeRect(pipe.x - 2, pipe.height - 20, pipe.width + 4, 20)

      // Bottom Pipe
      const bottomPipeY = pipe.height + PIPE_GAP
      const bottomPipeHeight = canvas.height - bottomPipeY
      ctx.fillRect(pipe.x, bottomPipeY, pipe.width, bottomPipeHeight)
      ctx.strokeRect(pipe.x, bottomPipeY, pipe.width, bottomPipeHeight)
      
      // Bottom Pipe cap
      ctx.fillRect(pipe.x - 2, bottomPipeY, pipe.width + 4, 20)
      ctx.strokeRect(pipe.x - 2, bottomPipeY, pipe.width + 4, 20)
    })

    // Draw Bird
    const bird = birdRef.current
    ctx.save()
    ctx.translate(bird.x, bird.y)
    // Rotate bird based on velocity
    const rotation = Math.min(Math.PI / 4, Math.max(-Math.PI / 4, (bird.velocity * 0.1)))
    ctx.rotate(rotation)
    
    // Bird Body
    ctx.fillStyle = '#f48c26' // Orange
    ctx.beginPath()
    ctx.arc(0, 0, bird.radius, 0, Math.PI * 2)
    ctx.fill()
    ctx.lineWidth = 2
    ctx.strokeStyle = '#fff'
    ctx.stroke()
    
    // Eye
    ctx.fillStyle = '#fff'
    ctx.beginPath()
    ctx.arc(6, -4, 4, 0, Math.PI * 2)
    ctx.fill()
    ctx.fillStyle = '#000'
    ctx.beginPath()
    ctx.arc(8, -4, 1.5, 0, Math.PI * 2)
    ctx.fill()
    
    // Wing
    ctx.fillStyle = '#fff'
    ctx.beginPath()
    ctx.ellipse(-4, 2, 6, 4, 0, 0, Math.PI * 2)
    ctx.fill()

    ctx.restore()

    // Draw Ground
    // (Simplified as just bottom of canvas for now)
  }

  const loop = () => {
    if (gameStateRef.current === 'playing') {
      update()
      draw()
      requestRef.current = requestAnimationFrame(loop)
    }
  }

  // Handle Resize
  useEffect(() => {
    const handleResize = () => {
      if (canvasRef.current) {
        const parent = canvasRef.current.parentElement
        canvasRef.current.width = parent.clientWidth
        canvasRef.current.height = parent.clientHeight
        
        // Re-init bird position if resizing
        if (gameStateRef.current === 'ready') {
          birdRef.current.x = parent.clientWidth / 3
          birdRef.current.y = parent.clientHeight / 2
          draw()
        }
      }
    }

    window.addEventListener('resize', handleResize)
    handleResize() // Initial size

    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // Initial Setup
  useEffect(() => {
    initGame()
    return () => cancelAnimationFrame(requestRef.current)
  }, [initGame])

  return (
    <div className={styles.container}>
      <div 
        className={styles.canvasContainer} 
        onMouseDown={jump}
        onTouchStart={() => {
          // Prevent default to stop zooming/scrolling
          jump()
        }}
      >
        <canvas ref={canvasRef} className={styles.gameCanvas} />
        
        {/* UI Overlay */}
        <div className={styles.uiLayer}>
          {/* Score during game */}
          {gameState === 'playing' && (
            <div className={styles.scoreBoard}>
              <div className={styles.currentScore}>{score}</div>
            </div>
          )}

          {/* Start Screen */}
          {gameState === 'ready' && (
            <div className={styles.startScreen}>
              <div className={styles.panel}>
                <h1 className={styles.title}>{UI_TEXT.flappyBird.title}</h1>
                <p>{UI_TEXT.flappyBird.instructions}</p>
                <button className={`${styles.button} ${styles.playButton}`} onClick={startGame}>
                  {UI_TEXT.flappyBird.startGame}
                </button>
                <button 
                  className={`${styles.button} ${styles.homeButton}`}
                  onClick={() => navigate('/')}
                >
                  {UI_TEXT.flappyBird.backHome}
                </button>
              </div>
            </div>
          )}

          {/* Game Over Screen */}
          {gameState === 'gameOver' && (
            <div className={styles.gameOverScreen}>
              <div className={styles.panel}>
                <h1 className={styles.title}>{UI_TEXT.flappyBird.gameOver}</h1>
                
                <div className={styles.scoreLabel}>{UI_TEXT.flappyBird.finalScore.replace('{score}', '')}</div>
                <div className={styles.scoreValue}>{score}</div>
                
                <div className={styles.scoreLabel}>{UI_TEXT.flappyBird.bestScore.replace('{score}', '')}</div>
                <div className={styles.scoreValue}>{bestScore}</div>

                {earnedCoins > 0 && (
                  <div className={styles.rewardText}>
                    {UI_TEXT.flappyBird.reward.replace('{coins}', earnedCoins)}
                  </div>
                )}

                {isSubmitting ? (
                  <p>{UI_TEXT.common.loading}</p>
                ) : (
                  <>
                    <button className={`${styles.button} ${styles.playButton}`} onClick={initGame}>
                      {UI_TEXT.flappyBird.playAgain}
                    </button>
                    <button 
                      className={`${styles.button} ${styles.homeButton}`}
                      onClick={() => navigate('/')}
                    >
                      {UI_TEXT.flappyBird.backHome}
                    </button>
                  </>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
