import { UI_TEXT } from '../../../../config/uiText'

export const TaskButton = ({ onClick, text = UI_TEXT.home.tasks.survey, amount = '+99,000VND' }) => {
  return (
    <a
      href="/test"
      onClick={(e) => {
        e.preventDefault()
        onClick?.()
      }}
      className="min-w-max flex items-center justify-between rounded-xl bg-white border border-primary/20 p-2 shadow-lg shadow-primary/10 hover:shadow-primary/20 hover:border-primary/30 active:scale-[0.99] transition-all no-underline"
    >
      <div className="flex items-center gap-2.5">
        <div className="flex size-8 items-center justify-center rounded-lg bg-gradient-to-br from-amber-500 to-orange-600 text-white">
          <span className="material-symbols-outlined text-xl">
            monetization_on
          </span>
        </div>
        <div className="flex flex-col items-start min-w-0">
          <span className="font-bold text-xs whitespace-nowrap text-slate-800">
            {text}
          </span>
          <span className="text-[10px] text-slate-500 whitespace-nowrap">
            {amount}
          </span>
        </div>
      </div>
      <div className="flex items-center gap-1.5 rounded-lg bg-gradient-to-r from-amber-500 to-orange-600 px-2.5 py-1 text-[11px] font-bold text-white hover:from-amber-600 hover:to-orange-700 transition-colors whitespace-nowrap flex-shrink-0">
        <span>{UI_TEXT.home.tasks.join}</span>
        <span className="material-symbols-outlined text-xs">
          arrow_forward
        </span>
      </div>
    </a>
  )
}

