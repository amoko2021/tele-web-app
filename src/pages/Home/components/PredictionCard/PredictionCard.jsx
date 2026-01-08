export const PredictionCard = ({ prediction, index }) => {
  return (
    <div className="flex-none w-16 rounded-lg border border-slate-200 bg-slate-50 p-2">
      <div className="flex flex-col items-center gap-1">
        <span className="text-[9px] font-semibold text-slate-400">
          {prediction.prizeType === 'db'
            ? 'ĐB'
            : prediction.prizeType === 'loto'
            ? 'LT'
            : 'LX'}
        </span>
        <div className="text-xl font-bold tracking-wide text-primary">
          {prediction.number}
        </div>
      </div>
    </div>
  )
}