import React, { memo } from 'react'
import styles from '../GiftRain.module.css'

export const Gift = memo(({ id, emoji, value, left, animationDuration, onCollect }) => {
  const handleClick = (e) => {
    e.stopPropagation()
    // Get coordinates for floating text
    // Support both mouse and touch events
    const clientX = e.clientX || (e.touches && e.touches[0]?.clientX)
    const clientY = e.clientY || (e.touches && e.touches[0]?.clientY)
    
    if (clientX && clientY) {
      onCollect(id, value, clientX, clientY)
    }
  }

  return (
    <div
      className={styles.gift}
      style={{
        left: left,
        animationDuration: animationDuration
      }}
      onMouseDown={handleClick}
      onTouchStart={handleClick}
    >
      {emoji}
    </div>
  )
})

Gift.displayName = 'Gift'
