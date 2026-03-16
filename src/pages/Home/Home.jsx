import { useNavigate } from 'react-router-dom'
import { TadsWidget } from 'react-tads-widget'
import { useXSMB } from '../../hooks/useApi'
import { useLotteryHistory } from '../../hooks/useLotteryHistory'
import { DateNavigation } from './components/DateNavigation'
import { SpecialPrize } from './components/SpecialPrize'
import { ResultsTable } from './components/ResultsTable'
import { PredictionCard } from './components/PredictionCard'
import { TaskButton } from './components/TaskButton'
import { UI_TEXT } from '../../config/uiText'

export const Home = () => {
  const navigate = useNavigate()
  const { data: xsmbData, loading } = useXSMB()
  const {
    currentResult,
    currentDate,
    loading: historyLoading,
    goToPreviousDay,
    goToNextDay,
    canGoNext,
    canGoPrevious,
    formatDate,
    isToday,
  } = useLotteryHistory()

  // Determine which data to show: history data or current XSMB data
  const displayData = isToday ? xsmbData : currentResult
  const displayDate = isToday ? xsmbData?.time : formatDate(currentDate)

  // Kiểm tra xem có đang trong thời gian quay thưởng không (18:15 - 18:45)
  const isDrawingTime = () => {
    if (!isToday) return false
    const now = new Date()
    const nowVN = new Date(now.toLocaleString('en-US', { timeZone: 'Asia/Ho_Chi_Minh' }))
    const hours = nowVN.getHours()
    const minutes = nowVN.getMinutes()
    const totalMinutes = hours * 60 + minutes
    // 18:15 = 1095, 18:45 = 1125
    return totalMinutes >= 1095 && totalMinutes <= 1125
  }

  if (loading || historyLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-slate-50">
        <div className="text-slate-500">{UI_TEXT.common.loading}</div>
      </div>
    )
  }

  return (
    <div className="flex flex-col h-full bg-white pb-20">
      {/* Date Navigation */}
      <DateNavigation
        date={displayDate}
        onPreviousDay={goToPreviousDay}
        onNextDay={goToNextDay}
        canGoNext={canGoNext}
        canGoPrevious={canGoPrevious}
        isToday={isToday}
      />

      {/* Prediction Card (Combined Countdown & Task) */}
      <PredictionCard isToday={isToday} isDrawingTime={isDrawingTime()} />

      {/* Buttons Container */}
      <div className="px-4 pt-2">
      </div>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto bg-slate-50 pb-6">
        {/* Special Prize */}
        <SpecialPrize
          number={displayData?.results?.ĐB?.[0] || displayData?.special}
        />

        {/* Results Table */}
        <ResultsTable results={displayData?.results || displayData} />
      </main>
    </div>
  )
}
