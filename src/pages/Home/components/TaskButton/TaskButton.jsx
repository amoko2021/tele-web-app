export const TaskButton = ({ onClick }) => {
  return (
    <div className="px-4 pt-4">
      <button
        onClick={onClick}
        className="w-full max-w-[328px] mx-auto flex items-center justify-between rounded-2xl bg-[#1d2733] p-2 pr-4 text-white shadow-lg hover:shadow-xl active:scale-[0.99] transition-all"
        style={{
          fontFamily: 'Roboto, sans-serif',
        }}
      >
        <div className="flex items-center gap-[15px]">
          <div className="flex size-[50px] items-center justify-center rounded-lg bg-white/10 text-yellow-400">
            <span className="material-symbols-outlined text-[32px]">
              monetization_on
            </span>
          </div>
          <div className="flex flex-col items-start min-w-0">
            <span className="font-bold text-[16px] whitespace-nowrap">
              Làm nhiệm vụ quảng cáo
            </span>
            <span className="text-[14px] text-white/80 whitespace-nowrap">
              Nhận thưởng ngay
            </span>
          </div>
        </div>
        <div className="flex items-center justify-center min-w-[60px] rounded-lg bg-primary px-3 py-1.5 text-[14px] font-bold text-white hover:bg-blue-600 transition-colors whitespace-nowrap flex-shrink-0">
          <span>Tham gia</span>
        </div>
      </button>
    </div>
  )
}
