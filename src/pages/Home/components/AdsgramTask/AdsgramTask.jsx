import { useEffect, useRef, useState } from 'react'
import styles from './AdsgramTask.module.css'

export const AdsgramTask = ({
  debug,
  blockId,
  onReward,
  onError,
  onBannerNotFound,
  onTooLongSession,
}) => {
  const taskRef = useRef(null)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    // Kiểm tra xem custom element đã được đăng ký chưa
    if (customElements.get('adsgram-task')) {
      setIsLoaded(true)
    } else {
      // Đợi cho đến khi custom element được đăng ký
      const checkInterval = setInterval(() => {
        if (customElements.get('adsgram-task')) {
          setIsLoaded(true)
          clearInterval(checkInterval)
        }
      }, 100)

      // Clear interval sau 5 giây nếu không tải được
      setTimeout(() => {
        clearInterval(checkInterval)
        if (!customElements.get('adsgram-task')) {
          console.warn('adsgram-task custom element not loaded after 5s')
        }
      }, 5000)

      return () => clearInterval(checkInterval)
    }
  }, [])

  useEffect(() => {
    const task = taskRef.current
    if (!task) return

    // Handler cho sự kiện reward
    const handleReward = (event) => {
      console.log('Task reward event:', event.detail)
      onReward?.(event.detail)
    }

    // Handler cho sự kiện error
    const handleError = (event) => {
      console.error('Task error event:', event.detail)
      onError?.(event.detail)
    }

    // Handler cho sự kiện banner not found
    const handleBannerNotFound = (event) => {
      console.warn('Task banner not found:', event.detail)
      onBannerNotFound?.(event.detail)
    }

    // Handler cho sự kiện session quá dài
    const handleTooLongSession = (event) => {
      console.warn('Task session too long:', event.detail)
      onTooLongSession?.(event.detail)
    }

    // Đăng ký event listeners
    task.addEventListener('reward', handleReward)
    task.addEventListener('onError', handleError)
    task.addEventListener('onBannerNotFound', handleBannerNotFound)
    task.addEventListener('onTooLongSession', handleTooLongSession)

    // Cleanup
    return () => {
      task.removeEventListener('reward', handleReward)
      task.removeEventListener('onError', handleError)
      task.removeEventListener('onBannerNotFound', handleBannerNotFound)
      task.removeEventListener('onTooLongSession', handleTooLongSession)
    }
  }, [onReward, onError, onBannerNotFound, onTooLongSession])

  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-slate-500">Đang tải task...</div>
      </div>
    )
  }

  return (
    <adsgram-task
      className={styles.task}
      data-block-id={blockId}
      data-debug={debug}
      ref={taskRef}
    >
      <span slot="reward" className={styles.reward}>
        <span className="material-symbols-outlined">stars</span>
        1000 coins
      </span>
      <div slot="button" className={styles.button}>
        Bắt đầu nhiệm vụ
      </div>
      <div slot="claim" className={styles.button_claim}>
        Nhận thưởng
      </div>
      <div slot="done" className={styles.button_done}>
        Hoàn thành
      </div>
    </adsgram-task>
  )
}
