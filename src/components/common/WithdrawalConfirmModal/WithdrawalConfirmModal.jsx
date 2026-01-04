export const WithdrawalConfirmModal = ({
  isOpen,
  onClose,
  onConfirm,
  amount,
  bankInfo,
}) => {
  if (!isOpen) return null

  const handleConfirm = () => {
    onConfirm()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      ></div>

      {/* Modal Content */}
      <div className="relative w-full max-w-md transform overflow-hidden rounded-xl bg-white dark:bg-slate-900 shadow-2xl transition-all border border-slate-100 dark:border-slate-700 flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100 dark:border-slate-700/50">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white tracking-tight">
            Xác nhận rút tiền
          </h2>
          <button
            onClick={onClose}
            className="text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors rounded-full p-1 hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            <span className="material-symbols-outlined text-xl">close</span>
          </button>
        </div>

        {/* Body */}
        <div className="p-5 space-y-6">
          {/* Amount Display */}
          <div className="text-center py-2">
            <p className="text-slate-500 dark:text-slate-400 text-sm font-medium mb-1">
              Số tiền muốn rút
            </p>
            <h3 className="text-3xl font-extrabold text-primary tracking-tight">
              {amount?.toLocaleString()} đ
            </h3>
          </div>

          {/* Transaction Details Card */}
          <div className="bg-slate-50 dark:bg-slate-800/50 rounded-lg p-4 border border-slate-100 dark:border-slate-700/50 space-y-3">
            <div className="flex justify-between items-center text-sm">
              <span className="text-slate-500 dark:text-slate-400">
                Ngân hàng
              </span>
              <div className="flex items-center">
                {/* <div className="w-5 h-5 rounded-full bg-green-600 flex items-center justify-center text-[8px] text-white font-bold tracking-tighter">
                  {bankInfo?.bankCode || 'VCB'}
                </div> */}
                <span className="text-slate-900 dark:text-white font-semibold">
                  {bankInfo?.bankName || 'Vietcombank'}
                </span>
              </div>
            </div>

            <div className="flex justify-between items-center text-sm">
              <span className="text-slate-500 dark:text-slate-400">
                Số tài khoản
              </span>
              <span className="text-slate-900 dark:text-white font-mono font-medium tracking-wide">
                **** {bankInfo?.accountNumber?.slice(-4) || '0000'}
              </span>
            </div>

            <div className="flex justify-between items-center text-sm">
              <span className="text-slate-500 dark:text-slate-400">
                Chủ tài khoản
              </span>
              <span className="text-slate-900 dark:text-white font-medium uppercase">
                {bankInfo?.accountName || 'N/A'}
              </span>
            </div>

            <div className="h-px w-full bg-slate-200 dark:bg-slate-700 my-2"></div>

            <div className="flex justify-between items-center text-sm">
              <span className="text-slate-500 dark:text-slate-400">
                Phí giao dịch
              </span>
              <span className="text-green-600 dark:text-green-400 font-medium">
                Miễn phí
              </span>
            </div>

            <div className="flex justify-between items-center text-sm pt-1">
              <span className="text-slate-900 dark:text-white font-bold">
                Thực nhận
              </span>
              <span className="text-slate-900 dark:text-white font-bold text-base">
                {amount?.toLocaleString()} đ
              </span>
            </div>
          </div>

          {/* Info Alert */}
          <div className="flex gap-3 bg-primary/10 border border-primary/20 rounded-lg p-3 items-start">
            <span className="material-symbols-outlined text-primary text-xl shrink-0 mt-0.5">
              info
            </span>
            <div className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              Yêu cầu của bạn sẽ được xử lý trong 5-15 phút. Vui lòng kiểm tra
              kỹ thông tin tài khoản nhận tiền trước khi xác nhận.
            </div>
          </div>
        </div>

        {/* Footer / Buttons */}
        <div className="p-5 pt-2 flex flex-col-reverse sm:flex-row gap-3">
          <button
            onClick={onClose}
            className="flex-1 h-11 flex items-center justify-center rounded-lg border border-slate-200 dark:border-slate-600 bg-transparent text-slate-900 dark:text-white text-sm font-semibold hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-200"
          >
            Hủy
          </button>
          <button
            onClick={handleConfirm}
            className="flex-1 h-11 flex items-center justify-center gap-2 rounded-lg bg-primary text-white text-sm font-semibold shadow-md shadow-primary/20 hover:bg-blue-600 transition-all focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 dark:focus:ring-offset-slate-800 group"
          >
            <span>Xác nhận rút tiền</span>
            <span className="material-symbols-outlined text-lg transition-transform group-hover:translate-x-0.5">
              arrow_forward
            </span>
          </button>
        </div>
      </div>
    </div>
  )
}
