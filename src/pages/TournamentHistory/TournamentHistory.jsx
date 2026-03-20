import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import lotteryApi from '../../services/api/lotteryApi'
import { useTelegram } from '../../hooks/useTelegram'
import { UI_TEXT } from '../../config/uiText'

export const TournamentHistory = () => {
  const navigate = useNavigate()
  const { user } = useTelegram()
  const userId = user?.id
  const [history, setHistory] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (userId) {
      fetchHistory()
    }
  }, [userId])

  const fetchHistory = async () => {
    setLoading(true)
    try {
      const response = await lotteryApi.getTournamentHistory()
      if (response && response.data) {
        setHistory(response.data)
      }
    } catch (error) {
      console.error('Error fetching tournament history:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex flex-col h-full bg-slate-50 pb-20">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-4 border-b border-slate-100 shrink-0 bg-white">
        <button
          onClick={() => navigate(-1)}
          className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-slate-100 transition-colors text-slate-500"
        >
          <span className="material-symbols-outlined">arrow_back</span>
        </button>
        <h1 className="text-slate-900 text-lg font-bold">
          {UI_TEXT.prediction.tournamentHistory.title}
        </h1>
        <div className="w-10"></div>
      </div>

      {/* History List */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        ) : history.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20">
            <span className="material-symbols-outlined text-6xl text-slate-300 mb-3">
              history
            </span>
            <p className="text-slate-500 text-sm">
              {UI_TEXT.prediction.tournamentHistory.empty}
            </p>
          </div>
        ) : (
          history.map((item) => (
            <div key={item.id} className="bg-white rounded-xl p-4 shadow-sm border border-slate-100">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="font-bold text-slate-800">
                    {UI_TEXT.prediction.tournamentHistory.hour.replace('{hour}', item.hour)}
                  </h3>
                  <p className="text-[10px] text-slate-400 uppercase tracking-wider">
                    {item.date}
                  </p>
                </div>
                <span className={`px-2 py-1 rounded-md text-[10px] font-bold uppercase ${
                  item.reward_status === 'won' 
                    ? 'bg-emerald-100 text-emerald-600' 
                    : 'bg-slate-100 text-slate-500'
                }`}>
                  {item.reward_status === 'won' 
                    ? UI_TEXT.prediction.tournamentHistory.win 
                    : UI_TEXT.prediction.tournamentHistory.lose}
                </span>
              </div>
              
              <div className="flex flex-wrap gap-2 mt-3">
                {Object.entries(item.winning_numbers || {}).map(([prize, numbers]) => (
                  <div key={prize} className="flex items-center gap-1 bg-slate-50 px-2 py-1 rounded-lg border border-slate-100">
                    <span className="text-[10px] font-bold text-slate-400">{prize}:</span>
                    <span className="text-xs font-bold text-slate-700">{numbers.join(', ')}</span>
                  </div>
                ))}
              </div>

              {item.reward_status === 'won' && (
                <div className="mt-3 pt-3 border-t border-slate-50 flex items-center gap-2 text-emerald-600">
                  <span className="material-symbols-outlined text-sm">payments</span>
                  <span className="text-xs font-bold">
                    {UI_TEXT.prediction.tournamentHistory.reward.replace('{amount}', item.reward_amount.toLocaleString())}
                  </span>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  )
}
