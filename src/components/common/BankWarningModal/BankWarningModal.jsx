import { UI_TEXT } from '../../../config/uiText'

export const BankWarningModal = ({ isOpen, onClose, onSetup }) => {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4 py-6 bg-slate-900/60 backdrop-blur-sm">
      {/* Modal Content */}
      <div className="w-full max-w-[400px] bg-white dark:bg-slate-800 rounded-2xl shadow-2xl transform transition-all flex flex-col overflow-hidden animate-in fade-in zoom-in duration-200">
        {/* Graphic / Icon Area */}
        <div className="pt-8 pb-4 flex justify-center">
          <div className="relative">
            <div className="absolute inset-0 bg-orange-100 dark:bg-orange-900/30 rounded-full scale-150 opacity-50"></div>
            <div className="relative h-16 w-16 bg-orange-50 dark:bg-orange-900/40 rounded-full flex items-center justify-center text-orange-500 dark:text-orange-400">
              <span className="material-symbols-outlined text-[32px]">
                warning
              </span>
            </div>
            {/* Small Badge */}
            <div className="absolute -bottom-1 -right-1 bg-white dark:bg-slate-800 rounded-full p-1 shadow-sm">
              <div className="bg-red-500 rounded-full p-1">
                <span className="material-symbols-outlined text-white text-[10px] font-bold block">
                  priority_high
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Text Content */}
        <div className="px-6 pb-2 text-center">
          <h3 className="text-slate-900 dark:text-white tracking-tight text-xl font-bold leading-tight mb-3">
            {UI_TEXT.withdrawal.warning.noBank}
          </h3>
          <p className="text-slate-500 dark:text-slate-400 text-sm font-normal leading-relaxed">
            {UI_TEXT.withdrawal.warning.setupFirst}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="p-6 pt-6 flex flex-col-reverse sm:flex-row gap-3">
          <button
            onClick={onClose}
            className="group flex-1 h-11 flex items-center justify-center px-4 rounded-lg border border-slate-200 dark:border-slate-600 bg-transparent hover:bg-slate-50 dark:hover:bg-slate-700/50 text-slate-600 dark:text-slate-300 text-sm font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-slate-200"
          >
            <span>{UI_TEXT.common.close}</span>
          </button>
          <button
            onClick={onSetup}
            className="flex-1 h-11 flex items-center justify-center px-4 rounded-lg bg-primary hover:bg-blue-600 text-white text-sm font-bold shadow-md shadow-blue-500/20 transition-all focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 dark:focus:ring-offset-slate-800"
          >
            <span className="material-symbols-outlined text-lg mr-2">
              add_card
            </span>
            <span>{UI_TEXT.withdrawal.warning.setupNow}</span>
          </button>
        </div>
      </div>
    </div>
  )
}

