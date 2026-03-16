import { useNavigate } from 'react-router-dom'
import { useCountdown } from '../../../../hooks'
import { UI_TEXT } from '../../../../config/uiText'

export const PredictionCard = ({ isToday, isDrawingTime }) => {
  const navigate = useNavigate()
  const { hours, minutes, seconds } = useCountdown(18)

  const formatNumber = (num) => num.toString().padStart(2, '0')

  // Only show countdown if it's today and not during drawing time
  const showCountdown = isToday && !isDrawingTime

  return (
    <div className="px-4 pt-4">
      <div className="flex flex-col rounded-2xl bg-white border border-primary/15 shadow-xl shadow-primary/5 overflow-hidden">
        {/* Top Section: Countdown (Only if applicable) */}
        {showCountdown && (
          <div className="bg-slate-50/80 border-b border-slate-100 p-3 flex flex-col items-center justify-center">
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2">
              {UI_TEXT.home.countdown.nextDraw}
            </span>
            <div className="flex items-center gap-3">
              <div className="flex flex-col items-center">
                <span className="text-2xl font-black bg-gradient-to-br from-indigo-600 to-purple-700 bg-clip-text text-transparent font-mono leading-none">
                  {formatNumber(hours)}
                </span>
                <span className="text-[8px] font-bold text-slate-400 uppercase mt-1">{UI_TEXT.home.countdown.hours}</span>
              </div>
              <span className="text-lg font-bold text-slate-300 pb-3">:</span>
              <div className="flex flex-col items-center">
                <span className="text-2xl font-black bg-gradient-to-br from-indigo-600 to-purple-700 bg-clip-text text-transparent font-mono leading-none">
                  {formatNumber(minutes)}
                </span>
                <span className="text-[8px] font-bold text-slate-400 uppercase mt-1">{UI_TEXT.home.countdown.minutes}</span>
              </div>
              <span className="text-lg font-bold text-slate-300 pb-3">:</span>
              <div className="flex flex-col items-center">
                <span className="text-2xl font-black bg-gradient-to-br from-indigo-600 to-purple-700 bg-clip-text text-transparent font-mono leading-none">
                  {formatNumber(seconds)}
                </span>
                <span className="text-[8px] font-bold text-slate-400 uppercase mt-1">{UI_TEXT.home.countdown.seconds}</span>
              </div>
            </div>
          </div>
        )}

        {/* Bottom Section: Task Info & Action */}
        <div className="p-3 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-sky-600 text-white shadow-lg shadow-blue-200">
              <span className="material-symbols-outlined text-2xl">
                query_stats
              </span>
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-sm text-slate-800">
                {UI_TEXT.home.prediction.title}
              </span>
              <span className="text-[11px] font-medium text-blue-600">
                +999,000 Coins
              </span>
            </div>
          </div>

          <button
            onClick={() => navigate('prediction')}
            className="flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-blue-600 to-sky-600 px-4 py-2 text-xs font-bold text-white shadow-md shadow-blue-100 active:scale-95 transition-all"
          >
            <span>{UI_TEXT.home.tasks.join}</span>
            <span className="material-symbols-outlined text-sm">arrow_forward</span>
          </button>
        </div>
      </div>
    </div>
  )
}
