export const DateNavigation = ({ date }) => {
  return (
    <div className="flex items-center justify-between bg-primary px-4 py-1.5 text-white shadow-sm">
      <button className="flex size-6 items-center justify-center rounded-full bg-white/20 hover:bg-white/30 transition-colors">
        <span className="material-symbols-outlined text-xs">
          arrow_back_ios_new
        </span>
      </button>
      <div className="flex flex-col items-center">
        <span className="text-xs font-medium opacity-90">Hôm nay</span>
        <span className="text-sm font-bold">{date}</span>
      </div>
      <button className="flex size-6 items-center justify-center rounded-full bg-white/20 hover:bg-white/30 transition-colors">
        <span className="material-symbols-outlined text-xs">
          arrow_forward_ios
        </span>
      </button>
    </div>
  )
}
