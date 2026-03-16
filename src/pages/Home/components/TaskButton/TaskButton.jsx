import { UI_TEXT } from '../../../../config/uiText'

export const TaskButton = ({
  onClick,
  text = UI_TEXT.home.tasks.survey,
  amount = '+99,000 Coins',
  gradientColors = 'from-amber-500 to-orange-600',
  icon = 'monetization_on',
}) => {
  return (
    <a
      href="/test"
      onClick={(e) => {
        e.preventDefault()
        onClick?.()
      }}
      className="w-full flex items-center justify-between rounded-xl bg-white border border-primary/20 p-2 shadow-lg shadow-primary/10 hover:shadow-primary/20 hover:border-primary/30 active:scale-[0.99] transition-all no-underline mb-2"
    >
      <div className="flex items-center gap-2.5">
        <div
          className={`flex size-8 items-center justify-center rounded-lg bg-gradient-to-br ${gradientColors} text-white`}
        >
          <span className="material-symbols-outlined text-xl">
            {icon}
          </span>
        </div>
        <div className="flex flex-col items-start min-w-0">
          <span className="font-bold text-xs whitespace-nowrap text-slate-800">
            {text}
          </span>
          <div className="text-[10px] text-slate-500">
            {amount}
          </div>
        </div>
      </div>
      <div
        className={`flex items-center gap-1.5 rounded-lg bg-gradient-to-r ${gradientColors} px-2.5 py-1 text-[11px] font-bold text-white hover:opacity-90 transition-opacity whitespace-nowrap flex-shrink-0`}
      >
        <span>{UI_TEXT.home.tasks.join}</span>
        <span className="material-symbols-outlined text-xs">arrow_forward</span>
      </div>
    </a>
  )
}
