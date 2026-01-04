export const LotteryHeader = () => {
  return (
    <header className="sticky top-0 z-20 flex items-center justify-between border-b border-slate-100 bg-white/95 px-4 py-3 backdrop-blur-sm">
      <div className="flex items-center gap-3">
        <div className="flex size-8 items-center justify-center rounded-full bg-primary/10 text-primary">
          <span className="material-symbols-outlined" style={{ fontSize: 20 }}>
            stars
          </span>
        </div>
        <h1 className="text-lg font-bold leading-tight tracking-tight text-slate-900">
          Xổ số Miền Bắc
        </h1>
      </div>
      <button className="flex size-9 items-center justify-center rounded-full text-slate-500 hover:bg-slate-100 transition-colors">
        <span className="material-symbols-outlined">calendar_today</span>
      </button>
    </header>
  )
}
