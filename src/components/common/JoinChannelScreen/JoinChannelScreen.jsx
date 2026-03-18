import { useState } from 'react'
import { UI_TEXT } from '../../../config/uiText'
import styles from './JoinChannelScreen.module.css'

export const JoinChannelScreen = ({ onCheck }) => {
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const channelUrl = import.meta.env.VITE_CHANNEL_URL || 'https://t.me/lamgiau_online'
  const sub_channelUrl = import.meta.env.VITE_SUB_CHANNEL_URL || 'https://t.me/trathuongonline'

  const handleJoin = () => {
    if (window.Telegram?.WebApp?.openTelegramLink) {
      window.Telegram.WebApp.openTelegramLink(channelUrl)
    } else {
      window.open(channelUrl, '_blank')
    }
  }

  const handleSubJoin = () => {
    if (window.Telegram?.WebApp?.openTelegramLink) {
      window.Telegram.WebApp.openTelegramLink(sub_channelUrl)
    } else {
      window.open(sub_channelUrl, '_blank')
    }
  }

  const handleCheck = async () => {
    if (isLoading) return
    setError('')
    setIsLoading(true)
    try {
      const success = await onCheck()
      if (!success) {
        setError(UI_TEXT.joinChannelScreen.error)
      }
    } catch {
      setError(UI_TEXT.common.error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.iconWrapper}>
        <span className={`material-symbols-outlined ${styles.icon}`}>
          campaign
        </span>
      </div>
      <h1 className={styles.title}>{UI_TEXT.joinChannelScreen.title}</h1>
      <p className={styles.description}>{UI_TEXT.joinChannelScreen.description}</p>
      
      <div className={styles.buttonGroup}>
        <button className={styles.joinButton} onClick={handleJoin}>
          {UI_TEXT.joinChannelScreen.button}
        </button>
        <button className={styles.subButton} onClick={handleSubJoin}>
          {UI_TEXT.joinChannelScreen.proofButton}
        </button>
        <button 
          className={styles.checkButton} 
          onClick={handleCheck}
          disabled={isLoading}
        >
          {isLoading && <span className={styles.spinner}></span>}
          {UI_TEXT.joinChannelScreen.checkButton}
        </button>
      </div>
      
      {error && <p className={styles.error}>{error}</p>}
    </div>
  )
}
