export const PredictionCard = ({ prediction, index }) => {
  return (
    <div className="flex-none w-48 rounded-xl border border-slate-200 bg-slate-50 p-4">
      <div className="flex flex-col gap-2 mb-3">
        <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
          Lượt {index + 1}
        </span>
        <span className="text-[10px] text-slate-400">
          {prediction.prizeType === 'db'
            ? 'Giải Đặc Biệt'
            : prediction.prizeType === 'loto'
            ? 'Lô Tô'
            : 'Lô Xiên'}
        </span>
        <span className="text-[10px] text-slate-400">
          {new Date(prediction.timestamp).toLocaleTimeString('vi-VN', {
            hour: '2-digit',
            minute: '2-digit',
          })}
        </span>
      </div>
      <div className="text-center">
        <div className="text-3xl font-bold tracking-widest text-primary">
          {prediction.number}
        </div>
      </div>
    </div>
  )
}
