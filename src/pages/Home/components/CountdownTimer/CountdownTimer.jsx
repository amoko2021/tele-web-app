import { useState, useEffect } from 'react'
import { UI_TEXT } from '../../../../config/uiText'
import styles from './CountdownTimer.module.css'

export const CountdownTimer = () => {
  const [timeLeft, setTimeLeft] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0,
  })

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date()
      
      // Target time: 18:30 in Asia/Ho_Chi_Minh
      // We calculate the target date in the local timezone first, then adjust
      const target = new Date(now)
      target.setHours(18, 30, 0, 0)

      // If it's already past 18:30, target is tomorrow
      if (now > target) {
        target.setDate(target.getDate() + 1)
      }

      const difference = target - now

      if (difference > 0) {
        setTimeLeft({
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        })
      }
    }

    calculateTimeLeft()
    const timer = setInterval(calculateTimeLeft, 1000)

    return () => clearInterval(timer)
  }, [])

  const formatNumber = (num) => num.toString().padStart(2, '0')

  return (
    <div className={styles.container}>
      <div className={styles.label}>{UI_TEXT.home.countdown.nextDraw}</div>
      <div className={styles.timer}>
        <div className={styles.timeUnit}>
          <span className={styles.number}>{formatNumber(timeLeft.hours)}</span>
          <span className={styles.unit}>{UI_TEXT.home.countdown.hours}</span>
        </div>
        <div className={styles.separator}>:</div>
        <div className={styles.timeUnit}>
          <span className={styles.number}>{formatNumber(timeLeft.minutes)}</span>
          <span className={styles.unit}>{UI_TEXT.home.countdown.minutes}</span>
        </div>
        <div className={styles.separator}>:</div>
        <div className={styles.timeUnit}>
          <span className={styles.number}>{formatNumber(timeLeft.seconds)}</span>
          <span className={styles.unit}>{UI_TEXT.home.countdown.seconds}</span>
        </div>
      </div>
    </div>
  )
}
