import { UI_TEXT } from '../../../../config/uiText'

export const InviteButton = ({ onInvite }) => {
  return (
    <button
      onClick={onInvite}
      className="relative w-full overflow-hidden rounded-2xl bg-gradient-to-r from-amber-300 via-yellow-400 to-sky-400 text-slate-900 font-extrabold text-lg py-4 shadow-lg shadow-blue-500/30 border border-white/50 backdrop-blur-sm transition-all transform active:scale-[0.97] hover:shadow-blue-500/50 flex items-center justify-center gap-3 uppercase tracking-wide"
    >
      <span className="material-symbols-outlined -rotate-45 bg-white/40 text-slate-900 p-2 rounded-xl shadow-sm">
        send
      </span>
      {UI_TEXT.settings.invite.button}
      <span className="pointer-events-none absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-20 transition-opacity"></span>
    </button>
  )
}

