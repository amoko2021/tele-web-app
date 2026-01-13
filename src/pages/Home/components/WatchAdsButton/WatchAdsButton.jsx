export const WatchAdsButton = ({ onClick, loading, adType, reward }) => {
  return (
    <a
      onClick={(e) => {
        e.preventDefault()
        onClick?.()
      }}
      className="min-w-max flex items-center justify-between rounded-xl bg-white border border-primary/20 p-2 shadow-lg shadow-primary/10 hover:shadow-primary/20 hover:border-primary/30 active:scale-[0.99] transition-all no-underline disabled:opacity-50 disabled:cursor-not-allowed"
    >
      <div className="flex items-center gap-2.5">
        <div className="flex size-8 items-center justify-center rounded-lg bg-gradient-to-br from-green-500 to-emerald-600 text-white">
          <span className="material-symbols-outlined text-xl">
            play_circle
          </span>
        </div>
        <div className="flex flex-col items-start min-w-0">
          <span className="font-bold text-xs whitespace-nowrap text-slate-800">
            Xem quảng cáo {adType}
          </span>
          <span className="text-[10px] text-slate-500 whitespace-nowrap">
            {loading ? 'Đang tải...' : `+${reward}VND`}
          </span>
        </div>
      </div>
      <div className="flex items-center gap-1.5 rounded-lg bg-gradient-to-r from-green-500 to-emerald-600 px-2.5 py-1 text-[11px] font-bold text-white hover:from-green-600 hover:to-emerald-700 transition-colors whitespace-nowrap flex-shrink-0">
        <span>{loading ? 'Loading...' : 'Xem'}</span>
        <span className="material-symbols-outlined text-xs">
          arrow_forward
        </span>
      </div>
    </a>
  )
}