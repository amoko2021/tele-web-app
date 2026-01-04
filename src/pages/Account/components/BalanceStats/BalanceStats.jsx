export const BalanceStats = ({ balance = 0, points = 340 }) => {
  return (
    <div className="grid grid-cols-2 gap-3">
      {/* Coin Balance */}
      <div className="flex flex-col gap-1 p-4 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700">
        <div className="flex items-center gap-2 mb-1">
          <span className="material-symbols-outlined text-primary text-[20px]">
            monetization_on
          </span>
          <span className="text-slate-500 dark:text-slate-400 text-xs font-medium uppercase tracking-wider">
            Số dư Xu
          </span>
        </div>
        <p className="text-slate-900 dark:text-white text-2xl font-bold tracking-tight">
          {balance.toLocaleString()}
        </p>
      </div>

      {/* Reward Points */}
      <div className="flex flex-col gap-1 p-4 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700">
        <div className="flex items-center gap-2 mb-1">
          <span className="material-symbols-outlined text-orange-500 text-[20px]">
            stars
          </span>
          <span className="text-slate-500 dark:text-slate-400 text-xs font-medium uppercase tracking-wider">
            Điểm thưởng
          </span>
        </div>
        <p className="text-slate-900 dark:text-white text-2xl font-bold tracking-tight">
          {points}
        </p>
      </div>
    </div>
  )
}
