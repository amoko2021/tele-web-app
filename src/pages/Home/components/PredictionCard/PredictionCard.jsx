export const PredictionCard = ({ prediction, index }) => {
  return (
    <div className="flex-none w-20 rounded-lg border border-slate-200 bg-slate-50 p-1.5">
      <div className="flex flex-col gap-0.5 mb-1">
        <span className="text-[9px] font-semibold text-slate-400">
          #{index + 1}
        </span>

        <span className="text-[8px] text-slate-400">
          {prediction.prizeType === 'db'
            ? 'ĐB'
            : prediction.prizeType === 'loto'
            ? 'LT'
            : 'LX'}
        </span>

        <span className="text-[8px] text-slate-400">
          {new Date(prediction.timestamp).toLocaleTimeString('vi-VN', {
            hour: '2-digit',
            minute: '2-digit',
          })}
        </span>
      </div>

      <div className="text-center">
        <div className="text-lg font-bold tracking-widest text-primary">
          {prediction.number}
        </div>
      </div>
    </div>
  )
}