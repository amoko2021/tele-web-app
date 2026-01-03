import { useState } from 'react'
import { useXSMB } from '../../hooks/useApi'
import { lotteryApi } from '../../services/api'
import { Modal } from '../../components/common/Modal'

export const Home = () => {
  const { data: xsmbData, loading } = useXSMB()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [prizeType, setPrizeType] = useState('db')
  const [prediction, setPrediction] = useState('')
  const [submitting, setSubmitting] = useState(false)

  const handleSubmitPrediction = async () => {
    if (!prediction) {
      alert('Vui lòng nhập số dự đoán')
      return
    }

    setSubmitting(true)
    try {
      const result = await lotteryApi.submitPrediction({
        prizeType,
        number: prediction,
        date: new Date().toISOString(),
      })
      alert(result.message)
      setIsModalOpen(false)
      setPrediction('')
    } catch (error) {
      alert('Có lỗi xảy ra, vui lòng thử lại!')
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
      <header className="sticky top-0 z-20 flex items-center justify-between border-b border-slate-100 bg-white/95 px-4 py-3 backdrop-blur-sm">
        <div className="flex items-center gap-3">
          <div className="flex size-8 items-center justify-center rounded-full bg-primary/10 text-primary">
            <span
              className="material-symbols-outlined"
              style={{ fontSize: 20 }}
            >
              stars
            </span>
          </div>
          <h1 className="text-lg font-bold leading-tight tracking-tight text-slate-900">
            Xổ số Miền Bắc
          </h1>
        </div>
        <button className="flex size-9 items-center justify-center rounded-full text-slate-500 hover:bg-slate-100 transition-colors">
          <span className="material-symbols-outlined">calendar_today</span>
        </button>
      </header>

      {/* Date Navigation */}
      <div className="flex items-center justify-between bg-primary px-4 py-3 text-white shadow-sm">
        <button className="flex size-8 items-center justify-center rounded-full bg-white/20 hover:bg-white/30 transition-colors">
          <span className="material-symbols-outlined text-sm">
            arrow_back_ios_new
          </span>
        </button>
        <div className="flex flex-col items-center">
          <span className="text-sm font-medium opacity-90">Hôm nay</span>
          <span className="text-base font-bold">{xsmbData?.time}</span>
        </div>
        <button className="flex size-8 items-center justify-center rounded-full bg-white/20 hover:bg-white/30 transition-colors">
          <span className="material-symbols-outlined text-sm">
            arrow_forward_ios
          </span>
        </button>
      </div>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto bg-slate-50 pb-6">
        {/* Special Prize */}
        <div className="relative px-4 pt-6 pb-2">
          <div className="flex flex-col items-center justify-center gap-2 rounded-xl bg-white border border-red-100 p-6 shadow-[0_4px_20px_-4px_rgba(220,38,38,0.1)] relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(#fee2e2_1px,transparent_1px)] [background-size:16px_16px] opacity-50"></div>
            <span className="relative z-10 rounded-full bg-red-50 px-3 py-1 text-xs font-bold uppercase tracking-wider text-red-600">
              Giải Đặc Biệt
            </span>
            <h2 className="relative z-10 text-4xl font-extrabold tracking-widest text-red-600 drop-shadow-sm">
              {xsmbData?.results?.ĐB?.[0] || '-----'}
            </h2>
          </div>
        </div>

        {/* Results Table */}
        <div className="px-4 py-4">
          <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
            <div className="flex border-b border-slate-100 bg-slate-50 px-4 py-2">
              <div className="w-16 flex-none text-xs font-semibold uppercase text-slate-400">
                Giải
              </div>
              <div className="flex-1 text-center text-xs font-semibold uppercase text-slate-400">
                Kết quả
              </div>
            </div>

            {/* G1 */}
            <div className="flex items-center border-b border-slate-100 px-4 py-4 hover:bg-slate-50 transition-colors">
              <div className="w-16 flex-none text-sm font-bold text-slate-500">
                G1
              </div>
              <div className="flex-1 text-center text-xl font-bold tracking-wider text-slate-800">
                {xsmbData?.results?.G1?.[0] || '-----'}
              </div>
            </div>

            {/* G2 */}
            <div className="flex items-center border-b border-slate-100 px-4 py-4 hover:bg-slate-50 transition-colors">
              <div className="w-16 flex-none text-sm font-bold text-slate-500">
                G2
              </div>
              <div className="flex flex-1 flex-wrap justify-center gap-x-8 gap-y-2 text-center text-lg font-bold tracking-wider text-slate-800">
                {xsmbData?.results?.G2?.map((num, idx) => (
                  <span key={idx}>{num}</span>
                )) || <span>-----</span>}
              </div>
            </div>

            {/* G3 */}
            <div className="flex items-center border-b border-slate-100 px-4 py-4 hover:bg-slate-50 transition-colors">
              <div className="w-16 flex-none text-sm font-bold text-slate-500">
                G3
              </div>
              <div className="grid flex-1 grid-cols-2 gap-x-4 gap-y-3 text-center text-lg font-medium tracking-wider text-slate-800 sm:grid-cols-3">
                {xsmbData?.results?.G3?.map((num, idx) => (
                  <span key={idx}>{num}</span>
                )) || <span>-----</span>}
              </div>
            </div>

            {/* G4 */}
            <div className="flex items-center border-b border-slate-100 px-4 py-4 hover:bg-slate-50 transition-colors">
              <div className="w-16 flex-none text-sm font-bold text-slate-500">
                G4
              </div>
              <div className="grid flex-1 grid-cols-2 gap-x-4 gap-y-3 text-center text-lg font-medium tracking-wider text-slate-800">
                {xsmbData?.results?.G4?.map((num, idx) => (
                  <span key={idx}>{num}</span>
                )) || <span>-----</span>}
              </div>
            </div>

            {/* G5 */}
            <div className="flex items-center border-b border-slate-100 px-4 py-4 hover:bg-slate-50 transition-colors">
              <div className="w-16 flex-none text-sm font-bold text-slate-500">
                G5
              </div>
              <div className="grid flex-1 grid-cols-3 gap-x-2 gap-y-3 text-center text-lg font-medium tracking-wider text-slate-800">
                {xsmbData?.results?.G5?.map((num, idx) => (
                  <span key={idx}>{num}</span>
                )) || <span>-----</span>}
              </div>
            </div>

            {/* G6 */}
            <div className="flex items-center border-b border-slate-100 px-4 py-4 hover:bg-slate-50 transition-colors">
              <div className="w-16 flex-none text-sm font-bold text-slate-500">
                G6
              </div>
              <div className="flex flex-1 flex-wrap justify-center gap-x-6 gap-y-2 text-center text-lg font-medium tracking-wider text-slate-800">
                {xsmbData?.results?.G6?.map((num, idx) => (
                  <span key={idx}>{num}</span>
                )) || <span>-----</span>}
              </div>
            </div>

            {/* G7 */}
            <div className="flex items-center px-4 py-4 hover:bg-slate-50 transition-colors">
              <div className="w-16 flex-none text-sm font-bold text-slate-500">
                G7
              </div>
              <div className="flex flex-1 flex-wrap justify-center gap-x-6 gap-y-2 text-center text-lg font-bold tracking-wider text-slate-800">
                {xsmbData?.results?.G7?.map((num, idx) => (
                  <span key={idx} className="text-primary">
                    {num}
                  </span>
                )) || <span>--</span>}
              </div>
            </div>
          </div>

          <div className="mt-4 text-center">
            <p className="text-xs text-slate-400">
              Kết quả được cập nhật trực tiếp lúc 18:15 hàng ngày
            </p>
          </div>
        </div>
      </main>

      {/* Floating Prediction Button */}
      <button
        onClick={() => setIsModalOpen(true)}
        className="fixed bottom-24 right-4 z-20 flex h-12 items-center gap-2 rounded-full bg-primary pl-4 pr-6 text-white shadow-lg shadow-blue-500/30 hover:bg-blue-600 active:scale-95 transition-all"
      >
        <span className="material-symbols-outlined">casino</span>
        <span className="font-bold text-sm">Tham gia dự đoán</span>
      </button>

      {/* Prediction Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Dự đoán kết quả"
      >
        <div className="mb-5">
          <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-slate-500">
            Chọn loại giải
          </label>
          <div className="grid grid-cols-3 gap-2">
            <label className="cursor-pointer">
              <input
                type="radio"
                name="prize_type"
                value="db"
                checked={prizeType === 'db'}
                onChange={(e) => setPrizeType(e.target.value)}
                className="peer hidden"
              />
              <div className="flex items-center justify-center rounded-lg border border-slate-200 bg-white py-2 text-sm font-bold text-slate-500 hover:bg-slate-50 peer-checked:border-primary peer-checked:bg-primary/10 peer-checked:text-primary transition-all">
                Giải ĐB
              </div>
            </label>
            <label className="cursor-pointer">
              <input
                type="radio"
                name="prize_type"
                value="loto"
                checked={prizeType === 'loto'}
                onChange={(e) => setPrizeType(e.target.value)}
                className="peer hidden"
              />
              <div className="flex items-center justify-center rounded-lg border border-slate-200 bg-white py-2 text-sm font-bold text-slate-500 hover:bg-slate-50 peer-checked:border-primary peer-checked:bg-primary/10 peer-checked:text-primary transition-all">
                Lô tô
              </div>
            </label>
            <label className="cursor-pointer">
              <input
                type="radio"
                name="prize_type"
                value="loxien"
                checked={prizeType === 'loxien'}
                onChange={(e) => setPrizeType(e.target.value)}
                className="peer hidden"
              />
              <div className="flex items-center justify-center rounded-lg border border-slate-200 bg-white py-2 text-sm font-bold text-slate-500 hover:bg-slate-50 peer-checked:border-primary peer-checked:bg-primary/10 peer-checked:text-primary transition-all">
                Lô xiên
              </div>
            </label>
          </div>
        </div>

        <div className="mb-6">
          <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-slate-500">
            Nhập số dự đoán
          </label>
          <div className="relative">
            <input
              type="number"
              value={prediction}
              onChange={(e) => setPrediction(e.target.value)}
              placeholder="00"
              className="block w-full rounded-xl border-slate-200 bg-slate-50 p-4 text-center text-3xl font-bold tracking-widest text-slate-800 placeholder:text-slate-300 focus:border-primary focus:bg-white focus:ring-primary"
            />
          </div>
        </div>

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
      </Modal>
    </div>
  )
}
