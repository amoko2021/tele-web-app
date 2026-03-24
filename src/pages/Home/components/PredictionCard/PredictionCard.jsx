import { useNavigate } from 'react-router-dom'
import { useTournament, useCountdown } from '../../../../hooks'
import { UI_TEXT } from '../../../../config/uiText'

export const PredictionCard = ({ isToday, isDrawingTime }) => {
  const navigate = useNavigate()
  const { minutesRemaining, secondsRemaining, isResultPhase, id: tournamentId } = useTournament()
  const { hours: dailyHours, minutes: dailyMinutes, seconds: dailySeconds } = useCountdown(18, 30)

  const formatNumber = (num) => num.toString().padStart(2, '0')

  // Only show countdown if it's today and not during drawing time
  const showTournamentCountdown = isToday && !isDrawingTime && !isResultPhase
  const showDailyCountdown = isToday && !isDrawingTime

  return (
    <div className="px-4 pt-4">
      <div className="flex flex-col rounded-2xl bg-white border border-primary/15 shadow-xl shadow-primary/5 overflow-hidden">
        {/* Top Section: Countdowns */}
        <div className="bg-slate-50/80 border-b border-slate-100 p-3 grid grid-cols-2 gap-4">
          {/* Hourly Tournament Countdown */}
          <div className="flex flex-col items-center justify-center border-r border-slate-200 pr-2">
            <span className="text-[9px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">
              {UI_TEXT.prediction.freeTab} {tournamentId && `#${tournamentId}`}
            </span>
{showTournamentCountdown && (minutesRemaining > 0 || secondsRemaining > 0) ? (
               <div className="flex items-center gap-1.5">
                 <div className="flex flex-col items-center">
                   <span className="text-lg font-black bg-gradient-to-br from-indigo-600 to-purple-700 bg-clip-text text-transparent font-mono leading-none">
                     {formatNumber(minutesRemaining)}
                   </span>
                   <span className="text-[7px] font-bold text-slate-400 uppercase mt-0.5">{UI_TEXT.home.countdown.minutes}</span>
                 </div>
                 <span className="text-sm font-bold text-slate-300 pb-2">:</span>
                 <div className="flex flex-col items-center">
                   <span className="text-lg font-black bg-gradient-to-br from-indigo-600 to-purple-700 bg-clip-text text-transparent font-mono leading-none">
                     {formatNumber(secondsRemaining)}
                   </span>
                   <span className="text-[7px] font-bold text-slate-400 uppercase mt-0.5">{UI_TEXT.home.countdown.seconds}</span>
                 </div>
               </div>
             ) : isResultPhase || (minutesRemaining === 0 && secondsRemaining === 0) ? (
               <button
                 onClick={() => navigate('prediction')}
                 className="flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-blue-600 to-sky-600 px-2 py-1 text-xs font-bold text-white shadow-md shadow-blue-100 active:scale-95 transition-all"
               >
                 <span>{UI_TEXT.home.results.result}</span>
                 <span className="material-symbols-outlined text-xs">arrow_forward</span>
               </button>
             ) : (
               <span className="text-[10px] font-bold text-slate-400 uppercase">--:--</span>
             )}
          </div>

          {/* Daily XSMB Countdown */}
          <div className="flex flex-col items-center justify-center">
            <span className="text-[9px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">
              {UI_TEXT.prediction.ticketTab}
            </span>
            {showDailyCountdown ? (
              <div className="flex items-center gap-1.5">
                <div className="flex flex-col items-center">
                  <span className="text-lg font-black bg-gradient-to-br from-blue-600 to-sky-700 bg-clip-text text-transparent font-mono leading-none">
                    {formatNumber(dailyHours)}
                  </span>
                  <span className="text-[7px] font-bold text-slate-400 uppercase mt-0.5">{UI_TEXT.home.countdown.hours}</span>
                </div>
                <span className="text-sm font-bold text-slate-300 pb-2">:</span>
                <div className="flex flex-col items-center">
                  <span className="text-lg font-black bg-gradient-to-br from-blue-600 to-sky-700 bg-clip-text text-transparent font-mono leading-none">
                    {formatNumber(dailyMinutes)}
                  </span>
                  <span className="text-[7px] font-bold text-slate-400 uppercase mt-0.5">{UI_TEXT.home.countdown.minutes}</span>
                </div>
                <span className="text-sm font-bold text-slate-300 pb-2">:</span>
                <div className="flex flex-col items-center">
                  <span className="text-lg font-black bg-gradient-to-br from-blue-600 to-sky-700 bg-clip-text text-transparent font-mono leading-none">
                    {formatNumber(dailySeconds)}
                  </span>
                  <span className="text-[7px] font-bold text-slate-400 uppercase mt-0.5">{UI_TEXT.home.countdown.seconds}</span>
                </div>
              </div>
            ) : (
              <span className="text-[10px] font-bold text-slate-400 uppercase">--:--:--</span>
            )}
          </div>
        </div>

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
