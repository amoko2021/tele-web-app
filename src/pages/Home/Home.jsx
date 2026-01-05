import { useState, useEffect, useCallback } from 'react'
import { useXSMB } from '../../hooks/useApi'
import { useTelegram } from '../../hooks/useTelegram'
import { lotteryApi } from '../../services/api'
import { Modal } from '../../components/common/Modal'
import { useAdsgram } from '../../hooks/useAdsgram'
import { LotteryHeader } from './components/LotteryHeader'
import { DateNavigation } from './components/DateNavigation'
import { SpecialPrize } from './components/SpecialPrize'
import { ResultsTable } from './components/ResultsTable'
import { FloatingButton } from './components/FloatingButton'
import { PredictionModalContent } from './components/PredictionModalContent'
import { TimeUpModal } from './components/TimeUpModal'

export const Home = () => {
  const { data: xsmbData, loading } = useXSMB()
  const { validationData, user: telegramUser } = useTelegram()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isTimeUpModalOpen, setIsTimeUpModalOpen] = useState(false)
  const [prizeType, setPrizeType] = useState('db')
  const [prediction, setPrediction] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [hasPredicted, setHasPredicted] = useState(false)
  const [todayPredictions, setTodayPredictions] = useState([])
  const [checkingPrediction, setCheckingPrediction] = useState(false)
  const [maxPredictions, setMaxPredictions] = useState(2)
  const [remainingPredictions, setRemainingPredictions] = useState(2)
  const [errorMessage, setErrorMessage] = useState('')

  // Lấy userId từ Telegram
  const userData = validationData?.data?.user || telegramUser
  const userId = userData?.id

  // Adsgram callbacks
  const onReward = useCallback(() => {
    // Khi user xem xong quảng cáo, hiển thị modal dự đoán
    setIsModalOpen(true)
  }, [])

  const onError = useCallback((result) => {
    console.error('Adsgram error:', result)
    // Mở modal ngay cả khi ads lỗi để user vẫn dự đoán được
    setIsModalOpen(true)
  }, [])

  // Khởi tạo Adsgram - blockId chính 20539, fallback 20540
  const showAd = useAdsgram({
    blockId: '20539',
    fallbackBlockId: '20540',
    onReward,
    onError,
  })

  // Xử lý khi click vào floating button
  const handleFloatingButtonClick = useCallback(async () => {
    // Kiểm tra giờ VN (không cho dự đoán từ 18h)
    const nowVN = new Date().toLocaleString('en-US', {
      timeZone: 'Asia/Ho_Chi_Minh',
    })
    const vnDate = new Date(nowVN)
    const currentHour = vnDate.getHours()

    if (currentHour >= 18) {
      // Vẫn cho xem lịch sử dự đoán
      if (userId) {
        setCheckingPrediction(true)
        try {
          const result = await lotteryApi.checkTodayPrediction(userId)
          setHasPredicted(result.hasPredicted)
          setTodayPredictions(result.predictions || [])
          setMaxPredictions(result.maxPredictions || 5)
          setRemainingPredictions(0) // Set về 0 để chỉ hiển thị lịch sử
          setIsTimeUpModalOpen(true)
        } catch (error) {
          console.error('Error checking prediction:', error)
        } finally {
          setCheckingPrediction(false)
        }
      }
      return
    }

    // Kiểm tra dự đoán trước
    if (!userId) {
      alert('Không tìm thấy thông tin user!')
      return
    }

    // Lấy thông tin dự đoán hôm nay
    setCheckingPrediction(true)
    try {
      const result = await lotteryApi.checkTodayPrediction(userId)
      setHasPredicted(result.hasPredicted)
      setTodayPredictions(result.predictions || [])
      setMaxPredictions(result.maxPredictions || 5)
      setRemainingPredictions(result.remainingPredictions || 0)

      // Nếu đã hết lượt, mở modal trực tiếp (chỉ xem lịch sử)
      if (result.remainingPredictions <= 0) {
        setIsModalOpen(true)
      } else {
        // Còn lượt dự đoán, hiển thị quảng cáo trước
        showAd()
      }
    } catch (error) {
      console.error('Error checking prediction:', error)
      // Nếu lỗi, vẫn cho mở modal
      setIsModalOpen(true)
    } finally {
      setCheckingPrediction(false)
    }
  }, [userId, showAd])

  // Check dự đoán hôm nay khi component mount để hiển thị số lượt
  useEffect(() => {
    if (userId) {
      checkTodayPrediction()
    }
  }, [userId])

  // Check dự đoán hôm nay khi mở modal
  useEffect(() => {
    if (isModalOpen && userId) {
      checkTodayPrediction()
    }
  }, [isModalOpen, userId])

  const checkTodayPrediction = async () => {
    if (!userId) return

    setCheckingPrediction(true)
    try {
      const result = await lotteryApi.checkTodayPrediction(userId)
      setHasPredicted(result.hasPredicted)
      setTodayPredictions(result.predictions || [])
      setMaxPredictions(result.maxPredictions || 5)
      setRemainingPredictions(result.remainingPredictions || 0)
    } catch (error) {
      console.error('Error checking prediction:', error)
    } finally {
      setCheckingPrediction(false)
    }
  }

  const handleSubmitPrediction = async () => {
    setErrorMessage('')

    if (!prediction) {
      setErrorMessage('Vui lòng nhập số dự đoán')
      return
    }

    if (!userId) {
      setErrorMessage('Không tìm thấy thông tin user!')
      return
    }

    // Kiểm tra giới hạn từ backend
    if (remainingPredictions <= 0) {
      setErrorMessage(
        `Bạn đã sử dụng hết ${maxPredictions} lượt dự đoán hôm nay!`
      )
      return
    }

    setSubmitting(true)
    try {
      const result = await lotteryApi.submitPrediction(userId, {
        prizeType,
        number: prediction,
        date: new Date().toISOString(),
      })

      // Kiểm tra response từ backend
      if (result.ok === false) {
        // Backend trả về lỗi
        setErrorMessage(result.error || 'Có lỗi xảy ra, vui lòng thử lại!')
        setSubmitting(false)
        return
      }

      // Thành công
      alert(result.message || 'Dự đoán của bạn đã được ghi nhận!')
      setIsModalOpen(false)
      setPrediction('')
      setErrorMessage('')
      // Refresh prediction status
      checkTodayPrediction()
    } catch (error) {
      console.error('Submit prediction error:', error)
      // Hiển thị message lỗi từ server nếu có
      const errMsg =
        error.response?.data?.error ||
        error.message ||
        'Có lỗi xảy ra, vui lòng thử lại!'
      setErrorMessage(errMsg)
    } finally {
      setSubmitting(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-slate-50">
        <div className="text-slate-500">Đang tải...</div>
      </div>
    )
  }

  return (
    <div className="flex flex-col h-full bg-white pb-20">
      {/* Header */}
      <LotteryHeader />

      {/* Date Navigation */}
      <DateNavigation date={xsmbData?.time} />

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto bg-slate-50 pb-6">
        {/* Special Prize */}
        <SpecialPrize number={xsmbData?.results?.ĐB?.[0]} />

        {/* Results Table */}
        <ResultsTable results={xsmbData?.results} />
      </main>

      {/* Floating Prediction Button */}
      <FloatingButton
        onClick={handleFloatingButtonClick}
        remainingPredictions={remainingPredictions}
        maxPredictions={maxPredictions}
        checkingPrediction={checkingPrediction}
      />

      {/* Prediction Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={
          remainingPredictions <= 0
            ? 'Lịch sử dự đoán hôm nay'
            : hasPredicted
            ? `Dự đoán (${remainingPredictions}/${maxPredictions} lượt)`
            : 'Dự đoán kết quả'
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
      </Modal>

      {/* Time Up Modal */}
      <TimeUpModal
        isOpen={isTimeUpModalOpen}
        onClose={() => setIsTimeUpModalOpen(false)}
        todayPredictions={todayPredictions}
      />
    </div>
  )
}
