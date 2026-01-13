export const DateNavigation = ({
  date,
  onPreviousDay,
  onNextDay,
  canGoNext,
  canGoPrevious,
  isToday,
}) => {
  return (
    <div className="flex items-center justify-between bg-primary px-4 py-1.5 text-white shadow-sm">
      <button
        onClick={onPreviousDay}
        disabled={!canGoPrevious}
        className="flex size-6 items-center justify-center rounded-full bg-white/20 hover:bg-white/30 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
      >
        <span className="material-symbols-outlined text-xs">
          arrow_back_ios_new
        </span>
      </button>
      <div className="flex flex-col items-center">
        <span className="text-xs font-medium opacity-90">
          {isToday ? 'Hôm nay' : 'Lịch sử'}
        </span>
        <span className="text-sm font-bold">{date}</span>
      </div>
      <button
        onClick={onNextDay}
        disabled={!canGoNext}
        className="flex size-6 items-center justify-center rounded-full bg-white/20 hover:bg-white/30 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
      >
        <span className="material-symbols-outlined text-xs">
          arrow_forward_ios
        </span>
      </button>
    </div>
  )
}
