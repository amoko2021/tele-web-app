export const PredictionCategoryCard = ({
  title,
  subtitle,
  count,
  maxCount,
  color,
  icon,
  numbers,
  predictionIds = [], // Array of IDs corresponding to numbers
  updateTime,
  onManage,
  onAdd,
  onDelete // New prop for handling deletion
}) => {
  const colorClasses = {
    red: {
      bg: 'bg-red-50',
      border: 'border-red-100',
      text: 'text-red-600',
      iconBg: 'bg-red-50',
      iconText: 'text-red-600',
      badge: 'bg-red-50 text-red-600',
      hoverBorder: 'hover:border-red-200',
      hoverText: 'hover:text-red-300'
    },
    blue: {
      bg: 'bg-blue-50',
      border: 'border-blue-100',
      text: 'text-blue-600',
      iconBg: 'bg-blue-50',
      iconText: 'text-blue-600',
      badge: 'bg-blue-50 text-blue-600',
      hoverBorder: 'hover:border-blue-200',
      hoverText: 'hover:text-blue-300'
    },
    orange: {
      bg: 'bg-orange-50',
      border: 'border-orange-100',
      text: 'text-orange-600',
      iconBg: 'bg-orange-50',
      iconText: 'text-orange-600',
      badge: 'bg-orange-50 text-orange-600',
      hoverBorder: 'hover:border-orange-200',
      hoverText: 'hover:text-orange-300'
    },
    indigo: {
      bg: 'bg-indigo-50',
      border: 'border-indigo-100',
      text: 'text-indigo-600',
      iconBg: 'bg-indigo-50',
      iconText: 'text-indigo-600',
      badge: 'bg-indigo-50 text-indigo-600',
      hoverBorder: 'hover:border-indigo-200',
      hoverText: 'hover:text-indigo-300'
    }
  }

  const theme = colorClasses[color] || colorClasses.blue

  const renderNumbers = () => {
    const elements = []
    numbers.forEach((num, i) => {
      const predId = predictionIds[i]
      elements.push(
        <div 
          key={i} 
          className={`relative group/item flex aspect-square items-center justify-center rounded-xl ${theme.bg} ${theme.border} cursor-pointer transition-transform active:scale-95`}
          onClick={() => onDelete && onDelete(predId, num)}
        >
          <span className={`font-black ${theme.text} ${num.length > 2 ? 'text-xl' : 'text-2xl'}`}>{num}</span>
          {/* Optional delete indicator on hover if desktop, or just implied click-to-manage */}
        </div>
      )
    })
    const remaining = maxCount - numbers.length
    for (let i = 0; i < remaining; i++) {
      elements.push(
        <button
          key={`add-${i}`}
          className={`flex aspect-square items-center justify-center rounded-xl border-2 border-dashed border-slate-100 text-slate-300 ${theme.hoverBorder} ${theme.hoverText} transition-colors`}
          onClick={onAdd}
        >
          <span className="material-symbols-outlined">add</span>
        </button>
      )
    }
    return elements
  }

  return (
    <div className="group relative overflow-hidden rounded-2xl bg-white p-5 border border-slate-200 shadow-sm transition-all">
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className={`flex size-10 items-center justify-center rounded-xl ${theme.iconBg} ${theme.iconText}`}>
              <span className="material-symbols-outlined">{icon}</span>
            </div>
            <div>
              <h3 className="text-xs font-extrabold uppercase tracking-widest text-slate-400">{title}</h3>
              <p className="text-[10px] text-slate-500">{subtitle}</p>
            </div>
          </div>
          <span className={`text-[10px] font-bold ${theme.badge} px-2 py-1 rounded`}>{count}/{maxCount}</span>
        </div>
        <div className="grid grid-cols-5 gap-2">
          {renderNumbers()}
        </div>
        <div className="flex items-center justify-between border-t border-slate-50 pt-3">
          <span className="text-[10px] font-medium text-slate-400">Cập nhật lúc: {updateTime}</span>
          <span className="text-[10px] font-bold text-primary flex items-center gap-1 cursor-pointer" onClick={onManage}>
            {count > 0 ? (
              <>
                Quản lý <span className="material-symbols-outlined text-sm">settings</span>
              </>
            ) : (
              'Quản lý'
            )}
          </span>
        </div>
      </div>
    </div>
  )
}
