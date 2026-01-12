import { UI_TEXT } from '../../../../config/uiText'

export const ActionButtons = ({ onDeposit, onWithdraw, onHistory }) => {
  return (
    <div className="flex gap-3 mt-4">
      {/* <button
        onClick={onDeposit}
        className="flex-1 flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white h-11 rounded-lg font-medium transition-colors text-sm"
      >
        <span className="material-symbols-outlined text-[20px]">
          add_circle
        </span>
        {UI_TEXT.account.actions.deposit}
      </button> */}
      <button
        onClick={onWithdraw}
        className="flex-1 flex items-center justify-center gap-2 bg-primary hover:bg-blue-600 text-white h-11 rounded-lg font-medium transition-colors text-sm"
      >
        <span className="material-symbols-outlined text-[20px]">local_atm</span>
        {UI_TEXT.account.actions.withdraw}
      </button>
      <button
        onClick={onHistory}
        className="flex-1 flex items-center justify-center gap-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 h-11 rounded-lg font-medium transition-colors text-sm"
      >
        <span className="material-symbols-outlined text-[20px]">history</span>
        {UI_TEXT.account.actions.history}
      </button>
    </div>
  )
}

