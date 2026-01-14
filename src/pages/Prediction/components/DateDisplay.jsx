export const DateDisplay = () => {
  return (
    <div className="px-4 pt-6 pb-2">
      <div className="flex items-center justify-between bg-white rounded-xl px-4 py-3 border border-slate-100 shadow-sm">
        <div className="flex items-center gap-2 text-slate-500">
          <span className="material-symbols-outlined text-sm">calendar_today</span>
          <span className="text-sm font-semibold">Dự đoán hôm nay</span>
        </div>
        <span className="text-sm font-bold text-slate-900">24/10/2023</span>
      </div>
    </div>
  )
}
