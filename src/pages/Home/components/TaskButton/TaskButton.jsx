export const TaskButton = ({ onClick }) => {
  return (
    <div className="px-4 pt-4">
      <button
        onClick={onClick}
        className="w-full mb-4 flex items-center justify-between rounded-xl bg-white border border-primary/20 p-3 shadow-lg shadow-primary/10 hover:shadow-primary/20 hover:border-primary/30 active:scale-[0.99] transition-all"
      >
        <div className="flex items-center gap-3">
          <div className="flex size-10 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-blue-600 text-white">
            <span className="material-symbols-outlined">monetization_on</span>
          </div>
          <div className="flex flex-col items-start min-w-0">
            <span className="font-bold text-sm whitespace-nowrap text-slate-800">
              Làm nhiệm vụ quảng cáo
            </span>
            <span className="text-xs text-slate-500 whitespace-nowrap">
              Nhận thưởng ngay
            </span>
          </div>
        </div>
        <div className="flex items-center gap-2 rounded-lg bg-primary px-3 py-1.5 text-xs font-bold text-white hover:bg-blue-600 transition-colors whitespace-nowrap flex-shrink-0">
          <span>Tham gia</span>
          <span className="material-symbols-outlined text-sm">
            arrow_forward
          </span>
        </div>
      </button>
    </div>
  )
}
