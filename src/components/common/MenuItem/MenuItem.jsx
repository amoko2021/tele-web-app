export const MenuItem = ({
  icon,
  title,
  description,
  onClick,
  iconBgColor = 'bg-blue-100 dark:bg-blue-900/30',
  iconTextColor = 'text-primary',
}) => {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-4 p-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors w-full group"
    >
      <div
        className={`w-10 h-10 rounded-lg ${iconBgColor} ${iconTextColor} flex items-center justify-center shrink-0`}
      >
        <span className="material-symbols-outlined">{icon}</span>
      </div>
      <div className="flex flex-1 items-center justify-between">
        <div className="text-left">
          <p className="text-slate-900 dark:text-white text-sm font-medium">
            {title}
          </p>
          {description && (
            <p className="text-slate-500 dark:text-slate-400 text-xs mt-0.5">
              {description}
            </p>
          )}
        </div>
        <span className="material-symbols-outlined text-slate-300 dark:text-slate-600 group-hover:text-primary transition-colors text-[20px]">
          chevron_right
        </span>
      </div>
    </button>
  )
}
