import { useState } from 'react'
import { UI_TEXT } from '../../../../config/uiText'
import { useTelegram } from '../../../../hooks/useTelegram'
import { TicketTopUpModal } from '../TicketTopUpModal'
import { userApi } from '../../../../services/api'

export const BalanceStats = ({ balance = 0, points = 340, onUpdate }) => {
  const [isTopUpOpen, setIsTopUpOpen] = useState(false)
  const [isConverting, setIsConverting] = useState(false)
  const { user } = useTelegram()
  const CONVERSION_RATE = 26000

  const handleConvert = async () => {
    if (balance < CONVERSION_RATE) {
      alert(UI_TEXT.account.topUp.insufficientCoins.replace('{coins}', CONVERSION_RATE.toLocaleString()))
      return
    }

    const confirmMsg = UI_TEXT.account.topUp.convertConfirm.replace('{coins}', CONVERSION_RATE.toLocaleString())
    if (!window.confirm(confirmMsg)) return

    try {
      setIsConverting(true)
      // 1. Add ticket
      await userApi.addTicket(user.id, 1)
      // 2. Deduct coins
      const newBalance = balance - CONVERSION_RATE
      await userApi.updateBalance(user.id, newBalance)
      
      alert(UI_TEXT.account.topUp.convertSuccess)
      if (onUpdate) onUpdate()
    } catch (error) {
      console.error('Conversion failed:', error)
      alert(UI_TEXT.common.error)
    } finally {
      setIsConverting(false)
    }
  }

  return (
    <>
      <div className="grid grid-cols-2 gap-3">
        {/* Coin Balance */}
        <div className="flex flex-col gap-1 p-4 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700">
          <div className="flex items-center justify-between mb-1">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-primary text-[20px]">
                monetization_on
              </span>
              <span className="text-slate-500 dark:text-slate-400 text-xs font-medium uppercase tracking-wider">
                {UI_TEXT.account.balance.label}
              </span>
            </div>
            <button 
              onClick={handleConvert}
              disabled={isConverting}
              className="text-[10px] font-bold text-emerald-600 bg-emerald-50 dark:bg-emerald-900/20 px-2 py-0.5 rounded-full hover:bg-emerald-100 transition-colors disabled:opacity-50"
            >
              {isConverting ? '...' : UI_TEXT.account.topUp.convertButton}
            </button>
          </div>
          <p className="text-slate-900 dark:text-white text-2xl font-bold tracking-tight">
            {balance.toLocaleString()}
          </p>
        </div>

        {/* Reward Points */}
        <div className="flex flex-col gap-1 p-4 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700">
          <div className="flex items-center justify-between mb-1">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-orange-500 text-[20px]">
                local_activity
              </span>
              <span className="text-slate-500 dark:text-slate-400 text-xs font-medium uppercase tracking-wider">
                {UI_TEXT.account.balance.points}
              </span>
            </div>
            <button 
              onClick={() => setIsTopUpOpen(true)}
              className="text-[10px] font-bold text-primary bg-primary/10 px-2 py-0.5 rounded-full hover:bg-primary/20 transition-colors"
            >
              {UI_TEXT.account.topUp.topUpButton}
            </button>
          </div>
          <p className="text-slate-900 dark:text-white text-2xl font-bold tracking-tight">
            {points}
          </p>
        </div>
      </div>

      <TicketTopUpModal 
        isOpen={isTopUpOpen} 
        onClose={() => setIsTopUpOpen(false)} 
        userId={user?.id}
      />
    </>
  )
}

