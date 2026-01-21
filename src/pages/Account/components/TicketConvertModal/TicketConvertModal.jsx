import { useState } from 'react'
import { UI_TEXT } from '../../../../config/uiText'
import { Modal } from '../../../../components/common/Modal/Modal'

export const TicketConvertModal = ({ isOpen, onClose, onConvert, balance, rate }) => {
  const [amount, setAmount] = useState(1)

  const totalCoins = amount * rate
  const canConvert = balance >= totalCoins && amount > 0

  const handleConfirm = () => {
    if (canConvert) {
      onConvert(amount)
    }
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={UI_TEXT.account.topUp.convertTitle}>
      <div className="flex flex-col gap-6">
        <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700">
          <p className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-3">
            {UI_TEXT.account.topUp.convertRate.replace('{coins}', rate.toLocaleString())}
          </p>
          
          <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">
            {UI_TEXT.account.topUp.convertLabel}
          </label>
          
          <div className="flex items-center gap-4">
            <button
              onClick={() => setAmount(Math.max(1, amount - 1))}
              className="size-10 rounded-lg bg-slate-200 dark:bg-slate-700 flex items-center justify-center text-xl font-bold"
            >
              -
            </button>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(Math.max(1, parseInt(e.target.value) || 0))}
              className="flex-1 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg py-2 text-center text-lg font-bold outline-none focus:border-primary"
            />
            <button
              onClick={() => setAmount(amount + 1)}
              className="size-10 rounded-lg bg-slate-200 dark:bg-slate-700 flex items-center justify-center text-xl font-bold"
            >
              +
            </button>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <div className="flex justify-between text-sm">
            <span className="text-slate-500">{UI_TEXT.account.balance.label}</span>
            <span className="font-bold text-slate-900 dark:text-white">{balance.toLocaleString()}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-slate-500">{UI_TEXT.account.topUp.convertTotal.replace('{coins}', '')}</span>
            <span className={`font-bold ${balance < totalCoins ? 'text-red-500' : 'text-primary'}`}>
              {totalCoins.toLocaleString()} Coins
            </span>
          </div>
        </div>

        {balance < totalCoins && (
          <p className="text-xs text-red-500 font-medium text-center">
            {UI_TEXT.account.topUp.insufficientCoins.replace('{coins}', totalCoins.toLocaleString())}
          </p>
        )}

        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={onClose}
            className="w-full py-3 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 font-bold hover:bg-slate-200 transition-colors"
          >
            {UI_TEXT.common.cancel}
          </button>
          <button
            onClick={handleConfirm}
            disabled={!canConvert}
            className="w-full py-3 rounded-xl bg-primary text-white font-bold hover:bg-primary-hover transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {UI_TEXT.common.confirm}
          </button>
        </div>
      </div>
    </Modal>
  )
}
