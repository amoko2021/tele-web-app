import { UI_TEXT } from '../../../../config/uiText'

export const SpecialPrize = ({ number }) => {
  return (
    <div className="relative px-4 pt-3 pb-1.5">
      <div className="flex flex-col items-center justify-center gap-1 rounded-xl bg-white border border-red-100 p-3 shadow-[0_4px_20px_-4px_rgba(220,38,38,0.1)] relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(#fee2e2_1px,transparent_1px)] [background-size:16px_16px] opacity-50"></div>
        <span className="relative z-10 rounded-full bg-red-50 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-red-600">
          {UI_TEXT.home.prizeSection.specialPrize}
        </span>
        <h2 className="relative z-10 text-2xl font-extrabold tracking-widest text-red-600 drop-shadow-sm">
          {number || '-----'}
        </h2>
      </div>
    </div>
  )
}

