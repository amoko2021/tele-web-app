import { useState } from 'react'
import { WithdrawalConfirmModal } from '../WithdrawalConfirmModal'

export const WithdrawalModal = ({ isOpen, onClose, onSubmit, bankInfo }) => {
  const [amount, setAmount] = useState('')
  const [showConfirm, setShowConfirm] = useState(false)

  if (!isOpen) return null

  const handleNext = () => {
    const amountNum = parseInt(amount.replace(/\D/g, ''))
    if (!amountNum || amountNum < 50000) {
      alert('Số tiền rút tối thiểu là 50.000 đ')
      return
    }
    setShowConfirm(true)
  }

  const handleConfirm = async () => {
    const amountNum = parseInt(amount.replace(/\D/g, ''))
    await onSubmit(amountNum)
    setShowConfirm(false)
    setAmount('')
    onClose()
  }

  const handleClose = () => {
    setAmount('')
    setShowConfirm(false)
    onClose()
  }

  const formatNumber = (value) => {
    const num = value.replace(/\D/g, '')
    return num ? parseInt(num).toLocaleString() : ''
  }

  return (
    <>
      {/* Main Withdrawal Modal */}
      {!showConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            onClick={handleClose}
          ></div>

          <div className="relative w-full max-w-md bg-white dark:bg-slate-900 rounded-xl shadow-2xl border border-slate-100 dark:border-slate-700">
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100 dark:border-slate-700">
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                Rút tiền
              </h2>
              <button
                onClick={handleClose}
                className="text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors rounded-full p-1 hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                <span className="material-symbols-outlined text-xl">close</span>
              </button>
            </div>

            {/* Body */}
            <div className="p-5 space-y-5">
              {/* Amount Input */}
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Số tiền muốn rút
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={formatNumber(amount)}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="0"
                    className="w-full px-4 py-3 text-2xl font-bold text-center border border-slate-200 dark:border-slate-700 rounded-lg bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 text-lg">
                    đ
                  </span>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">
                  Số tiền rút tối thiểu: 50.000 đ
                </p>
              </div>

              {/* Bank Info */}
              {bankInfo && (
                <div className="bg-slate-50 dark:bg-slate-800/50 rounded-lg p-4 border border-slate-100 dark:border-slate-700">
                  <p className="text-xs text-slate-500 dark:text-slate-400 mb-2">
                    Rút về tài khoản
                  </p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-green-600 flex items-center justify-center text-xs text-white font-bold">
                      {bankInfo.bankCode}
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-slate-900 dark:text-white text-sm">
                        {bankInfo.bankName}
                      </p>
                      <p className="text-xs text-slate-500 dark:text-slate-400">
                        **** {bankInfo.accountNumber?.slice(-4)}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="p-5 pt-0">
              <button
                onClick={handleNext}
                disabled={!amount}
                className="w-full h-11 bg-primary text-white rounded-lg font-semibold hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                Tiếp tục
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Confirmation Modal */}
      <WithdrawalConfirmModal
        isOpen={showConfirm}
        onClose={() => setShowConfirm(false)}
        onConfirm={handleConfirm}
        amount={parseInt(amount.replace(/\D/g, '')) || 0}
        bankInfo={bankInfo}
      />
    </>
  )
}
