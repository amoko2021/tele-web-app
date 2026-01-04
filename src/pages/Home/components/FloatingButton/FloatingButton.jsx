export const FloatingButton = ({
  onClick,
  remainingPredictions,
  maxPredictions,
  checkingPrediction,
}) => {
  return (
    <>
      <button
        onClick={onClick}
        className="fixed bottom-24 right-4 z-20 flex h-12 items-center gap-2 rounded-full bg-primary pl-4 pr-6 text-white shadow-lg shadow-blue-500/30 hover:bg-blue-600 hover:shadow-xl hover:shadow-blue-500/40 active:scale-95 transition-all animate-bounce-slow group"
      >
        <span className="material-symbols-outlined group-hover:rotate-12 transition-transform">
          casino
        </span>
        <div className="flex flex-col items-start">
          <span className="font-bold text-sm leading-tight">
            Tham gia dự đoán
          </span>
          {!checkingPrediction && (
            <span className="text-[10px] opacity-90 leading-tight">
              {remainingPredictions > 0
                ? `Còn ${remainingPredictions}/${maxPredictions} lượt`
                : 'Xem lịch sử'}
            </span>
          )}
        </div>
      </button>

      <style jsx>{`
        @keyframes bounce-slow {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-8px);
          }
        }
        .animate-bounce-slow {
          animation: bounce-slow 2s ease-in-out infinite;
        }
      `}</style>
    </>
  )
}
