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
        <div className="flex flex-col p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
              {UI_TEXT.account.balance.label}
            </span>
            <button
              onClick={() => setIsConvertModalOpen(true)}
              disabled={isConverting}
              className="size-7 flex items-center justify-center rounded-full bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-100 transition-colors disabled:opacity-50"
              title={UI_TEXT.account.topUp.convertButton}
            >
              <span className="material-symbols-outlined text-lg">sync</span>
            </button>
          </div>
          <div className="flex items-baseline gap-1">
            <span className="text-2xl font-black text-slate-900 dark:text-white">
              {coins.toLocaleString()}
            </span>
          </div>
        </div>

        {/* Reward Points (Tickets) */}
        <div className="flex flex-col p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
              {UI_TEXT.account.balance.points}
            </span>
            <button
              onClick={() => setIsTopUpOpen(true)}
              className="size-7 flex items-center justify-center rounded-full bg-primary/5 text-primary hover:bg-primary/10 transition-colors"
              title={UI_TEXT.account.topUp.topUpButton}
            >
              <span className="material-symbols-outlined text-lg">add</span>
            </button>
          </div>
          <div className="flex items-baseline gap-1">
            <span className="text-2xl font-black text-slate-900 dark:text-white">
              {points}
            </span>
          </div>
        </div>
      </div>

      {/* Withdrawal Balance (Real Money) */}
      <div className="mt-3 p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="size-10 rounded-xl bg-emerald-50 dark:bg-emerald-500/10 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
              <span className="material-symbols-outlined">account_balance_wallet</span>
            </div>
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                {UI_TEXT.account.balance.withdrawBalance}
              </p>
              <p className="text-xl font-black text-slate-900 dark:text-white">
                {balance.toLocaleString()} <span className="text-xs font-medium text-slate-400">đ</span>
              </p>
            </div>
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

