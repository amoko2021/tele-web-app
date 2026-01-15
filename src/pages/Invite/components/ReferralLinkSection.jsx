import { useState } from 'react'
import { UI_TEXT } from '../../../config/uiText'

export const ReferralLinkSection = ({ referralLink, onShare }) => {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(referralLink)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <section className="bg-card-light dark:bg-card-dark rounded-xl p-6 shadow-soft border border-border-light dark:border-border-dark space-y-4">
      <h2 className="text-xl font-semibold text-gray-800 dark:text-text-dark">{UI_TEXT.settings.invite.refLink}</h2>
      <div className="relative">
        <label className="sr-only" htmlFor="referral-link-input">Your referral link</label>
        <input
          id="referral-link-input"
          type="text"
          className="w-full pl-4 pr-12 py-3 bg-gray-100 dark:bg-gray-700 border border-border-light dark:border-gray-600 rounded-lg text-sm text-blue-600 dark:text-blue-300 font-mono select-all focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          value={referralLink}
          readOnly
        />
        <button
          onClick={handleCopy}
          className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-gray-500 hover:text-primary transition-colors focus:outline-none focus:ring-2 focus:ring-primary rounded-md"
          title="Copy Link"
        >
          {copied ? (
             <span className="material-symbols-outlined text-xl fill-1 text-accent-green">check_circle</span>
          ) : (
             <span className="material-symbols-outlined text-xl fill-0">content_copy</span>
          )}
        </button>
      </div>
      <button
        onClick={onShare}
        className="w-full bg-primary hover:bg-primary-hover text-white font-semibold text-base py-3 rounded-lg shadow-sm transform active:scale-[0.99] transition-all flex items-center justify-center gap-2 tracking-wide"
      >
        <span className="material-symbols-outlined text-lg fill-1">share</span>
        {UI_TEXT.settings.invite.button}
      </button>
    </section>
  )
}
