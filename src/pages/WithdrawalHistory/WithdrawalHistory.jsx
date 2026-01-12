import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { WithdrawalHistoryItem } from '../Account/components/WithdrawalHistoryItem'
import { userApi } from '../../services/api'
import { useTelegram } from '../../hooks/useTelegram'
import { UI_TEXT } from '../../config/uiText'

export const WithdrawalHistory = () => {
  const navigate = useNavigate()
  const { validationData, user: telegramUser } = useTelegram()
  const [transactions, setTransactions] = useState([])
  const [loading, setLoading] = useState(true)
  const [total, setTotal] = useState(0)

  const userData = validationData?.data?.user || telegramUser
  const userId = userData?.id

  useEffect(() => {
    if (userId) {
      fetchTransactions()
    }
  }, [userId])

  const fetchTransactions = async () => {
    setLoading(true)
    try {
      const response = await userApi.getWithdrawalHistory(userId)
      // Response format: { ok: true, data: [...], total: 6 }
      if (response.ok) {
        setTransactions(response.data || [])
        setTotal(response.total || 0)
      }
    } catch (error) {
      console.error('Error fetching withdrawal history:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex flex-col h-full pb-20">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-4 border-b border-slate-100 dark:border-slate-800 shrink-0 bg-white dark:bg-slate-900">
        <button
          onClick={() => navigate(-1)}
          className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors text-slate-500 dark:text-slate-400"
        >
          <span className="material-symbols-outlined">arrow_back</span>
        </button>
        <h1 className="text-slate-900 dark:text-white text-lg font-bold">
          {UI_TEXT.withdrawal.history.title}
        </h1>
        <div className="w-10"></div>
      </div>

      {/* Transaction List */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        ) : transactions.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20">
            <span className="material-symbols-outlined text-6xl text-slate-300 dark:text-slate-700 mb-3">
              receipt_long
            </span>
            <p className="text-slate-500 dark:text-slate-400 text-sm">
              {UI_TEXT.withdrawal.history.empty}
            </p>
          </div>
        ) : (
          <>
            {transactions.map((transaction) => (
              <WithdrawalHistoryItem
                key={transaction.id}
                transaction={transaction}
              />
            ))}
            <div className="py-4 text-center">
              <p className="text-xs text-slate-400 dark:text-slate-600">
                {UI_TEXT.withdrawal.history.showing.replace('{count}', transactions.length).replace('{total}', total)}
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

