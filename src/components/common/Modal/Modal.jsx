import { useEffect } from 'react'

export const Modal = ({ isOpen, onClose, title, children }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex h-full w-full items-center justify-center bg-slate-900/60 p-4 pb-24 backdrop-blur-sm">
      <div className="absolute inset-0 cursor-pointer" onClick={onClose}></div>
      <div className="relative w-full max-w-sm max-h-[75vh] flex flex-col overflow-hidden rounded-2xl bg-white shadow-2xl ring-1 ring-slate-900/5">
        <div className="flex items-center justify-between border-b border-slate-100 bg-slate-50/80 px-5 py-4 flex-shrink-0">
          <h3 className="text-lg font-bold text-slate-800">{title}</h3>
          <button
            onClick={onClose}
            className="flex size-8 cursor-pointer items-center justify-center rounded-full text-slate-400 hover:bg-slate-200/80 hover:text-slate-600 transition-colors"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>
        <div className="p-5 overflow-y-auto flex-1">{children}</div>
      </div>
    </div>
  )
}
