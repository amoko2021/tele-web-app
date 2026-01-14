export const HeaderSection = ({ onBack, title, icon }) => {
  return (
    <header className="sticky top-0 z-20 flex items-center justify-between border-b border-slate-100 bg-white/95 px-4 py-4 backdrop-blur-sm">
      <div className="flex items-center gap-3">
        <button className="flex size-8 items-center justify-center rounded-full hover:bg-slate-100 transition-colors" onClick={onBack}>
          <span className="material-symbols-outlined text-slate-600">arrow_back</span>
        </button>
        <h1 className="text-lg font-bold leading-tight tracking-tight text-slate-900">{title}</h1>
      </div>
      {icon && (
        <div className="flex size-9 items-center justify-center rounded-full text-primary bg-primary/10">
          {icon}
        </div>
      )}
    </header>
  )
}
