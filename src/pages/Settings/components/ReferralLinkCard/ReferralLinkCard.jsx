import { UI_TEXT } from '../../../../config/uiText'

export const ReferralLinkCard = ({ referralLink, copied, onCopy }) => {
  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl p-4 shadow-lg border border-slate-200 dark:border-slate-700">
      <label className="text-xs text-slate-500 dark:text-slate-400 font-medium ml-1 block mb-2">
        {UI_TEXT.settings.invite.refLink}
      </label>
      <div className="flex items-center justify-between bg-slate-50 dark:bg-slate-900 rounded-xl p-3 relative">
        <p className="text-sm text-blue-600 dark:text-blue-400 truncate font-mono select-all pr-12 flex-1">
          {referralLink}
        </p>
        <button
          onClick={onCopy}
          className="absolute right-3 p-2 text-slate-400 hover:text-primary transition-colors"
          title={copied ? UI_TEXT.common.copied : UI_TEXT.common.copy}
        >
          <span className="material-symbols-outlined text-xl">
            {copied ? 'check' : 'content_copy'}
          </span>
        </button>
      </div>
    </div>
  )
}

