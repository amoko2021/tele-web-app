import { useState } from 'react'
import { UI_TEXT } from '../../../config/uiText'
import styles from './JoinChannelScreen.module.css'

export const JoinChannelScreen = ({ onCheck }) => {
  const [error, setError] = useState('')
  const channelUrl = 'https://t.me/lamgiau_online' // Placeholder

  const handleJoin = () => {
    if (window.Telegram?.WebApp?.openTelegramLink) {
      window.Telegram.WebApp.openTelegramLink(channelUrl)
    } else {
      window.open(channelUrl, '_blank')
    }
  }

  const handleCheck = async () => {
    setError('')
    try {
      const success = await onCheck()
      if (!success) {
        setError(UI_TEXT.joinChannelScreen.error)
      }
    } catch {
      setError(UI_TEXT.common.error)
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
        <button className={styles.checkButton} onClick={handleCheck}>
          {UI_TEXT.joinChannelScreen.checkButton}
        </button>
      </div>
      
      {error && <p className={styles.error}>{error}</p>}
    </div>
  )
}
