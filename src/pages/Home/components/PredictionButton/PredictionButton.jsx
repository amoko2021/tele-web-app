export const PredictionButton = ({
  onClick,
  remainingPredictions,
  maxPredictions,
  checkingPrediction,
}) => {
  return (
    <div className="px-4 pt-3">
      <button
        onClick={onClick}
        disabled={checkingPrediction}
        className="w-full flex items-center justify-between rounded-xl bg-gradient-to-r from-slate-800 to-slate-900 p-3 text-white shadow-lg shadow-slate-900/10 hover:shadow-slate-900/20 active:scale-[0.99] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <div className="flex items-center gap-3">
          <div className="flex size-10 items-center justify-center rounded-lg bg-white/10 text-yellow-400">
            <span className="material-symbols-outlined">casino</span>
          </div>
          <div className="flex flex-col items-start min-w-0">
            <span className="font-bold text-sm whitespace-nowrap">
              Tham gia dự đoán
            </span>
            <span className="text-xs text-slate-300 whitespace-nowrap">
              {checkingPrediction
                ? 'Đang kiểm tra...'
                : remainingPredictions > 0
                ? `Còn ${remainingPredictions}/${maxPredictions} lượt`
                : 'Xem lịch sử'}
            </span>
          </div>
        </div>
        <div className="flex items-center gap-2 rounded-lg bg-primary px-3 py-1.5 text-xs font-bold text-white hover:bg-blue-600 transition-colors whitespace-nowrap flex-shrink-0">
          <span>{remainingPredictions > 0 ? 'Dự đoán' : 'Xem'}</span>
          <span className="material-symbols-outlined text-sm">
            arrow_forward
          </span>
        </div>
      </button>
    </div>
  )
}
