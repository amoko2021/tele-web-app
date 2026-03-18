import { useState } from 'react'
import { UI_TEXT } from '../../../../config/uiText'
import { useTelegram } from '../../../../hooks/useTelegram'
import { TicketTopUpModal } from '../TicketTopUpModal'
import { TicketConvertModal } from '../TicketConvertModal'
import { userApi } from '../../../../services/api'

export const BalanceStats = ({ balance = 0, coins = 0, points = 340, onUpdate }) => {
  const [isTopUpOpen, setIsTopUpOpen] = useState(false)
  const [isConvertModalOpen, setIsConvertModalOpen] = useState(false)
  const [isConverting, setIsConverting] = useState(false)
  const { user } = useTelegram()
  const CONVERSION_RATE = 100000

  const handleConvert = async (ticketAmount) => {
    const totalCost = ticketAmount * CONVERSION_RATE
    
    if (coins < totalCost) {
      alert(UI_TEXT.account.topUp.insufficientCoins.replace('{coins}', totalCost.toLocaleString()))
      return
    }

    const confirmMsg = UI_TEXT.account.topUp.convertConfirm
      .replace('{coins}', totalCost.toLocaleString())
      .replace('{tickets}', ticketAmount)
      
    if (!window.confirm(confirmMsg)) return

    try {
      setIsConverting(true)
      setIsConvertModalOpen(false)
      
      // 1. Add tickets
      await userApi.addTicket(user.id, ticketAmount)
      
      // 2. Deduct coins (API updateCoins cộng thêm, nên truyền giá trị âm để trừ)
      await userApi.updateCoins(user.id, -totalCost)
      
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
        {/* Coin Balance (Rewards) */}
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
              onClick={() => setIsConvertModalOpen(true)}
              disabled={isConverting}
              className="text-[10px] font-bold text-emerald-600 bg-emerald-50 dark:bg-emerald-900/20 px-2 py-0.5 rounded-full hover:bg-emerald-100 transition-colors disabled:opacity-50"
            >
              {isConverting ? '...' : UI_TEXT.account.topUp.convertButton}
            </button>
          </div>
          <p className="text-slate-900 dark:text-white text-2xl font-bold tracking-tight">
            {coins.toLocaleString()}
          </p>
        </div>

        {/* Reward Points (Tickets) */}
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

      {/* Withdrawal Balance (Real Money) */}
      <div className="mt-3 flex items-center justify-between p-4 rounded-xl bg-gradient-to-r from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-900 border border-slate-100 dark:border-slate-700">
        <div className="flex items-center gap-3">
          <div className="size-10 rounded-full bg-white dark:bg-slate-700 flex items-center justify-center text-emerald-500 shadow-sm">
            <span className="material-symbols-outlined">account_balance_wallet</span>
          </div>
          <div>
            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
              {UI_TEXT.account.balance.withdrawBalance}
            </p>
            <p className="text-lg font-black text-slate-900 dark:text-white">
              {balance.toLocaleString()} <span className="text-xs font-medium text-slate-400">đ</span>
            </p>
          </div>
        </div>
      </div>

      <TicketTopUpModal 
        isOpen={isTopUpOpen} 
        onClose={() => setIsTopUpOpen(false)} 
        userId={user?.id}
      />

      <TicketConvertModal
        isOpen={isConvertModalOpen}
        onClose={() => setIsConvertModalOpen(false)}
        onConvert={handleConvert}
        balance={coins}
        rate={CONVERSION_RATE}
      />
    </>
  )
}

