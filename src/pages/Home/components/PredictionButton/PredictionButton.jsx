export const PredictionButton = ({
  onClick,
  remainingPredictions,
  maxPredictions,
  checkingPrediction,
}) => {
  return (
    <button
      onClick={onClick}
      disabled={checkingPrediction}
      className="min-w-max flex items-center justify-between rounded-xl bg-white border border-primary/20 p-2 shadow-lg shadow-primary/10 hover:shadow-primary/20 hover:border-primary/30 active:scale-[0.99] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
    >
      <div className="flex items-center gap-2.5">
        <div className="flex size-8 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-blue-600 text-white">
          <span className="material-symbols-outlined text-xl">casino</span>
        </div>
        <div className="flex flex-col items-start min-w-0">
          <span className="font-bold text-xs whitespace-nowrap text-slate-800">
            Dự đoán
          </span>
          <span className="text-[10px] text-slate-500 whitespace-nowrap">
            {checkingPrediction
              ? 'Đang kiểm tra...'
              : remainingPredictions > 0
              ? `+50,000 VND Còn ${remainingPredictions}/${maxPredictions} lượt`
              : 'Xem lịch sử'}
          </span>
        </div>
      </div>
      <div className="flex items-center gap-1.5 rounded-lg bg-primary px-2.5 py-1 text-[11px] font-bold text-white hover:bg-blue-600 transition-colors whitespace-nowrap flex-shrink-0">
        <span>{remainingPredictions > 0 ? 'Dự đoán' : 'Xem'}</span>
        <span className="material-symbols-outlined text-xs">
          arrow_forward
        </span>
      </div>
    </button>
  )
}
