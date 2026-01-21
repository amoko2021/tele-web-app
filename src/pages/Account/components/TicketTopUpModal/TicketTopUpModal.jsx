import { UI_TEXT } from '../../../../config/uiText'
import { Modal } from '../../../../components/common/Modal/Modal'
import { useState } from 'react'

export const TicketTopUpModal = ({ isOpen, onClose, userId }) => {
  const [copied, setCopied] = useState(null)

  const handleCopy = (text, type) => {
    if (!text) return
    navigator.clipboard.writeText(text)
    setCopied(type)
    setTimeout(() => setCopied(null), 2000)
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={UI_TEXT.account.topUp.title}>
      <div className="flex flex-col gap-6">
        <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
          {UI_TEXT.account.topUp.description}
        </p>

        {/* User ID Section */}
        <div className="p-4 rounded-xl bg-primary/5 border border-primary/10">
          <label className="text-xs font-semibold text-primary uppercase tracking-wider mb-2 block">
            {UI_TEXT.account.topUp.idLabel}
          </label>
          <div className="flex items-center justify-between gap-3">
            <code className="text-lg font-bold text-slate-900 dark:text-white">
              {userId || 'N/A'}
            </code>
            <button
              onClick={() => handleCopy(userId?.toString(), 'id')}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-primary text-white text-sm font-medium hover:bg-primary-hover transition-colors"
            >
              <span className="material-symbols-outlined text-[18px]">
                {copied === 'id' ? 'check' : 'content_copy'}
              </span>
              {copied === 'id' ? UI_TEXT.common.copied : UI_TEXT.account.topUp.copyId}
            </button>
          </div>
        </div>

        {/* Payment Options */}
        <div className="flex flex-col gap-4">
          {/* PayPal */}
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700">
            <div className="flex items-center gap-2 mb-3">
              <span className="material-symbols-outlined text-blue-600">payments</span>
              <span className="font-bold text-slate-800 dark:text-slate-200">
                {UI_TEXT.account.topUp.paypal}
              </span>
            </div>
            <div className="flex items-center justify-between gap-2">
              <span className="text-sm text-slate-600 dark:text-slate-400 break-all">
                {UI_TEXT.account.topUp.paypalEmail}
              </span>
              <button
                onClick={() => handleCopy(UI_TEXT.account.topUp.paypalEmail, 'paypal')}
                className="p-2 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-500 transition-colors"
              >
                <span className="material-symbols-outlined text-[20px]">
                  {copied === 'paypal' ? 'check' : 'content_copy'}
                </span>
              </button>
            </div>
          </div>

          {/* Crypto */}
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700">
            <div className="flex items-center gap-2 mb-3">
              <span className="material-symbols-outlined text-orange-500">currency_bitcoin</span>
              <span className="font-bold text-slate-800 dark:text-slate-200">
                {UI_TEXT.account.topUp.crypto}
              </span>
            </div>
            <div className="flex items-center justify-between gap-2">
              <span className="text-sm text-slate-600 dark:text-slate-400 break-all font-mono">
                {UI_TEXT.account.topUp.cryptoAddress}
              </span>
              <button
                onClick={() => handleCopy(UI_TEXT.account.topUp.cryptoAddress, 'crypto')}
                className="p-2 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-500 transition-colors"
              >
                <span className="material-symbols-outlined text-[20px]">
                  {copied === 'crypto' ? 'check' : 'content_copy'}
                </span>
              </button>
            </div>
          </div>
        </div>

        <button
          onClick={onClose}
          className="w-full py-3 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 font-bold hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
        >
          {UI_TEXT.common.close}
        </button>
      </div>
    </Modal>
  )
}
