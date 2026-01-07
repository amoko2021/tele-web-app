export const TaskButton = ({ onClick }) => {
  return (
    <div className="px-4 pt-4">
      <button
        onClick={onClick}
        className="w-full mb-4 flex items-center justify-between rounded-xl bg-gradient-to-r from-slate-800 to-slate-900 p-3 text-white shadow-lg shadow-slate-900/10 hover:shadow-slate-900/20 active:scale-[0.99] transition-all"
      >
        <div className="flex items-center gap-3">
          <div className="flex size-10 items-center justify-center rounded-lg bg-white/10 text-yellow-400">
            <span className="material-symbols-outlined">monetization_on</span>
          </div>
          <div className="flex flex-col items-start">
            <span className="font-bold text-sm">Làm nhiệm vụ quảng cáo</span>
            <span className="text-xs text-slate-300">Nhận thưởng ngay</span>
          </div>
        </div>
        <div className="flex items-center gap-2 rounded-lg bg-primary px-3 py-1.5 text-xs font-bold text-white hover:bg-blue-600 transition-colors">
          <span>Tham gia</span>
          <span className="material-symbols-outlined text-sm">
            arrow_forward
          </span>
        </div>
      </button>
    </div>
  )
}
