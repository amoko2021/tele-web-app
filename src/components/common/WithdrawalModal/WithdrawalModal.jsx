import { useState } from 'react'
import { WithdrawalConfirmModal } from '../WithdrawalConfirmModal'
import { UI_TEXT } from '../../../config/uiText'

export const WithdrawalModal = ({ isOpen, onClose, onSubmit, bankInfo }) => {
  const [amount, setAmount] = useState('')
  const [showConfirm, setShowConfirm] = useState(false)
  const [withdrawalType, setWithdrawalType] = useState('bank')
  const [selectedCrypto, setSelectedCrypto] = useState('')
  const [walletAddress, setWalletAddress] = useState('')

  const cryptoOptions = ['USDT (BEP20)']

  if (!isOpen) return null

  const handleNext = () => {
    const amountNum = parseInt(amount.replace(/\D/g, ''))
    if (!amountNum || amountNum < 50000) {
      alert(UI_TEXT.validation.minAmount.replace('{amount}', '50.000'))
      return
    }
    if (withdrawalType === 'crypto') {
      if (!selectedCrypto) {
        alert('Vui lòng chọn loại tiền điện tử.')
        return
      }
      if (!walletAddress.trim()) {
        alert('Vui lòng nhập địa chỉ ví.')
        return
      }
    } else if (withdrawalType === 'bank' && !bankInfo) {
      alert(UI_TEXT.withdrawal.warning.noBank)
      return
    }
    setShowConfirm(true)
  }

  const handleConfirm = async () => {
    const amountNum = parseInt(amount.replace(/\D/g, ''))
    const data = {
      amount: amountNum,
      type: withdrawalType,
      ...(withdrawalType === 'crypto' && { cryptoInfo: { crypto: selectedCrypto, address: walletAddress } })
    }
    try {
      await onSubmit(data)
      // Chỉ close modal khi thành công
      setShowConfirm(false)
      setAmount('')
      setSelectedCrypto('')
      setWalletAddress('')
      setWithdrawalType('bank')
      onClose()
    } catch {
      // Nếu lỗi, giữ modal mở để user có thể thử lại
      setShowConfirm(false)
    }
  }

  const handleClose = () => {
    setAmount('')
    setSelectedCrypto('')
    setWalletAddress('')
    setWithdrawalType('bank')
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
                {UI_TEXT.withdrawal.title}
              </h2>
              <button
                onClick={handleClose}
                className="text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors rounded-full p-1 hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                <span className="material-symbols-outlined text-xl">close</span>
              </button>
            </div>

            {/* Tabs */}
            <div className="flex border-b border-slate-100 dark:border-slate-700">
              <button
                className={`flex-1 py-3 text-sm font-medium transition-colors ${
                  withdrawalType === 'bank'
                    ? 'text-primary border-b-2 border-primary'
                    : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
                }`}
                onClick={() => setWithdrawalType('bank')}
              >
                Bank
              </button>
              <button
                className={`flex-1 py-3 text-sm font-medium transition-colors ${
                  withdrawalType === 'crypto'
                    ? 'text-primary border-b-2 border-primary'
                    : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
                }`}
                onClick={() => setWithdrawalType('crypto')}
              >
                Crypto
              </button>
            </div>

            {/* Body */}
            <div className="p-5 space-y-5">
              {/* Amount Input */}
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  {UI_TEXT.withdrawal.amountInput.label}
                </label>
                
                {withdrawalType === 'bank' ? (
                  <>
                    <div className="relative">
                      <input
                        type="text"
                        value={formatNumber(amount)}
                        onChange={(e) => setAmount(e.target.value)}
                        placeholder="0"
                        className="w-full px-4 py-3 text-2xl font-bold text-center border border-slate-200 dark:border-slate-700 rounded-lg bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent"
                      />
                      <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 text-lg">
                        {UI_TEXT.common.currency}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">
                      {UI_TEXT.withdrawal.amountInput.placeholder}
                    </p>
                  </>
                ) : (
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      onClick={() => setAmount('2600000')}
                      className={`py-3 px-2 rounded-lg border-2 font-semibold text-sm transition-all ${
                        amount === '2600000'
                          ? 'border-primary bg-primary/5 text-primary'
                          : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:border-primary/50'
                      }`}
                    >
                      100 USDT
                      <div className="text-xs font-normal opacity-70 mt-1">2.600.000đ</div>
                    </button>
                    <button
                      onClick={() => setAmount('5200000')}
                      className={`py-3 px-2 rounded-lg border-2 font-semibold text-sm transition-all ${
                        amount === '5200000'
                          ? 'border-primary bg-primary/5 text-primary'
                          : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:border-primary/50'
                      }`}
                    >
                      200 USDT
                      <div className="text-xs font-normal opacity-70 mt-1">5.200.000đ</div>
                    </button>
                  </div>
                )}
              </div>

               {/* Bank Info or Crypto Info */}
               {withdrawalType === 'bank' && bankInfo && (
                 <div className="bg-slate-50 dark:bg-slate-800/50 rounded-lg p-4 border border-slate-100 dark:border-slate-700">
                   <p className="text-xs text-slate-500 dark:text-slate-400 mb-2">
                     {UI_TEXT.withdrawal.bankInfo.title}
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

               {withdrawalType === 'crypto' && (
                 <div className="space-y-4">
                   {/* Select Crypto */}
                   <div>
                     <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                       {UI_TEXT.withdrawal.crypto.selectCrypto}
                     </label>
                     <select
                       value={selectedCrypto}
                       onChange={(e) => setSelectedCrypto(e.target.value)}
                       className="w-full px-4 py-3 border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent"
                     >
                       <option value="">Chọn loại tiền điện tử</option>
                       {cryptoOptions.map((crypto) => (
                         <option key={crypto} value={crypto}>
                           {crypto}
                         </option>
                       ))}
                     </select>
                   </div>

                   {/* Wallet Address */}
                   <div>
                     <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                       {UI_TEXT.withdrawal.crypto.walletAddress}
                     </label>
                     <input
                       type="text"
                       value={walletAddress}
                       onChange={(e) => setWalletAddress(e.target.value)}
                       placeholder={UI_TEXT.withdrawal.crypto.placeholderAddress}
                       className="w-full px-4 py-3 border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent"
                     />
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
                {UI_TEXT.common.continue}
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
        withdrawalType={withdrawalType}
        bankInfo={bankInfo}
        cryptoInfo={withdrawalType === 'crypto' ? { crypto: selectedCrypto, address: walletAddress } : null}
      />
    </>
  )
}

