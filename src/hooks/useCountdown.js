import { useState, useEffect } from 'react'

/**
 * Hook to calculate time left until a target time (default 18:30 VN)
 * @param {number} targetHour 
 * @param {number} targetMinute 
 * @returns {Object} { hours, minutes, seconds, formatted }
 */
export const useCountdown = (targetHour = 18, targetMinute = 30) => {
  const [timeLeft, setTimeLeft] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0,
  })

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date()
      
      // Target time in Asia/Ho_Chi_Minh
      // We use the local time of the user but set to the target hour/minute
      // Note: This assumes the user's device is in the same timezone or we want to show 18:30 local.
      // The original CountdownTimer used local time but intended for VN time.
      const target = new Date(now)
      target.setHours(targetHour, targetMinute, 0, 0)

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
      } else {
        setTimeLeft({ hours: 0, minutes: 0, seconds: 0 })
      }
    }

    calculateTimeLeft()
    const timer = setInterval(calculateTimeLeft, 1000)

    return () => clearInterval(timer)
  }, [targetHour, targetMinute])

  const formatNumber = (num) => num.toString().padStart(2, '0')

  return {
    ...timeLeft,
    formatted: `${formatNumber(timeLeft.hours)}:${formatNumber(timeLeft.minutes)}:${formatNumber(timeLeft.seconds)}`
  }
}
