import { useState, useEffect } from 'react'
import { UI_TEXT } from '../../../../config/uiText'

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
      const target = new Date(now)
      target.setHours(18, 30, 0, 0)

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
  const timerString = `${formatNumber(timeLeft.hours)}:${formatNumber(timeLeft.minutes)}:${formatNumber(timeLeft.seconds)}`

  return (
    <div className="flex items-center justify-between rounded-xl bg-white border border-primary/20 p-2 shadow-lg shadow-primary/10 transition-all mb-3">
      <div className="flex items-center gap-2.5">
        <div className="flex size-8 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 text-white">
          <span className="material-symbols-outlined text-xl">
            schedule
          </span>
        </div>
        <div className="flex flex-col items-start min-w-0">
          <span className="font-bold text-xs whitespace-nowrap text-slate-800">
            {UI_TEXT.home.countdown.nextDraw}
          </span>
          <span className="text-[10px] text-slate-500 whitespace-nowrap">
            18:30 (GMT+7)
          </span>
        </div>
      </div>
      <div className="flex items-center gap-1.5 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-600 px-2.5 py-1 text-[13px] font-bold text-white whitespace-nowrap flex-shrink-0 font-mono">
        <span>{timerString}</span>
      </div>
    </div>
  )
}
