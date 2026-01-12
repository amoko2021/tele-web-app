import { PredictionCard } from '../PredictionCard'
import { PrizeTypeSelector } from '../PrizeTypeSelector'
import { NumberInput } from '../NumberInput'
import { UI_TEXT } from '../../../../config/uiText'

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
  errorMessage,
}) => {
  if (checkingPrediction) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="text-slate-500">{UI_TEXT.home.prediction.check}</div>
      </div>
    )
  }

  // Đã hết lượt - chỉ hiển thị lịch sử
  if (remainingPredictions <= 0) {
    return (
      <div>
        <div className="mb-3 rounded-lg bg-orange-50 border border-orange-200 p-3">
          <div className="flex items-center gap-1.5 text-orange-700">
            <span className="material-symbols-outlined text-base">info</span>
            <span className="font-semibold text-xs">
              {UI_TEXT.home.prediction.outOfTurns.replace('{max}', maxPredictions)}
            </span>
          </div>
        </div>

        <div>
          <h4 className="text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-2">
            {UI_TEXT.home.prediction.history}
          </h4>
          <div className="flex gap-2 overflow-x-auto pb-2 -mx-1 px-1 scrollbar-thin scrollbar-thumb-slate-300 scrollbar-track-slate-100">
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
            {UI_TEXT.home.prediction.resultTime}
          </p>
        </div>
      </div>
    )
  }

  // Còn lượt - hiển thị lịch sử và form dự đoán
  if (hasPredicted) {
    return (
      <div>
        <div className="mb-3 rounded-lg bg-blue-50 border border-blue-200 p-3">
          <div className="flex items-center justify-between text-blue-700">
            <div className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-base">
                check_circle
              </span>
              <span className="font-semibold text-xs">
                {UI_TEXT.home.prediction.predicted.replace('{count}', todayPredictions.length).replace('{max}', maxPredictions)}
              </span>
            </div>
            <span className="text-xs font-bold">
              {UI_TEXT.home.prediction.remaining.replace('{count}', remainingPredictions)}
            </span>
          </div>
        </div>

        <div className="mb-5">
          <h4 className="text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-2">
            {UI_TEXT.home.prediction.history}
          </h4>
          <div className="flex gap-2 overflow-x-auto pb-2 -mx-1 px-1 scrollbar-thin scrollbar-thumb-slate-300 scrollbar-track-slate-100">
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
            {UI_TEXT.home.prediction.addNew}
          </h4>

          <PrizeTypeSelector value={prizeType} onChange={setPrizeType} />
          <NumberInput value={prediction} onChange={setPrediction} />
          {errorMessage && (
            <div className="mt-2 text-xs text-red-500 font-medium">
              {errorMessage}
            </div>
          )}

          <button
            onClick={handleSubmitPrediction}
            disabled={submitting}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary py-3.5 text-sm font-bold text-white shadow-lg shadow-blue-500/25 hover:bg-blue-600 active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span>{submitting ? UI_TEXT.home.prediction.sending : UI_TEXT.home.prediction.sendButton}</span>
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
      {errorMessage && (
        <div className="mt-2 text-xs text-red-500 font-medium">
          {errorMessage}
        </div>
      )}

      <button
        onClick={handleSubmitPrediction}
        disabled={submitting}
        className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary py-3.5 text-sm font-bold text-white shadow-lg shadow-blue-500/25 hover:bg-blue-600 active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <span>{submitting ? UI_TEXT.home.prediction.sending : UI_TEXT.home.prediction.sendButton}</span>
        {!submitting && (
          <span className="material-symbols-outlined text-lg">send</span>
        )}
      </button>
    </>
  )
}

