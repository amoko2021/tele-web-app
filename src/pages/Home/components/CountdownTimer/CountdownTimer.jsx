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

  return (
    <div className="flex flex-col items-center justify-center rounded-xl bg-white border border-primary/20 p-4 shadow-lg shadow-primary/10 transition-all mb-4">
      <div className="font-bold text-xs text-slate-800 uppercase tracking-wider mb-3">
        {UI_TEXT.home.countdown.nextDraw}
      </div>
      
      <div className="flex items-center gap-4">
        {/* Hours */}
        <div className="flex flex-col items-center">
          <div className="text-3xl font-black bg-gradient-to-br from-indigo-500 to-purple-600 bg-clip-text text-transparent font-mono leading-none">
            {formatNumber(timeLeft.hours)}
          </div>
          <div className="text-[9px] font-bold text-slate-400 uppercase mt-1">
            {UI_TEXT.home.countdown.hours}
          </div>
        </div>

        <div className="text-xl font-bold text-slate-300 pb-4">:</div>

        {/* Minutes */}
        <div className="flex flex-col items-center">
          <div className="text-3xl font-black bg-gradient-to-br from-indigo-500 to-purple-600 bg-clip-text text-transparent font-mono leading-none">
            {formatNumber(timeLeft.minutes)}
          </div>
          <div className="text-[9px] font-bold text-slate-400 uppercase mt-1">
            {UI_TEXT.home.countdown.minutes}
          </div>
        </div>

        <div className="text-xl font-bold text-slate-300 pb-4">:</div>

        {/* Seconds */}
        <div className="flex flex-col items-center">
          <div className="text-3xl font-black bg-gradient-to-br from-indigo-500 to-purple-600 bg-clip-text text-transparent font-mono leading-none">
            {formatNumber(timeLeft.seconds)}
          </div>
          <div className="text-[9px] font-bold text-slate-400 uppercase mt-1">
            {UI_TEXT.home.countdown.seconds}
          </div>
        </div>
      </div>
    </div>
  )
}
