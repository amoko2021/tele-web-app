import { useState, useEffect, useRef, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { DateDisplay } from './components/DateDisplay'
import { PredictionCategoryCard } from './components/PredictionCategoryCard'
import lotteryApi from '../../services/api/lotteryApi'
import userApi from '../../services/api/userApi'
import { Modal } from '../../components/common/Modal/Modal'
import { useTelegram } from '../../hooks/useTelegram'
import { useAdsgram } from '../../hooks/useAdsgram'
import { useSonarAds } from '../../hooks/useSonarAds'
import { useMonetag } from '../../hooks/useMonetag'
// import { HeaderSection } from './components/HeaderSection'

export const Prediction = () => {
  const navigate = useNavigate()
  const { user } = useTelegram()
  const userId = user?.id

  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Use a ref to store the pending category for ad callbacks to access latest value
  const pendingCategoryRef = useRef(null)

  // Add Modal State
  const [addModal, setAddModal] = useState({
    isOpen: false,
    categoryId: null,
    categoryKey: '', // db_2, loto_2, etc.
    title: '',
    maxDigits: 2,
  })
  const [inputNumber, setInputNumber] = useState('')
  const [addError, setAddError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Delete Modal State
  const [deleteModal, setDeleteModal] = useState({
    isOpen: false,
    predictionId: null,
    number: '',
  })

  // Helper function to check if time is up (18:00 VN time)
  const checkIsTimeUp = () => {
    const nowVN = new Date().toLocaleString('en-US', {
      timeZone: 'Asia/Ho_Chi_Minh',
    })
    const vnDate = new Date(nowVN)
    const currentHour = vnDate.getHours()
    // Block from 18:00
    return currentHour >= 18
  }

  const isTimeUp = checkIsTimeUp()

  // Helper to check if current time is after 18:30 VN
  const checkIsAfter1830 = () => {
    const nowVN = new Date().toLocaleString('en-US', {
      timeZone: 'Asia/Ho_Chi_Minh',
    })
    const vnDate = new Date(nowVN)
    const hours = vnDate.getHours()
    const minutes = vnDate.getMinutes()
    return hours > 18 || (hours === 18 && minutes >= 30)
  }

  const isAfter1830 = checkIsAfter1830()

  // Helper to open modal
  const openAddModal = useCallback((category) => {
    const getCategoryKey = (id) => {
      const map = {
        1: 'db_2',
        2: 'loto_2',
        3: 'db_3',
        4: 'loto_3',
      }
      return map[id]
    }

    const getDigitCount = (id) => {
      return id === 3 || id === 4 ? 3 : 2
    }

    setAddModal({
      isOpen: true,
      categoryId: category.id,
      categoryKey: getCategoryKey(category.id),
      title: category.title,
      maxDigits: getDigitCount(category.id),
    })
    setInputNumber('')
    setAddError('')
  }, [])

  // Common Ad Success Handler
  const handleAdSuccess = useCallback(() => {
    const category = pendingCategoryRef.current
    if (category) {
      openAddModal(category)
      pendingCategoryRef.current = null
    }
  }, [openAddModal])

  // Ad Success Handler for time-up ads (earn random money instead of opening modal)
  const handleAdSuccessForMoney = useCallback(async () => {
    try {
      // Random amount between 10-100
      const randomAmount = Math.floor(Math.random() * 91) + 10

      // Get current balance
      const userInfo = await userApi.getUserInfo(userId)
      const currentBalance = userInfo?.data?.balance || 0
      const newBalance = currentBalance + randomAmount

      // Update balance
      await userApi.updateBalance(userId, newBalance)

      // Show success notification
      if (window.Telegram?.WebApp) {
        window.Telegram.WebApp.showAlert(
          `🎉 Bạn nhận được ${randomAmount}đ từ quảng cáo!`
        )
      }

      pendingCategoryRef.current = null
    } catch (err) {
      console.error('Failed to add money after ad:', err)
      if (window.Telegram?.WebApp) {
        window.Telegram.WebApp.showAlert('Có lỗi xảy ra, vui lòng thử lại!')
      }
    }
  }, [userId])

  const handleAdError = useCallback((err) => {
    console.error('Ad failed', err)
    pendingCategoryRef.current = null
  }, [])

  // 1. Adsgram Hook (for db_2, loto_2)
  const showAdsgram = useAdsgram({
    blockId: '20539',
    fallbackBlockId: '20540',
    onReward: handleAdSuccess,
    onError: handleAdError,
  })

  // 2. SonarAds Hook (for db_3)
  const { handleWatchAds: showSonar } = useSonarAds({
    userId,
    onReward: handleAdSuccess,
    onError: handleAdError,
  })

  // 3. Monetag Hook (for loto_3)
  const { handleWatchAds: showMonetag } = useMonetag({
    userId,
    zoneId: import.meta.env.VITE_MONETAG_ZONE_ID || '',
    onReward: handleAdSuccess,
    onError: handleAdError,
  })

  // Ad hooks for time-up (earn money instead of opening modal)
  const showAdsgramForMoney = useAdsgram({
    blockId: '20539',
    fallbackBlockId: '20540',
    onReward: handleAdSuccessForMoney,
    onError: handleAdError,
  })

  const { handleWatchAds: showSonarForMoney } = useSonarAds({
    userId,
    onReward: handleAdSuccessForMoney,
    onError: handleAdError,
  })

  const { handleWatchAds: showMonetagForMoney } = useMonetag({
    userId,
    zoneId: import.meta.env.VITE_MONETAG_ZONE_ID || '',
    onReward: handleAdSuccessForMoney,
    onError: handleAdError,
  })

  // Fetch predictions
  const fetchPredictions = async () => {
    try {
      setLoading(true)
      const response = await lotteryApi.getMyPredictions()
      if (response && response.data && response.data.categories) {
        setCategories(response.data.categories)
      }
    } catch (err) {
      console.error('Failed to fetch predictions', err)
      setError('Không thể tải dữ liệu dự đoán')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchPredictions()
  }, [])

  const handleBack = () => {
    navigate('/')
  }

  const handleManage = (id) => {
    console.log('Manage category:', id)
  }

  const handleAdd = (category) => {
    // Check time first
    if (isTimeUp) {
      return
    }

    // Store category in ref for callback access
    pendingCategoryRef.current = category

    // Logic: check category ID and show appropriate ad
    // db_2 (1), loto_2 (2) -> Adsgram
    // db_3 (3) -> Sonar
    // loto_3 (4) -> Monetag

    if (category.id === 1 || category.id === 2) {
      showMonetag(0)
    } else if (category.id === 3) {
      // Pass 0 or minimal reward since the goal is just gating
      showSonar(0)
    } else if (category.id === 4) {
      showAdsgram()
    } else {
      // Fallback for unknown categories, just open modal
      openAddModal(category)
      pendingCategoryRef.current = null
    }
  }

  const handleFloatingAdd = () => {
    if (categories.length > 0 && !isTimeUp) {
      handleAdd(categories[0])
    }
  }

  // Handle ad click for time-up slots (earn money instead of prediction)
  const handleAdClick = (category) => {
    // Store category in ref for callback access
    pendingCategoryRef.current = category

    // Logic: check category ID and show appropriate ad
    // db_2 (1), loto_2 (2) -> Monetag (for money)
    // db_3 (3) -> Sonar (for money)
    // loto_3 (4) -> Adsgram (for money)

    if (category.id === 1 || category.id === 2) {
      showMonetagForMoney(0)
    } else if (category.id === 3) {
      showSonarForMoney(0)
    } else if (category.id === 4) {
      showAdsgramForMoney()
    } else {
      // Fallback
      pendingCategoryRef.current = null
    }
  }

  const handleConfirmAdd = async () => {
    if (!inputNumber) return

    // Validate length
    if (inputNumber.length !== addModal.maxDigits) {
      setAddError(`Vui lòng nhập đủ ${addModal.maxDigits} chữ số`)
      return
    }

    try {
      setIsSubmitting(true)
      setAddError('')
      await lotteryApi.addPrediction(addModal.categoryKey, inputNumber)

      // Success
      setAddModal((prev) => ({ ...prev, isOpen: false }))
      fetchPredictions() // Refresh list
    } catch (err) {
      // Handle 409 and 400
      if (err.response) {
        if (err.response.status === 409) {
          setAddError('Số này đã được dự đoán')
        } else if (err.response.status === 400) {
          setAddError(err.response.data?.error || 'Đã đạt giới hạn dự đoán')
        } else {
          setAddError('Đã có lỗi xảy ra')
        }
      } else {
        setAddError('Lỗi kết nối')
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleDelete = (predictionId, number) => {
    setDeleteModal({
      isOpen: true,
      predictionId,
      number,
    })
  }

  const handleConfirmDelete = async () => {
    try {
      setIsSubmitting(true)
      await lotteryApi.deletePrediction(deleteModal.predictionId)
      setDeleteModal((prev) => ({ ...prev, isOpen: false }))
      fetchPredictions()
    } catch (err) {
      console.error('Delete failed', err)
      alert('Không thể xóa dự đoán')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="flex flex-col h-full bg-slate-100 pb-20">
      <main className="flex-1 overflow-y-auto no-scrollbar pb-32">
        <DateDisplay />

        <div className="px-4 py-4 space-y-6">
          <div className="flex items-center gap-2 rounded-lg bg-amber-50 px-3 py-2 text-amber-700 border border-amber-100">
            <span className="material-symbols-outlined text-lg">schedule</span>
            <span className="text-xs font-bold uppercase tracking-wider">
              {isAfter1830
                ? 'Thời gian dự đoán kết thúc. Nhấn vào biểu tượng quảng cáo để nhận 10-100đ'
                : 'Đang chờ kết quả (18:15)'}
            </span>
          </div>

          {loading ? (
            <div className="flex justify-center py-10">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
          ) : error ? (
            <div className="text-center text-red-500 py-10">{error}</div>
          ) : (
            categories.map((category) => (
              <PredictionCategoryCard
                key={category.id}
                title={category.title}
                subtitle={category.subtitle}
                count={category.count}
                maxCount={category.max_count}
                color={category.color}
                icon={category.icon}
                numbers={category.numbers}
                predictionIds={category.prediction_ids}
                updateTime={category.update_time}
                onManage={() => handleManage(category.id)}
                onAdd={() => handleAdd(category)}
                onDelete={handleDelete}
                isTimeUp={isTimeUp}
                onAdClick={() => handleAdClick(category)}
              />
            ))
          )}

          <div className="rounded-xl border-2 border-dashed border-slate-200 p-6 text-center">
            <p className="text-sm font-medium text-slate-500">
              Mỗi hạng mục được phép dự đoán tối đa 10 bộ số.
            </p>
            <button className="mt-2 text-sm font-bold text-primary hover:underline">
              Xem thể lệ chương trình
            </button>
          </div>
        </div>
      </main>

      {!isTimeUp && (
        <button
          className="fixed bottom-28 right-4 lg:right-[calc(50%-220px)] z-20 flex size-14 items-center justify-center rounded-full bg-primary text-white shadow-lg shadow-blue-500/40 hover:scale-105 active:scale-95 transition-all"
          onClick={handleFloatingAdd}
        >
          <span className="material-symbols-outlined text-2xl">add</span>
        </button>
      )}

      {/* Add Prediction Modal */}
      <Modal
        isOpen={addModal.isOpen}
        onClose={() => setAddModal((prev) => ({ ...prev, isOpen: false }))}
        title={`Thêm ${addModal.title}`}
      >
        <div className="flex flex-col gap-4">
          <div>
            <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-slate-500">
              Nhập số dự đoán ({addModal.maxDigits} số)
            </label>
            <input
              type="number"
              value={inputNumber}
              onChange={(e) => setInputNumber(e.target.value)}
              placeholder={addModal.maxDigits === 2 ? '00' : '000'}
              className="block w-full rounded-xl border-slate-200 bg-slate-50 p-4 text-center text-3xl font-bold tracking-widest text-slate-800 placeholder:text-slate-300 focus:border-primary focus:bg-white focus:ring-primary outline-none transition-all"
              autoFocus
            />
            {addError && (
              <p className="mt-2 text-xs font-medium text-red-500 text-center">
                {addError}
              </p>
            )}
          </div>

          <button
            onClick={handleConfirmAdd}
            disabled={isSubmitting}
            className="w-full rounded-xl bg-primary py-3 text-sm font-bold text-white hover:bg-blue-600 disabled:opacity-70 disabled:cursor-not-allowed transition-colors"
          >
            {isSubmitting ? 'Đang xử lý...' : 'Xác nhận'}
          </button>
        </div>
      </Modal>

      {/* Delete Prediction Modal */}
      <Modal
        isOpen={deleteModal.isOpen}
        onClose={() => setDeleteModal((prev) => ({ ...prev, isOpen: false }))}
        title="Xóa dự đoán"
      >
        <div className="flex flex-col gap-4 text-center">
          <div className="py-2">
            <p className="text-slate-600 mb-2">
              Bạn có chắc chắn muốn xóa số này?
            </p>
            <div className="text-4xl font-black text-slate-800">
              {deleteModal.number}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() =>
                setDeleteModal((prev) => ({ ...prev, isOpen: false }))
              }
              className="w-full rounded-xl bg-slate-100 py-3 text-sm font-bold text-slate-600 hover:bg-slate-200 transition-colors"
            >
              Hủy
            </button>
            <button
              onClick={handleConfirmDelete}
              disabled={isSubmitting}
              className="w-full rounded-xl bg-red-500 py-3 text-sm font-bold text-white hover:bg-red-600 disabled:opacity-70 disabled:cursor-not-allowed transition-colors"
            >
              {isSubmitting ? '...' : 'Xóa'}
            </button>
          </div>
        </div>
      </Modal>
    </div>
  )
}
