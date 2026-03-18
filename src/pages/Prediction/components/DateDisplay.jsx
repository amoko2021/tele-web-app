import { useState, useEffect } from 'react'
import { UI_TEXT } from '../../../config/uiText'

export const DateDisplay = () => {
  const [dateStr, setDateStr] = useState('')

  useEffect(() => {
    const now = new Date()
    const formatter = new Intl.DateTimeFormat('en-GB', {
      timeZone: 'Asia/Ho_Chi_Minh',
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    })

    // If it's after 19:00 VN time, show tomorrow's date
    const vnDateStr = now.toLocaleString('en-US', {
      timeZone: 'Asia/Ho_Chi_Minh',
    })
    const vnDate = new Date(vnDateStr)
    if (vnDate.getHours() >= 19) {
      vnDate.setDate(vnDate.getDate() + 1)
    }

    setDateStr(formatter.format(vnDate))
  }, [])

  return (
    <div className="px-4 pt-6 pb-2">
      <div className="flex items-center justify-between bg-white rounded-xl px-4 py-3 border border-slate-100 shadow-sm">
        <div className="flex items-center gap-2 text-slate-500">
          <span className="material-symbols-outlined text-sm">
            calendar_today
          </span>
          <span className="text-sm font-semibold">{UI_TEXT.prediction.title}</span>
        </div>
        <span className="text-sm font-bold text-slate-900">{dateStr}</span>
      </div>
    </div>
  )
}
