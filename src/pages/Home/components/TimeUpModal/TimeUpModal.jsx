import { Modal } from '../../../../components/common/Modal'

// Kiểm tra số có trúng giải không
const checkWinning = (number, prizeType, results) => {
  if (!results || !number) return null

  // Chuyển số dự đoán về string và lấy 2 chữ số cuối
  const predNumber = String(number)
  const last2Digits = predNumber.slice(-2)

  if (prizeType === 'db') {
    // Kiểm tra giải đặc biệt (lấy 2 số cuối)
    const dbNumbers = results['ĐB'] || []
    return dbNumbers.some((num) => String(num).slice(-2) === last2Digits)
  } else {
    // Kiểm tra lô tô (2 số cuối của tất cả các giải)
    const allNumbers = Object.values(results).flat()
    return allNumbers.some((num) => String(num).slice(-2) === last2Digits)
  }
}

export const TimeUpModal = ({ isOpen, onClose, todayPredictions, results }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Đã hết thời gian dự đoán">
      <div className="p-5">
        <div className="mb-5 flex items-start gap-2 rounded-lg bg-blue-50 p-3 text-sm text-blue-800">
          <span className="material-symbols-outlined mt-0.5 shrink-0 text-lg">
            info
          </span>
          <span className="leading-snug">
            Kết quả dự đoán của bạn ngày{' '}
            {new Date().toLocaleDateString('vi-VN')}.
          </span>
        </div>

        {todayPredictions.length > 0 ? (
          <div className="mb-6 space-y-3">
            {todayPredictions.map((pred, idx) => {
              const isWinning = checkWinning(
                pred.number,
                pred.prizeType,
                results
              )

              return (
                <div
                  key={idx}
                  className="flex items-center justify-between rounded-xl border border-slate-100 bg-white p-3 shadow-sm"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`flex size-10 flex-none items-center justify-center rounded-lg font-bold ${
                        pred.prizeType === 'db'
                          ? 'bg-red-50 text-red-600'
                          : 'bg-indigo-50 text-indigo-600'
                      }`}
                    >
                      {pred.prizeType === 'db' ? 'ĐB' : 'LT'}
                    </div>
                    <div className="flex flex-col">
                      <span className="text-xs font-semibold uppercase text-slate-400">
                        {pred.prizeType === 'db' ? 'Giải Đặc Biệt' : 'Lô tô'}
                      </span>
                      <span className="text-xl font-bold text-slate-900">
                        {pred.number}
                      </span>
                    </div>
                  </div>
                  {isWinning !== null && (
                    <div
                      className={`flex items-center gap-1 rounded-lg px-2.5 py-1 text-xs font-semibold ${
                        isWinning
                          ? 'bg-green-50 text-green-700'
                          : 'bg-slate-100 text-slate-500'
                      }`}
                    >
                      <span className="material-symbols-outlined text-base">
                        {isWinning ? 'check_circle' : 'cancel'}
                      </span>
                      <span>{isWinning ? 'Trúng' : 'Không trúng'}</span>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        ) : (
          <div className="mb-6 py-8 text-center text-sm text-slate-400">
            Bạn chưa có dự đoán nào hôm nay
          </div>
        )}

        <button
          onClick={onClose}
          className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-slate-100 py-3.5 text-sm font-bold text-slate-700 transition-colors hover:bg-slate-200"
        >
          <span>Đóng</span>
        </button>
      </div>
    </Modal>
  )
}
