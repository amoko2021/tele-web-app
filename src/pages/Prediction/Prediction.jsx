import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { HeaderSection } from './components/HeaderSection'
import { DateDisplay } from './components/DateDisplay'
import { PredictionCategoryCard } from './components/PredictionCategoryCard'
import lotteryApi from '../../services/api/lotteryApi'
import { Modal } from '../../components/common/Modal/Modal'

export const Prediction = () => {
  const navigate = useNavigate()
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Add Modal State
  const [addModal, setAddModal] = useState({
    isOpen: false,
    categoryId: null,
    categoryKey: '', // db_2, loto_2, etc.
    title: '',
    maxDigits: 2
  })
  const [inputNumber, setInputNumber] = useState('')
  const [addError, setAddError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Delete Modal State
  const [deleteModal, setDeleteModal] = useState({
    isOpen: false,
    predictionId: null,
    number: ''
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
    // For now, just show a message or toggle a delete mode if we wanted complex UI
    // But per requirement, clicking "Edit/Delete" (which we interpret as clicking items) works.
    // The "Manage" button could potentially just be visual or scroll to the list.
    console.log('Manage category:', id)
  }

  const getCategoryKey = (id) => {
    const map = {
      1: 'db_2',
      2: 'loto_2',
      3: 'db_3',
      4: 'loto_3'
    }
    return map[id]
  }

  const getDigitCount = (id) => {
    return (id === 3 || id === 4) ? 3 : 2
  }

  const handleAdd = (category) => {
    setAddModal({
      isOpen: true,
      categoryId: category.id,
      categoryKey: getCategoryKey(category.id),
      title: category.title,
      maxDigits: getDigitCount(category.id)
    })
    setInputNumber('')
    setAddError('')
  }

  const handleFloatingAdd = () => {
    // Default to first category or show a selector. 
    // For simplicity, let's open the first category or just ignore if data not loaded
    if (categories.length > 0) {
      handleAdd(categories[0])
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
      setAddModal(prev => ({ ...prev, isOpen: false }))
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
      number
    })
  }

  const handleConfirmDelete = async () => {
    try {
      setIsSubmitting(true)
      await lotteryApi.deletePrediction(deleteModal.predictionId)
      setDeleteModal(prev => ({ ...prev, isOpen: false }))
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
      <HeaderSection
        onBack={handleBack}
        title="Dự đoán của tôi"
        icon={<span className="material-symbols-outlined filled-icon">history</span>}
      />

      <main className="flex-1 overflow-y-auto no-scrollbar pb-32">
        <DateDisplay />

        <div className="px-4 py-4 space-y-6">
          <div className="flex items-center gap-2 rounded-lg bg-amber-50 px-3 py-2 text-amber-700 border border-amber-100">
            <span className="material-symbols-outlined text-lg">schedule</span>
            <span className="text-xs font-bold uppercase tracking-wider">Đang chờ kết quả (18:15)</span>
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
              />
            ))
          )}

          <div className="rounded-xl border-2 border-dashed border-slate-200 p-6 text-center">
            <p className="text-sm font-medium text-slate-500">Mỗi hạng mục được phép dự đoán tối đa 10 bộ số.</p>
            <button className="mt-2 text-sm font-bold text-primary hover:underline">Xem thể lệ chương trình</button>
          </div>
        </div>
      </main>

      <button
        className="fixed bottom-28 right-4 lg:right-[calc(50%-220px)] z-20 flex size-14 items-center justify-center rounded-full bg-primary text-white shadow-lg shadow-blue-500/40 hover:scale-105 active:scale-95 transition-all"
        onClick={handleFloatingAdd}
      >
        <span className="material-symbols-outlined text-2xl">add</span>
      </button>

      {/* Add Prediction Modal */}
      <Modal
        isOpen={addModal.isOpen}
        onClose={() => setAddModal(prev => ({ ...prev, isOpen: false }))}
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
              placeholder={addModal.maxDigits === 2 ? "00" : "000"}
              className="block w-full rounded-xl border-slate-200 bg-slate-50 p-4 text-center text-3xl font-bold tracking-widest text-slate-800 placeholder:text-slate-300 focus:border-primary focus:bg-white focus:ring-primary outline-none transition-all"
              autoFocus
            />
            {addError && <p className="mt-2 text-xs font-medium text-red-500 text-center">{addError}</p>}
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
        onClose={() => setDeleteModal(prev => ({ ...prev, isOpen: false }))}
        title="Xóa dự đoán"
      >
        <div className="flex flex-col gap-4 text-center">
          <div className="py-2">
            <p className="text-slate-600 mb-2">Bạn có chắc chắn muốn xóa số này?</p>
            <div className="text-4xl font-black text-slate-800">{deleteModal.number}</div>
          </div>
          
          <div className="grid grid-cols-2 gap-3">
             <button
              onClick={() => setDeleteModal(prev => ({ ...prev, isOpen: false }))}
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
