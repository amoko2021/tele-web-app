export const PredictionCard = ({ prediction, index }) => {
  return (
    <div className="flex-none w-24 rounded-lg border border-slate-200 bg-slate-50 p-2">
      <div className="flex flex-col gap-1 mb-1">
        <span className="text-[10px] font-semibold uppercase tracking-wide text-slate-400">
          Lượt {index + 1}
        </span>

        <span className="text-[9px] text-slate-400">
          {prediction.prizeType === 'db'
            ? 'Giải Đặc Biệt'
            : prediction.prizeType === 'loto'
            ? 'Lô Tô'
            : 'Lô Xiên'}
        </span>

        <span className="text-[9px] text-slate-400">
          {new Date(prediction.timestamp).toLocaleTimeString('vi-VN', {
            hour: '2-digit',
            minute: '2-digit',
          })}
        </span>
      </div>

      <div className="text-center">
        <div className="text-xl font-bold tracking-widest text-primary">
          {prediction.number}
        </div>
      </div>
    </div>
  )
}