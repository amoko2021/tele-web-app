import { PredictionCard } from '../PredictionCard'
import { PrizeTypeSelector } from '../PrizeTypeSelector'
import { NumberInput } from '../NumberInput'

export const PredictionModalContent = ({
  checkingPrediction,
  remainingPredictions,
  maxPredictions,
  hasPredicted,
  todayPredictions,
  prizeType,
  setPrizeType,
  prediction,
  setPrediction,
  handleSubmitPrediction,
  submitting,
}) => {
  if (checkingPrediction) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="text-slate-500">Đang kiểm tra...</div>
      </div>
    )
  }

  // Đã hết lượt - chỉ hiển thị lịch sử
  if (remainingPredictions <= 0) {
    return (
      <div>
        <div className="mb-4 rounded-lg bg-orange-50 border border-orange-200 p-4">
          <div className="flex items-center gap-2 text-orange-700">
            <span className="material-symbols-outlined text-xl">info</span>
            <span className="font-semibold text-sm">
              Bạn đã sử dụng hết {maxPredictions} lượt dự đoán hôm nay
            </span>
          </div>
        </div>

        <div>
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">
            Danh sách dự đoán của bạn
          </h4>
          <div className="flex gap-3 overflow-x-auto pb-2 -mx-1 px-1 scrollbar-thin scrollbar-thumb-slate-300 scrollbar-track-slate-100">
            {todayPredictions.map((pred, index) => (
              <PredictionCard
                key={pred.id || index}
                prediction={pred}
                index={index}
              />
            ))}
          </div>
        </div>

        <div className="mt-6 text-center">
          <p className="text-xs text-slate-500">
            Kết quả sẽ được công bố vào 18:15 hàng ngày
          </p>
        </div>
      </div>
    )
  }

  // Còn lượt - hiển thị lịch sử và form dự đoán
  if (hasPredicted) {
    return (
      <div>
        <div className="mb-4 rounded-lg bg-blue-50 border border-blue-200 p-4">
          <div className="flex items-center justify-between text-blue-700">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-xl">
                check_circle
              </span>
              <span className="font-semibold text-sm">
                Bạn đã dự đoán {todayPredictions.length} lần
              </span>
            </div>
            <span className="text-sm font-bold">
              Còn {remainingPredictions} lượt
            </span>
          </div>
        </div>

        <div className="mb-6">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">
            Danh sách dự đoán của bạn
          </h4>
          <div className="flex gap-3 overflow-x-auto pb-2 -mx-1 px-1 scrollbar-thin scrollbar-thumb-slate-300 scrollbar-track-slate-100">
            {todayPredictions.map((pred, index) => (
              <PredictionCard
                key={pred.id || index}
                prediction={pred}
                index={index}
              />
            ))}
          </div>
        </div>

        {/* Divider */}
        <div className="my-6 border-t border-slate-200"></div>

        {/* Form dự đoán tiếp */}
        <div>
          <h4 className="mb-4 text-xs font-bold uppercase tracking-wider text-slate-500">
            Thêm dự đoán mới
          </h4>

          <PrizeTypeSelector value={prizeType} onChange={setPrizeType} />
          <NumberInput value={prediction} onChange={setPrediction} />

          <button
            onClick={handleSubmitPrediction}
            disabled={submitting}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary py-3.5 text-sm font-bold text-white shadow-lg shadow-blue-500/25 hover:bg-blue-600 active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span>{submitting ? 'Đang gửi...' : 'Gửi dự đoán ngay'}</span>
            {!submitting && (
              <span className="material-symbols-outlined text-lg">send</span>
            )}
          </button>
        </div>
      </div>
    )
  }

  // Form dự đoán lần đầu
  return (
    <>
      <PrizeTypeSelector value={prizeType} onChange={setPrizeType} />
      <NumberInput value={prediction} onChange={setPrediction} />

      <button
        onClick={handleSubmitPrediction}
        disabled={submitting}
        className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary py-3.5 text-sm font-bold text-white shadow-lg shadow-blue-500/25 hover:bg-blue-600 active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <span>{submitting ? 'Đang gửi...' : 'Gửi dự đoán ngay'}</span>
        {!submitting && (
          <span className="material-symbols-outlined text-lg">send</span>
        )}
      </button>
    </>
  )
}
