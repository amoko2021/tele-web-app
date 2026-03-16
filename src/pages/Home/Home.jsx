import { useNavigate } from 'react-router-dom'
import { TadsWidget } from 'react-tads-widget'
import { useXSMB } from '../../hooks/useApi'
// import { useTelegram } from '../../hooks/useTelegram'
// import { useAdsgram } from '../../hooks/useAdsgram'
// import { useSonarAds } from '../../hooks/useSonarAds'
// import { useMonetag } from '../../hooks/useMonetag'
import { useLotteryHistory } from '../../hooks/useLotteryHistory'
// import { lotteryApi } from '../../services/api'
// import { Modal } from '../../components/common/Modal'
// import { LotteryHeader } from './components/LotteryHeader'
import { DateNavigation } from './components/DateNavigation'
import { SpecialPrize } from './components/SpecialPrize'
import { ResultsTable } from './components/ResultsTable'
import { CountdownTimer } from './components/CountdownTimer'
// import { FloatingButton } from './components/FloatingButton'
// import { PredictionModalContent } from './components/PredictionModalContent'
// import { TimeUpModal } from './components/TimeUpModal'
// import { TaskModal } from './components/TaskModal'
import { TaskButton } from './components/TaskButton'
// import { PredictionButton } from './components/PredictionButton'
// import { WatchAdsButton } from './components/WatchAdsButton'
import { UI_TEXT } from '../../config/uiText'
// import { useUserInfo, useUpdateLanguage } from '../../hooks/useApi'

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

  // Lấy userId từ Telegram
  // const { validationData, user: telegramUser } = useTelegram()
  // const userData = validationData?.data?.user || telegramUser
  // const userId = userData?.id
  // const language = userData?.language_code || 'en'
  // const { data: userInfo } = useUserInfo(userId)
  // const {
  //   updateLanguage,
  //   loading: updatingLanguage,
  //   error: updateLanguageError,
  //   success: updateLanguageSuccess,
  // } = useUpdateLanguage(userId, language)

  // const onAdsNotFound = useCallback(() => {
  //   console.log('No widget ads found for this user')
  // }, [])

  // Sonar Ads hook
  // const { handleWatchAds: handleSonarAds, watchingAds: watchingSonarAds } =
  //   useSonarAds({ userId })

  // Monetag hook
  // const { handleWatchAds: handleMonetagAds, watchingAds: watchingMonetagAds } =
  //   useMonetag({
  //     userId,
  //     zoneId: import.meta.env.VITE_MONETAG_ZONE_ID || '',
  //     onReward: () => {
  //       console.log('Monetag ad watched successfully')
  //     },
  //     onError: (error) => {
  //       console.error('Monetag ad error:', error)
  //       alert(
  //         'Quảng cáo hiện không khả dụng. Vui lòng đợi hoặc tải lại trang!!!'
  //       )
  //     },
  //   })

  // Adsgram callbacks
  // const onReward = useCallback(async () => {
  //   // Sau khi xem xong quảng cáo, gọi API submit prediction
  //   if (!pendingPrediction) {
  //     console.error('No pending prediction found')
  //     return
  //   }

  //   try {
  //     const result = await lotteryApi.submitPrediction(userId, {
  //       prizeType: pendingPrediction.prizeType,
  //       number: pendingPrediction.number,
  //       date: new Date().toISOString(),
  //     })

  //     // Kiểm tra response từ backend
  //     if (result.ok === false) {
  //       // Backend trả về lỗi
  //       alert(result.error || UI_TEXT.common.error)
  //       return
  //     }

  //     // Thành công
  //     alert(result.message || UI_TEXT.home.alerts.predictionRecorded)
  //     setIsModalOpen(false)
  //     setPrediction('')
  //     setErrorMessage('')
  //     setPendingPrediction(null)
  //     // Refresh prediction status
  //     checkTodayPrediction()
  //   } catch (error) {
  //     console.error('Submit prediction error:', error)
  //     const errMsg =
  //       error.response?.data?.error || error.message || UI_TEXT.common.error
  //     alert(errMsg)
  //   }
  // }, [pendingPrediction, userId])

  // const onError = useCallback((result) => {
  //   console.error('Adsgram error:', result)
  //   // Nếu ads lỗi, reset pending prediction
  //   alert('Có lỗi khi hiển thị quảng cáo. Vui lòng thử lại!')
  //   setPendingPrediction(null)
  // }, [])

  // Task modal handlers
  // const handleTaskReward = useCallback(
  //   (detail) => {
  //     console.log('Task reward received:', detail)
  //     // Có thể gọi API để cộng coins cho user ở đây
  //     alert(UI_TEXT.home.alerts.rewardReceived)
  //     // Refresh prediction count sau khi nhận thưởng
  //     if (userId) {
  //       lotteryApi
  //         .checkTodayPrediction(userId)
  //         .then((result) => {
  //           setHasPredicted(result.hasPredicted)
  //           setTodayPredictions(result.predictions || [])
  //           setMaxPredictions(result.maxPredictions || 5)
  //           setRemainingPredictions(result.remainingPredictions || 0)
  //         })
  //         .catch((error) => {
  //           console.error('Error refreshing prediction:', error)
  //         })
  //     }
  //   },
  //   [userId]
  // )

  // const handleTaskError = useCallback((detail) => {
  //   console.error('Task error:', detail)
  //   alert(UI_TEXT.home.alerts.taskError)
  // }, [])

  // const handleBannerNotFound = useCallback((detail) => {
  //   console.warn('Banner not found:', detail)
  //   alert(UI_TEXT.home.alerts.noTask)
  // }, [])

  // const handleTooLongSession = useCallback((detail) => {
  //   console.warn('Session too long:', detail)
  //   alert(UI_TEXT.home.alerts.sessionTimeout)
  // }, [])

  // Khởi tạo Adsgram - blockId chính 20539, fallback 20540
  // const showAd = useAdsgram({
  //   blockId: '20539',
  //   fallbackBlockId: '20540',
  //   onReward,
  //   onError,
  // })

  // Xử lý khi click vào floating button
  // const handleFloatingButtonClick = useCallback(async () => {
  //   // Kiểm tra user
  //   if (!userId) {
  //     alert(UI_TEXT.home.alerts.noUser)
  //     return
  //   }

  //   // Lấy thông tin dự đoán hôm nay
  //   setCheckingPrediction(true)
  //   try {
  //     const result = await lotteryApi.checkTodayPrediction(userId)
  //     setHasPredicted(result.hasPredicted)
  //     setTodayPredictions(result.predictions || [])
  //     setMaxPredictions(result.maxPredictions || 5)

  //     // Kiểm tra giờ VN (không cho dự đoán từ 18h)
  //     const nowVN = new Date().toLocaleString('en-US', {
  //       timeZone: 'Asia/Ho_Chi_Minh',
  //     })
  //     const vnDate = new Date(nowVN)
  //     const currentHour = vnDate.getHours()

  //     if (currentHour >= 18) {
  //       setRemainingPredictions(0) // Set về 0 để chỉ hiển thị lịch sử
  //       setIsTimeUpModalOpen(true) // Hiển thị time up modal
  //     } else {
  //       setRemainingPredictions(result.remainingPredictions || 0)
  //       setIsModalOpen(true) // Hiển thị modal dự đoán
  //     }
  //   } catch (error) {
  //     console.error('Error checking prediction:', error)
  //     alert('Có lỗi xảy ra, vui lòng thử lại!')
  //   } finally {
  //     setCheckingPrediction(false)
  //   }
  // }, [userId])

  // // Check dự đoán hôm nay khi component mount để hiển thị số lượt
  // useEffect(() => {
  //   if (userId) {
  //     checkTodayPrediction()
  //   }
  // }, [userId])

  // // Check dự đoán hôm nay khi mở modal
  // useEffect(() => {
  //   if (isModalOpen && userId) {
  //     checkTodayPrediction()
  //   }
  // }, [isModalOpen, userId])

  // const checkTodayPrediction = async () => {
  //   if (!userId) return

  //   setCheckingPrediction(true)
  //   try {
  //     const result = await lotteryApi.checkTodayPrediction(userId)
  //     setHasPredicted(result.hasPredicted)
  //     setTodayPredictions(result.predictions || [])
  //     setMaxPredictions(result.maxPredictions || 5)

  //     // Kiểm tra giờ VN (không cho dự đoán từ 18h)
  //     const nowVN = new Date().toLocaleString('en-US', {
  //       timeZone: 'Asia/Ho_Chi_Minh',
  //     })
  //     const vnDate = new Date(nowVN)
  //     const currentHour = vnDate.getHours()

  //     if (currentHour >= 18) {
  //       setRemainingPredictions(0) // Set về 0 để chỉ hiển thị lịch sử
  //     } else {
  //       setRemainingPredictions(result.remainingPredictions || 0)
  //     }
  //   } catch (error) {
  //     console.error('Error checking prediction:', error)
  //   } finally {
  //     setCheckingPrediction(false)
  //   }
  // }

  // const handleSubmitPrediction = async () => {
  //   setErrorMessage('')

  //   if (!prediction) {
  //     setErrorMessage(UI_TEXT.validation.required)
  //     return
  //   }

  //   if (!userId) {
  //     setErrorMessage(UI_TEXT.home.alerts.noUser)
  //     return
  //   }

  //   // Kiểm tra giới hạn từ backend
  //   if (remainingPredictions <= 0) {
  //     setErrorMessage(
  //       UI_TEXT.home.prediction.outOfTurns.replace('{max}', maxPredictions)
  //     )
  //     return
  //   }

  //   // Lưu prediction data và hiển thị quảng cáo
  //   setPendingPrediction({
  //     prizeType,
  //     number: prediction,
  //   })

  //   // Hiển thị quảng cáo
  //   showAd()
  // }

  // Determine which data to show: history data or current XSMB data
  const displayData = isToday ? xsmbData : currentResult
  const displayDate = isToday ? xsmbData?.time : formatDate(currentDate)

  if (loading || historyLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-slate-50">
        <div className="text-slate-500">{UI_TEXT.common.loading}</div>
      </div>
    )
  }

  return (
    <div className="flex flex-col h-full bg-white pb-20">
      {/* Header */}
      {/* <LotteryHeader /> */}

      {/* Date Navigation */}
      <DateNavigation
        date={displayDate}
        onPreviousDay={goToPreviousDay}
        onNextDay={goToNextDay}
        canGoNext={canGoNext}
        canGoPrevious={canGoPrevious}
        isToday={isToday}
      />

      {/* Buttons Container */}
      <div className="px-4 pt-2">
        {/* Countdown Timer */}
        {isToday && <CountdownTimer />}

        {/* Prediction Button */}
        {/* <PredictionButton
          onClick={handleFloatingButtonClick}
          remainingPredictions={remainingPredictions}
          maxPredictions={maxPredictions}
          checkingPrediction={checkingPrediction}
        /> */}
        <TaskButton
          onClick={() => navigate('prediction')}
          text={UI_TEXT.home.prediction.title}
          amount="+999,000 Coins"
          gradientColors="from-blue-500 to-sky-600"
        />

        {/* <TaskButton
          onClick={() => navigate('/gift-rain')}
          text={UI_TEXT.giftRain.title}
          amount="Play & Earn"
          gradientColors="from-purple-500 to-pink-600"
        /> */}

        {/* <TaskButton
          onClick={() => navigate('/flappy-bird')}
          text={UI_TEXT.flappyBird.title}
          amount="Play & Earn"
          gradientColors="from-green-500 to-emerald-600"
        />

        <TaskButton onClick={() => navigate('/test')} /> */}

        {/* Task Button */}
        {/* <TaskButton onClick={() => navigate('/test')} /> */}
      </div>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto bg-slate-50 pb-6">
        {/* Special Prize */}
        <SpecialPrize
          number={displayData?.results?.ĐB?.[0] || displayData?.special}
        />

        {/* TadsWidget Ads */}
        {/* <div className="px-4 my-4 overflow-hidden rounded-xl bg-white shadow-sm border border-slate-100">
          <TadsWidget
            id="9227"
            type="static"
            debug={false}
            onAdsNotFound={onAdsNotFound}
          />
        </div> */}

        {/* Results Table */}
        <ResultsTable results={displayData?.results || displayData} />
      </main>

      {/* Prediction Modal */}
      {/* <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={
          remainingPredictions <= 0
            ? UI_TEXT.home.prediction.history
            : hasPredicted
            ? `${UI_TEXT.home.prediction.title} (${remainingPredictions}/${maxPredictions})`
            : UI_TEXT.home.prediction.title
        }
      >
        <PredictionModalContent
          checkingPrediction={checkingPrediction}
          remainingPredictions={remainingPredictions}
          maxPredictions={maxPredictions}
          hasPredicted={hasPredicted}
          todayPredictions={todayPredictions}
          prizeType={prizeType}
          setPrizeType={setPrizeType}
          prediction={prediction}
          setPrediction={setPrediction}
          handleSubmitPrediction={handleSubmitPrediction}
          submitting={submitting}
          errorMessage={errorMessage}
        />
      </Modal> */}

      {/* Time Up Modal */}
      {/* <TimeUpModal
        isOpen={isTimeUpModalOpen}
        onClose={() => setIsTimeUpModalOpen(false)}
        todayPredictions={todayPredictions}
        results={xsmbData?.results}
      /> */}

      {/* Task Modal */}
      {/* <TaskModal
        isOpen={isTaskModalOpen}
        onClose={() => setIsTaskModalOpen(false)}
        blockId="task-20664"
        debug={false}
        onTaskReward={handleTaskReward}
        onTaskError={handleTaskError}
        onBannerNotFound={handleBannerNotFound}
        onTooLongSession={handleTooLongSession}
      /> */}
    </div>
  )
}
