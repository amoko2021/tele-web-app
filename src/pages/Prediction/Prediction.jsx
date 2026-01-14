import { useNavigate } from 'react-router-dom'
import { HeaderSection } from './components/HeaderSection'
import { DateDisplay } from './components/DateDisplay'
import { PredictionCategoryCard } from './components/PredictionCategoryCard'

const predictionData = [
  {
    id: 1,
    title: 'Giải ĐB 2 số',
    subtitle: 'Tối đa 10 lượt dự đoán',
    count: 1,
    maxCount: 10,
    color: 'red',
    icon: 'stars',
    numbers: ['89'],
    updateTime: '08:30'
  },
  {
    id: 2,
    title: 'Lô Tô 2 số',
    subtitle: 'Tối đa 10 lượt dự đoán',
    count: 3,
    maxCount: 10,
    color: 'blue',
    icon: 'filter_2',
    numbers: ['23', '56', '92'],
    updateTime: '09:15'
  },
  {
    id: 3,
    title: 'Đặc Biệt 3 số',
    subtitle: 'Tối đa 10 lượt dự đoán',
    count: 1,
    maxCount: 10,
    color: 'orange',
    icon: 'workspace_premium',
    numbers: ['489'],
    updateTime: '10:45'
  },
  {
    id: 4,
    title: 'Lô Tô 3 số',
    subtitle: 'Tối đa 10 lượt dự đoán',
    count: 2,
    maxCount: 10,
    color: 'indigo',
    icon: 'filter_3',
    numbers: ['123', '456'],
    updateTime: '11:20'
  }
]

export const Prediction = () => {
  const navigate = useNavigate()

  const handleBack = () => {
    navigate('/')
  }

  const handleManage = (id) => {
    console.log('Manage prediction:', id)
  }

  const handleAdd = (id) => {
    console.log('Add prediction:', id)
  }

  const handleFloatingAdd = () => {
    console.log('Floating add clicked')
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

          {predictionData.map((prediction) => (
            <PredictionCategoryCard
              key={prediction.id}
              {...prediction}
              onManage={() => handleManage(prediction.id)}
              onAdd={() => handleAdd(prediction.id)}
            />
          ))}

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
    </div>
  )
}
